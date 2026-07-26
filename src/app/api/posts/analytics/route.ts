import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { aggregatePostMetrics, readDb, syncPostMetrics } from "@/lib/store";

/**
 * Per-platform post-results analytics. Schema borrowed from Post Bridge's
 * `/v1/analytics` + `/v1/post-results`: every published post returns one row
 * per platform with `view_count` / `like_count` / `comment_count` /
 * `share_count` and `last_synced_at`, plus a post-level totals rollup.
 *
 * `GET` returns the current read-back; `POST` triggers a sync (local adapter
 * for now — real OAuth analytics slot in behind the same shape).
 */
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("post_id");
  const timeframe = searchParams.get("timeframe") ?? "all";

  const db = await readDb();
  const cutoff =
    timeframe === "7d"
      ? Date.now() - 7 * 86400000
      : timeframe === "30d"
        ? Date.now() - 30 * 86400000
        : timeframe === "90d"
          ? Date.now() - 90 * 86400000
          : 0;

  const posts = db.posts.filter((p) => {
    if (p.userId !== user.id) return false;
    if (postId && p.id !== postId) return false;
    if (cutoff && (!p.postedAt || Date.parse(p.postedAt) < cutoff)) return false;
    return true;
  });

  const rows = posts.flatMap((post) => {
    const agg = aggregatePostMetrics(post);
    if (!agg) return [];
    return agg.perPlatform.map(({ platform, metrics }) => ({
      post_id: post.id,
      platform,
      view_count: metrics.views,
      like_count: metrics.likes,
      comment_count: metrics.comments,
      share_count: metrics.shares,
      last_synced_at: metrics.fetchedAt,
    }));
  });

  const totals = posts
    .map((post) => ({ post, agg: aggregatePostMetrics(post) }))
    .filter((x): x is { post: (typeof posts)[number]; agg: NonNullable<typeof x.agg> } => Boolean(x.agg))
    .map(({ post, agg }) => ({
      post_id: post.id,
      posted_at: post.postedAt,
      totals: agg.totals,
      per_platform: agg.perPlatform,
    }));

  return NextResponse.json({
    data: rows,
    totals,
    meta: {
      total: rows.length,
      timeframe,
      next: null as string | null,
    },
  });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("post_id") ?? undefined;
  const updated = await syncPostMetrics(user.id, postId);
  return NextResponse.json({ synced: updated });
}
