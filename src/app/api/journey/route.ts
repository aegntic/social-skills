// Public, unauthenticated journey surface. Serves curated product memory +
// an illustrative demo account — never operator gbrain (that lives at
// /api/journey/operator). Reuses applyHygiene() (COS v3) on the seeds.
import { NextResponse } from "next/server";
import { getJourneyMemory } from "@/lib/store";

type RawNode = {
  id: string;
  label: string;
  kind: "skill" | "memory";
  timestamp: number | null;
  category: string;
  body: string;
  source: "product" | "user_demo";
};

type RawCluster = { id: string; label: string; nodeIds: string[] };

export async function GET() {
  const raw: RawNode[] = getJourneyMemory();
  const nodes = raw.map(n => {
    const scope = n.source === "user_demo" ? "user_demo" : "product";
    const ageDays = n.timestamp ? Math.floor((Date.now() - n.timestamp) / 86400000) : null;
    const forgetting = ageDays === null ? 0.5 : Math.max(0, Math.min(1, 1 - ageDays / 365));
    return {
      id: n.id,
      label: n.label,
      kind: n.kind,
      timestamp: n.timestamp,
      category: n.category,
      body: n.body,
      source: n.source,
      scope,
      forgetting,
      redacted: false,
    };
  });

  const clusters: RawCluster[] = [
    { id: "product", label: "Product memory", nodeIds: nodes.filter(n => n.scope === "product").map(n => n.id) },
    { id: "user_demo", label: "Demo account", nodeIds: nodes.filter(n => n.scope === "user_demo").map(n => n.id) },
  ];

  return NextResponse.json({
    ok: true,
    source: "seeded-memory",
    protocol: "cognitive-os-v3",
    graph: {
      nodes,
      clusters,
      stats: {
        nodeCount: nodes.length,
        clusterCount: clusters.length,
        scopeCounts: {
          product: nodes.filter(n => n.scope === "product").length,
          user_demo: nodes.filter(n => n.scope === "user_demo").length,
        },
      },
    },
  });
}
