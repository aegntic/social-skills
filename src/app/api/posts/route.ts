import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createPost, processDuePosts, readDb, mutateDb } from "@/lib/store";
import type { Platform, PlatformOverride } from "@/lib/types";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await processDuePosts(user.id);
  const db = await readDb();
  return NextResponse.json({
    posts: db.posts.filter((p) => p.userId === user.id),
  });
}

function parseOverrides(raw: unknown): Partial<Record<Platform, PlatformOverride>> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: Partial<Record<Platform, PlatformOverride>> = {};
  const known = new Set<Platform>([
    "twitter",
    "instagram",
    "tiktok",
    "youtube",
    "linkedin",
    "facebook",
    "pinterest",
    "threads",
    "bluesky",
    "google_business",
  ]);
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!known.has(k as Platform) || !v || typeof v !== "object") continue;
    const o = v as Record<string, unknown>;
    const clean: PlatformOverride = {};
    if (typeof o.caption === "string") clean.caption = o.caption;
    if (typeof o.title === "string") clean.title = o.title;
    if (Array.isArray(o.mediaIds)) clean.mediaIds = o.mediaIds.map(String);
    out[k as Platform] = clean;
  }
  return Object.keys(out).length ? out : undefined;
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const post = await createPost({
      userId: user.id,
      caption: String(body.caption || ""),
      accountIds: Array.isArray(body.accountIds) ? body.accountIds.map(Number) : [],
      mediaIds: Array.isArray(body.mediaIds) ? body.mediaIds.map(String) : [],
      scheduledAt: body.scheduledAt ? String(body.scheduledAt) : null,
      isDraft: Boolean(body.isDraft),
      platformOverrides: parseOverrides(body.platformOverrides),
    });
    return NextResponse.json({ post });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await mutateDb((db) => {
    const post = db.posts.find((p) => p.id === id && p.userId === user.id);
    if (!post) throw new Error("Not found");
    if (post.status === "posted" || post.status === "partial") {
      throw new Error("Published posts cannot be deleted");
    }
    db.posts = db.posts.filter((p) => p.id !== id);
  });
  return NextResponse.json({ ok: true });
}
