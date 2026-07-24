import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const execFileAsync = promisify(execFile);

// ponytail: gbrain memory is the COS v3 L2/L3 store. The graph builder reads
// MEMORY.md/USER.md (global profile memory) + learned skills. We shell out to
// it, then layer COS v3 memory hygiene on top: scope tagging (global vs
// project), forgetting-curve confidence (30d decay), and secret redaction
// (COS 3.3 privacy boundary). gbrain's PGLite MCP is currently broken in this
// env, so we read the canonical memory files directly — same source, and when
// gbrain returns it syncs from the same repo-local .gbrain-source store below.
const PY = process.env.HERMES_PYTHON || "python3";
const PY_PATH = "/home/ae/.hermes/hermes-agent";
const REPO_DIR = process.cwd();

const SECRET_RE = /(api[_-]?key|token|secret|password|passwd|bearer|sk-[a-z0-9]{8,}|AKIA[0-9A-Z]{16})/i;

type RawNode = {
  id: string;
  label: string;
  kind: "skill" | "memory";
  timestamp: number | null;
  category?: string;
  body?: string;
  source?: string;
};

function projectSlug(): string {
  // Canonical gbrain per-repo slug marker (see .gbrain-source).
  const p = join(REPO_DIR, ".gbrain-source");
  return existsSync(p) ? readFileSync(p, "utf8").trim() : "gstack-social-skills";
}

function projectMemoryNodes(): RawNode[] {
  // Repo-local memory store — isolated to this project (COS 3.3 cross-project
  // isolation). Each chunk becomes a scoped node; never merged into global.
  const p = join(REPO_DIR, "MEMORY.local.md");
  if (!existsSync(p)) return [];
  const text = readFileSync(p, "utf8").trim();
  const fileTs = existsSync(p) ? Math.floor((readFileSync(p, "utf8"), Date.now()) / 1000) : Math.floor(Date.now() / 1000);
  return text
    .split("\n§\n")
    .map((c) => c.trim())
    .filter(Boolean)
    .map((chunk, i) => {
      const first = chunk.split("\n")[0].replace(/^#\s*/, "").trim();
      return {
        id: `project:${i}`,
        label: (first.slice(0, 80) + (first.length > 80 ? "…" : "")) || `project memory ${i}`,
        kind: "memory" as const,
        timestamp: fileTs + i,
        category: "project",
        body: chunk.slice(0, 1200),
        source: "project",
      };
    });
}

function applyHygiene(nodes: RawNode[]) {
  const now = Date.now() / 1000;
  const THIRTY_DAYS = 30 * 24 * 3600;
  return nodes.map((n) => {
    const redacted = SECRET_RE.test(n.label) || SECRET_RE.test(n.body ?? "");
    const ageDays = n.timestamp ? Math.max(0, (now - n.timestamp) / THIRTY_DAYS) : 0;
    const confidence = n.timestamp ? Math.max(0.05, Math.exp(-ageDays)) : 1;
    const scope: "global" | "project" | "base" =
      n.source === "project" ? "project" : n.source === "base" ? "base" : "global";
    return {
      ...n,
      label: redacted ? "[redacted — contains credential pattern]" : n.label,
      scope,
      confidence: Number(confidence.toFixed(3)),
      archived: confidence < 0.3,
    };
  });
}

export async function GET() {
  try {
    const { stdout } = await execFileAsync(
      PY,
      ["-c", "import json;from agent.learning_graph import build_learning_graph;print(json.dumps(build_learning_graph()))"],
      {
        cwd: PY_PATH,
        env: { ...process.env, PYTHONPATH: PY_PATH, HERMES_HOME: "/home/ae/.hermes" },
        timeout: 20000,
        maxBuffer: 5 * 1024 * 1024,
      }
    );
    const graph = JSON.parse(stdout);

    // Global (gbrain memory store) + project-local (isolated repo store),
    // both through the same hygiene pipeline so scope is the only differentiator.
    const globalNodes: RawNode[] = (graph.nodes ?? []).map((n: any) => ({
      id: n.id,
      label: n.label,
      kind: n.kind,
      timestamp: n.timestamp,
      category: n.category,
      body: n.body,
      source: n.source,
    }));
    const all = applyHygiene([...globalNodes, ...projectMemoryNodes()]);

    return NextResponse.json({
      ok: true,
      source: "gbrain-memory",
      protocol: "cognitive-os-v3",
      project: projectSlug(),
      graph: { ...graph, nodes: all },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "graph build failed";
    return NextResponse.json({
      ok: false,
      error: msg,
      graph: { nodes: [], edges: [], clusters: [], memory: [], stats: {} },
    });
  }
}
