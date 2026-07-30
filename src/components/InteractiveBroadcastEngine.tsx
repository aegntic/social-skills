"use client";

import React, { useEffect, useState } from "react";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

const PLATFORMS: Platform[] = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "tiktok",
];

export function InteractiveBroadcastEngine() {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [pathsLinked, setPathsLinked] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [prevCycle, setPrevCycle] = useState(0);

  if (cycle !== prevCycle) {
    setPrevCycle(cycle);
    setActiveIndices([]);
    setPathsLinked(false);
  }

  useEffect(() => {
    // Step 1: Destination icons get clicked active one by one
    PLATFORMS.forEach((_, idx) => {
      setTimeout(() => {
        setActiveIndices((prev) => [...prev, idx]);
      }, (idx + 1) * 350);
    });

    // Step 2: Once all selected, link the paths together with glowing energy
    const totalSelectTime = PLATFORMS.length * 350 + 200;
    const tLink = setTimeout(() => {
      setPathsLinked(true);
    }, totalSelectTime);

    // Step 3: Loop cycle
    const tLoop = setTimeout(() => {
      setCycle((c) => c + 1);
    }, totalSelectTime + 3200);

    return () => {
      clearTimeout(tLink);
      clearTimeout(tLoop);
    };
  }, [cycle]);

  return (
    <div className="relative plush-card p-8 sm:p-12 overflow-hidden flex items-center justify-center min-h-[380px] select-none border-2 border-slate-700">
      {/* Background Radial Shader Glow */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 60% 50%, var(--azure-neon) 0%, var(--wutang-yellow) 50%, transparent 80%)",
        }}
      />

      {/* Main Clean 3D Stage */}
      <div className="relative z-10 w-full max-w-lg flex items-center justify-between gap-6 sm:gap-12">
        
        {/* LEFT NODE: User Icon (Wordless) */}
        <div className="relative shrink-0 z-10">
          <div
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: `2px solid ${pathsLinked ? "var(--azure-neon)" : "rgba(255, 255, 255, 0.2)"}`,
              boxShadow: pathsLinked
                ? "0 0 25px rgba(0, 240, 255, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)"
                : "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-white">
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* CENTER NODE: Social Skills Engine Logo (Wordless) */}
        <div className="relative shrink-0 z-10">
          <div
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
              border: `3px solid ${pathsLinked ? "var(--wutang-yellow)" : "rgba(255, 200, 0, 0.4)"}`,
              boxShadow: pathsLinked
                ? "0 0 35px rgba(255, 200, 0, 0.6), inset 0 2px 6px rgba(255,255,255,0.4)"
                : "0 10px 30px rgba(0,0,0,0.5)",
              transform: pathsLinked ? "scale(1.08)" : "scale(1)",
            }}
          >
            <span className="text-2xl sm:text-3xl font-black text-wutang-metallic drop-shadow-md">
              S/
            </span>
          </div>
        </div>

        {/* RIGHT NODES: Destination Icons Column (Wordless) */}
        <div className="relative shrink-0 z-10 flex flex-col gap-3.5">
          {PLATFORMS.map((p, idx) => {
            const isActive = activeIndices.includes(idx);
            return (
              <div
                key={p}
                className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isActive ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" : "#020617",
                  border: `2px solid ${isActive ? "var(--azure-neon)" : "rgba(255, 255, 255, 0.08)"}`,
                  boxShadow: isActive
                    ? "0 0 20px rgba(0, 240, 255, 0.5), 0 4px 12px rgba(0,0,0,0.4)"
                    : "0 2px 6px rgba(0,0,0,0.3)",
                  transform: isActive ? "scale(1.08)" : "scale(0.95)",
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                <PlatformColorLogo id={p} className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            );
          })}
        </div>

        {/* CONNECTOR PATHS (SVG Laser Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
            <linearGradient id="activePathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffc800" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Left-to-Center Line */}
          <line
            x1="18%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke={pathsLinked ? "url(#activePathGrad)" : "rgba(255,255,255,0.12)"}
            strokeWidth={pathsLinked ? "3.5" : "1.5"}
            className={pathsLinked ? "laser-pulse-active" : ""}
            style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
          />

          {/* Center-to-Right Lines (5 destination branches) */}
          {[18, 34, 50, 66, 82].map((yPct, i) => {
            const isBranchActive = pathsLinked && activeIndices.includes(i);
            return (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2="85%"
                y2={`${yPct}%`}
                stroke={isBranchActive ? "url(#activePathGrad)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isBranchActive ? "3.5" : "1.5"}
                className={isBranchActive ? "laser-pulse-active" : ""}
                style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
              />
            );
          })}
        </svg>

      </div>
    </div>
  );
}
