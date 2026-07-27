"use client";

import { useEffect, useRef, useState } from "react";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

/* ─── Animation phases ───
   The mockup cycles through a believable compose-to-publish flow:
   1. TYPE     — caption types out character by character
   2. SELECT   — platform chips activate one by one (color logos light up)
   3. PREVIEW  — per-platform transform rows populate with adapted text
   4. PUBLISH  — button pulses, success state, "5 published" feedback
   Then loops back to TYPE after a brief hold. */

type Phase = "type" | "select" | "preview" | "publish" | "done";

const FULL_CAPTION =
  "shipped a new per-platform transform engine\n\nx strips links automatically. ig validates media. threads gets a question hook. one desk, ten networks, zero tabs.";

const PLATFORMS_ORDER: { id: Platform; transform: string; adapted: string }[] = [
  { id: "twitter", transform: "link stripped", adapted: "shipped a new per-platform transform engine" },
  { id: "instagram", transform: "media attached", adapted: "shipped a new per-platform transform engine" },
  { id: "linkedin", transform: "full caption", adapted: "shipped a new per-platform transform engine with auto-transforms for every network" },
  { id: "threads", transform: "hook added", adapted: "ever wonder why cross-posting feels so manual? we fixed it." },
  { id: "bluesky", transform: "direct post", adapted: "shipped a new per-platform transform engine" },
];

const PHASE_DURATIONS = {
  type: 60,     // ms per character
  select: 280,  // ms per platform activation
  preview: 320, // ms per transform row
  publish: 400, // publish animation
  done: 2200,   // hold before loop
};

export function ComposeDeskMockup() {
  const [phase, setPhase] = useState<Phase>("type");
  const [charCount, setCharCount] = useState(0);
  const [activePlatforms, setActivePlatforms] = useState<Set<string>>(new Set());
  const [visibleTransforms, setVisibleTransforms] = useState(0);
  const [published, setPublished] = useState(false);
  const [cycle, setCycle] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all timers
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Run the animation cycle — re-runs when `cycle` changes (loop)
  useEffect(() => {
    clearTimers();

    // Reset state
    setCharCount(0);
    setActivePlatforms(new Set());
    setVisibleTransforms(0);
    setPublished(false);
    setPhase("type");

    const caption = FULL_CAPTION;
    const totalChars = caption.length;

    // Phase 1: Type caption
    for (let i = 1; i <= totalChars; i++) {
      const t = setTimeout(() => {
        setCharCount(i);
        if (i === totalChars) {
          const t2 = setTimeout(() => setPhase("select"), 400);
          timers.current.push(t2);
        }
      }, i * PHASE_DURATIONS.type);
      timers.current.push(t);
    }

    // Phase 2: Activate platforms one by one
    PLATFORMS_ORDER.forEach((p, idx) => {
      const delay = totalChars * PHASE_DURATIONS.type + 500 + idx * PHASE_DURATIONS.select;
      const t = setTimeout(() => {
        setActivePlatforms((prev) => new Set([...prev, p.id]));
        if (idx === PLATFORMS_ORDER.length - 1) {
          const t2 = setTimeout(() => setPhase("preview"), 500);
          timers.current.push(t2);
        }
      }, delay);
      timers.current.push(t);
    });

    // Phase 3: Populate transform rows
    const previewStart = totalChars * PHASE_DURATIONS.type + 500 + PLATFORMS_ORDER.length * PHASE_DURATIONS.select + 500;
    PLATFORMS_ORDER.forEach((_, idx) => {
      const t = setTimeout(() => {
        setVisibleTransforms(idx + 1);
        if (idx === PLATFORMS_ORDER.length - 1) {
          const t2 = setTimeout(() => setPhase("publish"), 500);
          timers.current.push(t2);
        }
      }, previewStart + idx * PHASE_DURATIONS.preview);
      timers.current.push(t);
    });

    // Phase 4: Publish
    const publishTime = previewStart + PLATFORMS_ORDER.length * PHASE_DURATIONS.preview + 500;
    const tPub = setTimeout(() => {
      setPublished(true);
      setPhase("done");
    }, publishTime);
    timers.current.push(tPub);

    // Phase 5: Loop — increment cycle to restart
    const tLoop = setTimeout(() => {
      setCycle((c) => c + 1);
    }, publishTime + PHASE_DURATIONS.done);
    timers.current.push(tLoop);

    return clearTimers;
  }, [cycle]);

  const typedText = FULL_CAPTION.slice(0, charCount);
  const isTyping = phase === "type";
  const showCaret = phase === "type" || phase === "select";

  return (
    <div className="relative">
      {/* Glow behind card */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, var(--electric), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl border bg-white shadow-2xl"
        style={{ borderColor: "oklch(90% 0.005 240)" }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 border-b px-4 py-3"
          style={{ borderColor: "oklch(90% 0.005 240)" }}
        >
          <span className="h-3 w-3 rounded-full" style={{ background: "oklch(75% 0.02 20)" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "oklch(78% 0.03 65)" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "oklch(75% 0.02 155)" }} />
          <span className="ml-3 text-xs font-medium text-muted">
            compose — socialskills.app
          </span>
          {/* Live phase indicator */}
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: published ? "var(--ok)" : "var(--electric)" }}>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: published ? "var(--ok)" : "var(--electric)",
                animation: "pulse-dot 1.5s ease-in-out infinite",
              }}
            />
            {published ? "published" : phase}
          </span>
        </div>

        {/* Compose body */}
        <div className="space-y-5 p-5 md:p-6">
          {/* Text area mock with typing animation */}
          <div className="relative">
            <div
              className="rounded-lg border p-4 text-sm leading-relaxed transition-all"
              style={{
                borderColor: isTyping ? "var(--electric)" : "oklch(90% 0.005 240)",
                background: "oklch(98% 0.003 240)",
                minHeight: "120px",
                boxShadow: isTyping ? "0 0 0 3px var(--electric-soft)" : "none",
              }}
            >
              {typedText.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
              {showCaret && (
                <span
                  className="ml-0.5 inline-block h-4 w-0.5 align-middle"
                  style={{
                    background: "var(--electric)",
                    animation: "caret-blink 1s step-end infinite",
                  }}
                />
              )}
              {/* Media attachment badge */}
              {charCount > 40 && (
                <div
                  className="mt-3 flex items-center gap-2 rounded-lg border p-2"
                  style={{
                    borderColor: "oklch(88% 0.01 240)",
                    background: "white",
                    animation: "slide-in 0.4s var(--ease-expo)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md"
                    style={{ background: "linear-gradient(135deg, oklch(90% 0.04 260), oklch(85% 0.06 280))" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                      <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-ink">launch-photo.png</p>
                    <p className="text-[10px] text-muted">attached for IG, TikTok, YouTube, Pin</p>
                  </div>
                  <span className="rounded bg-oklch(93% 0.05 155) px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "oklch(93% 0.05 155)", color: "oklch(40% 0.12 155)" }}>
                    ready
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Toolbar: add media + char count */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all hover:shadow-md"
              style={{
                borderColor: "oklch(85% 0.01 240)",
                background: "white",
                color: "var(--muted)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Add media
            </button>
            <span className="text-xs font-medium tabular-nums" style={{ color: charCount > 0 ? "var(--electric)" : "var(--muted)" }}>
              {charCount} chars
            </span>
          </div>

          {/* Platform selector — full color logos, no text labels */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              destinations
            </p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS_ORDER.map((p) => {
                const isActive = activePlatforms.has(p.id);
                return (
                  <div
                    key={p.id}
                    className="relative flex items-center justify-center rounded-xl border p-2 transition-all duration-300"
                    style={{
                      borderColor: isActive ? "var(--electric)" : "oklch(88% 0.008 240)",
                      background: isActive ? "var(--electric-soft)" : "oklch(97% 0.003 240)",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                      opacity: isActive ? 1 : 0.4,
                      filter: isActive ? "none" : "grayscale(0.6)",
                    }}
                  >
                    <PlatformColorLogo id={p.id} className="h-6 w-6" />
                    {isActive && (
                      <span
                        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full"
                        style={{
                          background: "var(--ok)",
                          animation: "pop-in 0.3s var(--ease-expo)",
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 text-white">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Per-platform transform preview */}
          {phase !== "type" && phase !== "select" && (
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
                per-platform preview
              </p>
              <div className="space-y-2">
                {PLATFORMS_ORDER.slice(0, visibleTransforms).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start gap-3 rounded-lg border p-2.5"
                    style={{
                      borderColor: "oklch(90% 0.005 240)",
                      background: "oklch(98% 0.002 240)",
                      animation: "slide-in 0.35s var(--ease-expo)",
                    }}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                      <PlatformColorLogo id={p.id} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                          style={{
                            background: "var(--electric-soft)",
                            color: "var(--electric)",
                          }}
                        >
                          {p.transform}
                        </span>
                      </div>
                      <p className="truncate text-xs text-muted">{p.adapted}</p>
                    </div>
                    {published && (
                      <svg viewBox="0 0 24 24" fill="none" className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--ok)", animation: "pop-in 0.3s var(--ease-expo)" }}>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publish bar */}
          <div
            className="flex items-center justify-between border-t pt-4"
            style={{ borderColor: "oklch(90% 0.005 240)" }}
          >
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span
                className="inline-block h-2 w-2 rounded-full align-middle transition-colors"
                style={{ background: published ? "var(--ok)" : activePlatforms.size > 0 ? "var(--electric)" : "oklch(80% 0.005 240)" }}
              />
              {published
                ? "5 accounts published"
                : activePlatforms.size > 0
                  ? `${activePlatforms.size} accounts ready`
                  : "select destinations"}
            </span>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black transition-all"
              style={{
                background: published ? "var(--ok)" : "var(--wutang)",
                transform: phase === "publish" ? "scale(1.08)" : "scale(1)",
                boxShadow: phase === "publish" ? "0 0 0 4px oklch(87% 0.17 90 / 0.3)" : "none",
              }}
            >
              {published ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Published
                </>
              ) : (
                <>
                  {phase === "publish" ? "Publishing" : `Publish to ${activePlatforms.size || 5}`}
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating memory layer badge */}
      <div
        className="absolute -bottom-5 -right-3 hidden rounded-xl border bg-white px-4 py-3 shadow-xl md:block"
        style={{ borderColor: "oklch(90% 0.005 240)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "var(--electric-soft)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" style={{ color: "var(--electric)" }}>
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-ink">Memory layer</p>
            <p className="text-[11px] text-muted">learning your voice</p>
          </div>
        </div>
      </div>
    </div>
  );
}
