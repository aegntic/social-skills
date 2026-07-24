import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { processDuePosts, readDb } from "@/lib/store";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await processDuePosts(user.id);
  const db = await readDb();
  const accounts = db.accounts.filter((a) => a.userId === user.id);
  const posts = db.posts.filter((p) => p.userId === user.id);
  const media = db.media.filter((m) => m.userId === user.id);
  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name }, accounts, posts, media });
}
