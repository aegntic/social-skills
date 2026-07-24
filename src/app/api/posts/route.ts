import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createPost, processDuePosts, readDb, mutateDb } from "@/lib/store";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await processDuePosts(user.id);
  const db = await readDb();
  return NextResponse.json({
    posts: db.posts.filter((p) => p.userId === user.id),
  });
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
