// Operator-only: returns the agent's gbrain memory graph. Never exposed to
// unauthenticated callers — this is operator brain state, not product memory.
import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";
import { getSessionUser } from "@/lib/auth";

const PY =
  process.env.PY || process.env.PYTHON || process.env.HERMES_PY || "python3";
const PY_PATH =
  process.env.PY_PATH ||
  path.join(process.env.HOME || "/root", ".hermes", "skills", "gbrain", "learning_graph.py");

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const repoRoot = process.env.SOCIAL_SKILLS_REPO || process.cwd();
  const localPath = path.join(repoRoot, "MEMORY.local.md");
  const source = process.env.GBRAIN_SOURCE || ".gbrain-source";

  return new Promise<NextResponse>((resolve) => {
    execFile(
      PY,
      [
        PY_PATH,
        "--format", "json",
        "--local", localPath,
        "--source", source,
      ],
      { timeout: 15000 },
      async (err: Error | null, stdout: string) => {
        if (err) {
          console.error("[journey:operator] gbrain error", err.message);
          resolve(
            NextResponse.json({ ok: true, source: "empty", graph: { nodes: [], clusters: [], stats: {} } })
          );
          return;
        }
        try {
          const g = JSON.parse(stdout);
          const nodes = (g.nodes || []).map((n: any) => ({
            id: String(n.id ?? n.label ?? Math.random()),
            label: n.label || n.title || "untitled",
            kind: n.kind === "skill" ? "skill" : "memory",
            timestamp: n.timestamp ?? null,
            category: n.category || n.kind || "memory",
            body: n.body || n.description || "",
            source: "gbrain-memory",
          }));
          const clusters = (g.clusters || []).map((c: any) => ({
            id: String(c.id ?? c.label),
            label: c.label || c.name || "cluster",
            nodeIds: c.nodeIds || [],
          }));
          resolve(
            NextResponse.json({
              ok: true,
              source: "gbrain-memory",
              protocol: "cognitive-os-v3",
              graph: {
                nodes,
                clusters,
                stats: { nodeCount: nodes.length, clusterCount: clusters.length },
              },
            })
          );
        } catch (e) {
          resolve(
            NextResponse.json({ ok: false, error: "gbrain-parse-failed" }, { status: 500 })
          );
        }
      }
    );
  });
}
