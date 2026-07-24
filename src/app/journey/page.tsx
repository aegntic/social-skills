import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";

export const metadata = {
  title: "Journey",
  description: "What Social Skills has learned over time — skills and memory, mapped.",
  robots: { index: false, follow: false },
};

type Node = {
  id: string;
  label: string;
  kind: "skill" | "memory";
  timestamp: number | null;
  category: string;
  useCount: number;
  scope?: "global" | "project" | "base";
  confidence?: number;
  archived?: boolean;
};

async function loadGraph() {
  // Server-side fetch to our own API keeps secrets off the client.
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3456";
  try {
    const res = await fetch(`${base}/api/journey`, { cache: "no-store" });
    const data = await res.json();
    return data as {
      project?: string;
      graph: { nodes: Node[]; clusters: { category: string; count: number }[]; stats: Record<string, unknown> };
    };
  } catch {
    return null;
  }
}

export default async function JourneyPage() {
  const user = await getSessionUser();
  const data = await loadGraph();
  const project = data?.project;
  const graph = data?.graph;
  const nodes: Node[] = graph?.nodes ?? [];
  const clusters = graph?.clusters ?? [];

  const dated = nodes.filter((n) => n.timestamp).sort((a, b) => (a.timestamp! - b.timestamp!));
  const startTs = dated.length ? dated[0].timestamp! : 0;
  const endTs = dated.length ? dated[dated.length - 1].timestamp! : Date.now() / 1000;
  const span = Math.max(1, endTs - startTs);

  const W = 920;
  const rowH = 30;
  const padX = 40;
  const padL = 90;
  const plotW = W - padX - padL;
  const H = Math.max(220, padX + dated.length * rowH + 60);

  function xFor(ts: number) {
    return padL + (Math.min(endTs, Math.max(startTs, ts)) - startTs) / span * plotW;
  }
  const fmt = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const categoryColor: Record<string, string> = {
    memory: "#10b981",
    skills: "#059669",
    devops: "#0ea5e9",
    product: "#8b5cf6",
    default: "#64748b",
  };
  const colorFor = (n: Node) => categoryColor[n.category] || categoryColor.default;

  const stats = graph?.stats as Record<string, unknown> | undefined;

  return (
    <>
      <SiteHeader authed={Boolean(user)} />
      <main className="container-page py-12 md:py-16">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/">Home</Link> / <span className="text-ink">Journey</span>
        </nav>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">✦</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Journey</h1>
        </div>
        <p className="prose-mute max-w-2xl">
          Everything Social Skills has learned, on a timeline — learned skills and memory, mapped from the gbrain
          memory store and governed by <strong>Cognitive OS v3</strong>. Always-connected working memory, with
          intelligent isolation: each signal is scoped (global vs project), faded by the 30-day forgetting curve, and
          credential-shaped text is redacted at the boundary.{" "}
          {graph?.nodes?.length ? ` ${nodes.length} signals charted` : ""}
          {project ? ` across ${nodes.filter((n) => n.scope === "project").length} project-isolated + ${nodes.filter((n) => n.scope !== "project").length} global.` : ""}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_260px]">
          <section className="card overflow-hidden p-5 md:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Learning timeline</h2>
            {dated.length === 0 ? (
              <p className="text-muted">No learning signals yet.</p>
            ) : (
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Learning timeline">
                <line x1={padL} y1={padX} x2={padL} y2={H - 40} stroke="#d8e5dd" strokeWidth={1} />
                <text x={padL} y={padX - 10} fontSize={11} fill="#5c7268">
                  {fmt(startTs)}
                </text>
                <text x={W - padX} y={padX - 10} fontSize={11} fill="#5c7268" textAnchor="end">
                  {fmt(endTs)}
                </text>
                {dated.map((n, i) => {
                  const y = padX + i * rowH + rowH / 2;
                  const x = xFor(n.timestamp!);
                  const c = colorFor(n);
                  const opacity = n.archived ? 0.25 : 0.45 + 0.55 * (n.confidence ?? 1);
                  return (
                    <g key={n.id} opacity={opacity}>
                      <circle
                        cx={x}
                        cy={y}
                        r={n.kind === "memory" ? 5 : 6}
                        fill={n.kind === "memory" ? "none" : c}
                        stroke={c}
                        strokeWidth={n.kind === "memory" ? 2 : 0}
                      >
                        <title>{`${n.label} · ${n.kind} · ${n.scope ?? "global"} · conf ${(n.confidence ?? 1).toFixed(2)} · ${fmt(n.timestamp!)}`}</title>
                      </circle>
                      {i < dated.length - 1 && (
                        <line x1={x} y1={y} x2={xFor(dated[i + 1].timestamp!)} y2={y + rowH / 2} stroke="#eef2f0" strokeWidth={1} />
                      )}
                    </g>
                  );
                })}
                <text x={padL} y={H - 16} fontSize={10} fill="#94a3b8">
                  ● skill ◆ memory · opacity = forgetting-curve confidence
                </text>
              </svg>
            )}
          </section>

          <section className="card p-5 md:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Clusters</h2>
            {clusters.length === 0 ? (
              <p className="text-muted">—</p>
            ) : (
              <div className="space-y-3">
                {clusters.slice(0, 8).map((c) => (
                  <div key={c.category}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="capitalize text-ink">{c.category}</span>
                      <span className="text-muted">{c.count}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef2f0]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.max(6, (c.count / Math.max(...clusters.map((x) => x.count))) * 100)}%`, background: categoryColor[c.category] || categoryColor.default }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {stats && (
              <div className="mt-6 border-t border-line pt-4 text-sm text-muted">
                <div className="flex justify-between"><span>Learned skills</span><span className="text-ink">{String(stats.learned_skills ?? 0)}</span></div>
                <div className="mt-1 flex justify-between"><span>Memory nodes</span><span className="text-ink">{String(stats.memory_nodes ?? 0)}</span></div>
                <div className="mt-1 flex justify-between"><span>Edges</span><span className="text-ink">{String(stats.related_edges ?? 0)}</span></div>
                <div className="mt-3 border-t border-line pt-3 text-xs">
                  <span className="badge badge-ok">{nodes.filter((n) => n.scope !== "project").length} global</span> shared across projects
                  <span className="ml-2 badge badge-muted">{nodes.filter((n) => n.scope === "project").length} project</span> isolated to this repo
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Recent signals</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dated
              .slice(-9)
              .reverse()
              .map((n) => (
                <div key={n.id} className={`card p-4 ${n.archived ? "opacity-60" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colorFor(n) }} />
                    <span className="truncate text-sm font-semibold text-ink">{n.label}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted">
                    <span className={n.scope === "project" ? "badge badge-muted" : "badge badge-ok"}>{n.scope ?? "global"}</span>
                    <span>{n.kind}</span>
                    <span>·</span>
                    <span>{n.timestamp ? fmt(n.timestamp) : "—"}</span>
                    {n.confidence != null && <span>· conf {(n.confidence).toFixed(2)}</span>}
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="mt-8 card border-primary/20 bg-primary-soft/40 p-5 text-sm text-muted">
          <span className="font-semibold text-ink">Cognitive OS v3 memory policy</span>{" "}
          {project ? <span className="badge badge-muted mr-1">{project}</span> : null}
          — working memory stays always-connected to gbrain; cross-project context is never merged (isolated scopes),
          credential patterns are redacted at the boundary, and stale signals decay on the 30-day forgetting curve
          rather than being deleted.
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
