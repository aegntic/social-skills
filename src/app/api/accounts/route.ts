import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createAccounts, deleteAccount, readDb } from "@/lib/store";
import type { Platform } from "@/lib/types";

const KNOWN_PLATFORMS = new Set<Platform>([
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

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await readDb();
  return NextResponse.json({
    accounts: db.accounts.filter((a) => a.userId === user.id),
  });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const raw = Array.isArray(body.accounts) ? body.accounts : [];
    const entries: { platform: Platform; username: string; displayName?: string }[] = [];
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const platform = item.platform as Platform;
      if (!KNOWN_PLATFORMS.has(platform)) continue;
      const username = String(item.username || "").trim();
      if (!username) continue;
      entries.push({
        platform,
        username,
        displayName: typeof item.displayName === "string" ? item.displayName : undefined,
      });
    }
    const created = await createAccounts(user.id, entries);
    return NextResponse.json({ accounts: created });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  try {
    await deleteAccount(user.id, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}
