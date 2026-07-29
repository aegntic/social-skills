import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";

export const metadata = {
  title: "Journey — what Social Skills learns about your account",
  description:
    "See the memory layer that makes Social Skills different: the patterns, brand voice, and cadence the app learns for each account.",
  robots: { index: true, follow: true },
};

type Node = {
  id: string;
  label: string;
  kind: "skill" | "memory";
  timestamp: number | null;
  category: string;
  body: string;
  source: "product" | "user_demo";
  scope: "product" | "user_demo";
  forgetting: number;
  redacted: boolean;
};

type Cluster = { id: string; label: string; nodeIds: string[] };

async function loadGraph() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3456";
  try {
    const res = await fetch(`${base}/api/journey`, { cache: "no-store" });
    const data = await res.json();
    return data as {
      source: string;
      graph: { nodes: Node[]; clusters: Cluster[]; stats: Record<string, unknown> };
    };
  } catch {
    return null;
  }
}

export default async function JourneyPage() {
  const data = await loadGraph();
  const graph = data?.graph;
  const nodes: Node[] = graph?.nodes ?? [];
  const clusters = graph?.clusters ?? [];

  const dated = nodes
    .filter((n) => n.timestamp)
    .sort((a, b) => (a.timestamp! - b.timestamp!));
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
    return padL + ((Math.min(endTs, Math.max(startTs, ts)) - startTs) / span) * plotW;
  }
  const fmt = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const scopeColor: Record<string, string> = {
    product: "#8b5cf6",
    user_demo: "#00f0ff",
    default: "#64748b",
  };
  const colorFor = (n: Node) => scopeColor[n.scope] || scopeColor.default;

  const stats = graph?.stats as Record<string, unknown> | undefined;
  const scopeCounts = (stats?.scopeCounts as Record<string, number>) ?? {};
  const demoCount = scopeCounts.user_demo ?? 0;
  const productCount = scopeCounts.product ?? 0;

  return (
    <>
      <SiteHeader authed={false} />
      <main className="container-page py-12 md:py-16">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/">Home</Link> / <span className="text-ink">Journey</span>
        </nav>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">✦</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Journey</h1>
          <span className="badge badge-muted ml-1">Example account · seeded for demonstration</span>
        </div>
        <p className="prose-mute max-w-2xl">
          Most social tools are fire-and-forget. Social Skills is built around a memory layer: it
          learns how an account actually performs and feeds that back into every draft. This is what
          the app has learned about an <strong>example account</strong> — brand voice, posting
          cadence, top platform, and the product patterns it has picked up. When you sign up, your
          own journey fills in from your real posts. Governed by <strong>Cognitive OS v3</strong>:
          signals fade on a forgetting curve rather than being deleted, and credential-shaped text is
          redacted at the boundary.{" "}
          {nodes.length ? `${nodes.length} signals charted` : ""}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_260px]">
          <section className="card overflow-hidden p-5 md:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
              Learning timeline
            </h2>
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
                  const opacity = 0.45 + 0.55 * (1 - n.forgetting);
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
                        <title>{`${n.label} · ${n.kind} · ${n.scope} · ${fmt(n.timestamp!)}`}</title>
                      </circle>
                      {i < dated.length - 1 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={xFor(dated[i + 1].timestamp!)}
                          y2={y + rowH / 2}
                          stroke="#eef2f0"
                          strokeWidth={1}
                        />
                      )}
                    </g>
                  );
                })}
                <text x={padL} y={H - 16} fontSize={10} fill="#94a3b8">
                  ● product ◆ demo account · opacity = recency (forgetting curve)
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
                {clusters.slice(0, 8).map((c) => {
                  const count = c.nodeIds.length;
                  const max = Math.max(...clusters.map((x) => x.nodeIds.length), 1);
                  return (
                    <div key={c.id}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="capitalize text-ink">{c.label}</span>
                        <span className="text-muted">{count}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef2f0]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(6, (count / max) * 100)}%`,
                            background: scopeColor[c.id] || scopeColor.default,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {stats && (
              <div className="mt-6 border-t border-line pt-4 text-sm text-muted">
                <div className="flex justify-between">
                  <span>Product memory</span>
                  <span className="text-ink">{productCount}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span>Example account</span>
                  <span className="text-ink">{demoCount}</span>
                </div>
                <div className="mt-3 border-t border-line pt-3 text-xs">
                  <span className="badge badge-muted">example account</span> seeded for demonstration
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Recent signals
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dated
              .slice(-9)
              .reverse()
              .map((n) => (
                <div key={n.id} className="card p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: colorFor(n) }}
                    />
                    <span className="truncate text-sm font-semibold text-ink">{n.label}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted">
                    <span className={n.scope === "user_demo" ? "badge badge-ok" : "badge badge-muted"}>
                      {n.scope}
                    </span>
                    <span>{n.kind}</span>
                    <span>·</span>
                    <span>{n.timestamp ? fmt(n.timestamp) : "—"}</span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="mt-8 card border-primary/20 bg-primary-soft/40 p-5 text-sm text-muted">
          <span className="font-semibold text-ink">Cognitive OS v3 memory policy</span> — every signal
          fades on a forgetting curve rather than being deleted, credential patterns are redacted at
          the boundary, and each account&apos;s memory stays isolated to that account.
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
