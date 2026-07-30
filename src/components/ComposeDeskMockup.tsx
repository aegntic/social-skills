"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

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
  const [prevCycle, setPrevCycle] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  if (cycle !== prevCycle) {
    setPrevCycle(cycle);
    setCharCount(0);
    setActivePlatforms(new Set());
    setVisibleTransforms(0);
    setPublished(false);
    setPhase("type");
  }

  useEffect(() => {
    clearTimers();

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

    // Phase 5: Loop
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
        className="absolute -inset-4 rounded-3xl opacity-40 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, var(--azure-neon), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Main card */}
      <div className="plush-card p-6 md:p-8 space-y-6 overflow-hidden">
        {/* Window chrome header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-cyan-400/80" />
            <span className="ml-3 text-xs font-bold text-slate-300 font-mono">
              compose — socialskills.app
            </span>
          </div>
          {/* Live phase indicator */}
          <span
            className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              background: published ? "rgba(255, 200, 0, 0.15)" : "rgba(0, 240, 255, 0.15)",
              color: published ? "#ffc800" : "var(--azure-neon)",
              border: `1px solid ${published ? "rgba(255, 200, 0, 0.3)" : "rgba(0, 240, 255, 0.3)"}`,
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: published ? "#ffc800" : "var(--azure-neon)",
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}
            />
            {published ? "published" : phase}
          </span>
        </div>

        {/* Compose Body */}
        <div className="space-y-5">
          {/* Stylized Text Area Input Box */}
          <div className="relative">
            <div
              className="custom-scrollbar custom-resize rounded-2xl p-4 text-sm font-medium leading-relaxed transition-all overflow-y-auto"
              style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: isTyping ? "var(--azure-neon)" : "rgba(0, 240, 255, 0.3)",
                background: "#161920",
                color: "#ffffff",
                minHeight: "140px",
                maxHeight: "220px",
                boxShadow: isTyping
                  ? "0 0 20px rgba(0, 240, 255, 0.3), inset 0 2px 4px rgba(0,0,0,0.5)"
                  : "inset 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {typedText.split("\n").map((line, i, arr) => (
                <span key={i} className="text-white font-medium">
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
              {showCaret && (
                <span
                  className="ml-0.5 inline-block h-4 w-0.5 align-middle bg-azure-neon animate-pulse"
                  style={{ background: "var(--azure-neon)" }}
                />
              )}

              {/* Media attachment badge */}
              {charCount > 40 && (
                <div
                  className="mt-4 flex items-center gap-3 rounded-xl p-3"
                  style={{
                    background: "#20242e",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-black font-black"
                    style={{ background: "var(--azure-metallic)" }}
                  >
                    IMG
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-extrabold text-white">launch-photo.png</p>
                    <p className="text-[10px] text-slate-300">attached for IG, TikTok, YouTube, Pin</p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-black"
                    style={{ background: "rgba(0, 240, 255, 0.2)", color: "#00f0ff" }}
                  >
                    READY
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Toolbar: add media + char count */}
          <div className="flex items-center justify-between">
            <button className="btn-dark text-xs px-3.5 py-1.5 font-bold flex items-center gap-1.5">
              <span>+ Add media</span>
            </button>
            <span
              className="text-xs font-black font-mono"
              style={{ color: charCount > 0 ? "var(--azure-neon)" : "#94a3b8" }}
            >
              {charCount} / 2200 chars
            </span>
          </div>

          {/* Platform selector */}
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Destinations
            </p>
            <div className="flex flex-wrap gap-2.5">
              {PLATFORMS_ORDER.map((p) => {
                const isActive = activePlatforms.has(p.id);
                return (
                  <div
                    key={p.id}
                    className="relative flex items-center justify-center rounded-xl p-2.5 transition-all duration-300"
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: isActive ? "var(--azure-neon)" : "rgba(255, 255, 255, 0.1)",
                      background: isActive ? "rgba(0, 240, 255, 0.15)" : "#020617",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                      opacity: isActive ? 1 : 0.5,
                    }}
                  >
                    <PlatformColorLogo id={p.id} className="h-6 w-6" />
                    {isActive && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-black text-[9px] font-black">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Per-platform transform preview */}
          {phase !== "type" && phase !== "select" && (
            <div className="space-y-2 pt-2 border-t border-slate-700/50">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                Per-Platform Adaptations
              </p>
              <div className="space-y-2">
                {PLATFORMS_ORDER.slice(0, visibleTransforms).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{
                      background: "#0f172a",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <PlatformColorLogo id={p.id} className="h-5 w-5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-azure-neon uppercase tracking-wider mr-2">
                        [{p.transform}]
                      </span>
                      <span className="text-xs text-slate-200 font-medium truncate">{p.adapted}</span>
                    </div>
                    {published && <span className="text-xs font-black text-cyan-400">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publish bar */}
          <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
            <span className="text-xs font-bold text-slate-300">
              {published
                ? "5 accounts published successfully"
                : activePlatforms.size > 0
                  ? `${activePlatforms.size} accounts ready`
                  : "select destinations"}
            </span>
            <button
              className={published ? "btn-dark px-6 py-2.5 text-xs font-black" : "btn-wutang px-6 py-2.5 text-xs font-black"}
            >
              {published ? "Published ✓" : phase === "publish" ? "Publishing..." : `Publish to ${activePlatforms.size || 5}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
