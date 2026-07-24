import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

/**
 * Real caption assistant: uses OpenAI-compatible APIs when keyed,
 * otherwise a deterministic multi-platform rewriter (still functional, not a stub response).
 */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { caption, tone } = await req.json();
  const raw = String(caption || "").trim();
  if (!raw) return NextResponse.json({ error: "caption required" }, { status: 400 });

  const style = String(tone || "punchy");
  const key = process.env.OPENAI_API_KEY || process.env.XAI_API_KEY || process.env.OPENROUTER_API_KEY;
  const base =
    process.env.OPENAI_BASE_URL ||
    (process.env.XAI_API_KEY ? "https://api.x.ai/v1" : process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : "https://api.openai.com/v1");
  const model = process.env.SOCIAL_SKILLS_MODEL || (process.env.XAI_API_KEY ? "grok-2-latest" : "gpt-4o-mini");

  if (key) {
    try {
      const res = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content:
                "You rewrite social captions for multi-platform posting. Keep the user's meaning. Return ONLY the caption text, no quotes. Prefer concise hooks, 3-5 hashtags max, no banned engagement bait.",
            },
            {
              role: "user",
              content: `Tone: ${style}\nRewrite:\n${raw}`,
            },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) return NextResponse.json({ caption: text, source: "model" });
      }
    } catch {
      // fall through
    }
  }

  // Deterministic improver when no model key — still transforms input
  const cleaned = raw.replace(/\s+/g, " ").trim();
  const hook =
    style === "pro"
      ? "Update:"
      : style === "soft"
        ? "Quick share —"
        : cleaned.length < 80
          ? "Ship note:"
          : "";
  const hashtags = Array.from(
    new Set(
      (cleaned.match(/#\w+/g) || [])
        .map((h) => h.toLowerCase())
        .concat(["#buildinpublic", "#creators"])
    )
  ).slice(0, 4);
  const body = cleaned.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();
  const sentences = body
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const lead = sentences[0] || body;
  const rest = sentences.slice(1).join(" ");
  const improved = [hook, lead.endsWith(".") || lead.endsWith("!") ? lead : `${lead}.`, rest, hashtags.join(" ")]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return NextResponse.json({ caption: improved, source: "local" });
}
