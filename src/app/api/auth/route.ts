import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession, createUser, readDb, verifyPassword } from "@/lib/store";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "Creator").trim();
    const mode = body.mode === "login" ? "login" : "signup";

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Email and password (6+ chars) required" }, { status: 400 });
    }

    let userId: string;
    if (mode === "signup") {
      const user = await createUser(email, name || email.split("@")[0], password);
      userId = user.id;
    } else {
      const db = await readDb();
      const user = db.users.find((u) => u.email === email);
      if (!user || !verifyPassword(password, user.passwordHash)) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      userId = user.id;
    }

    const token = await createSession(userId);
    const jar = await cookies();
    jar.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Auth failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
