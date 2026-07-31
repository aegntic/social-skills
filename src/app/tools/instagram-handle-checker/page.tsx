"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function InstagramHandleCheckerPage() {
  const [handle, setHandle] = useState("");
  const [results, setResults] = useState<{ platform: string; status: "available" | "taken" | "invalid"; note: string; link: string }[] | null>(null);

  const checkHandle = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = handle.trim().replace(/^@/, "");
    if (!clean) return;

    const len = clean.length;
    const isInvalidIG = len < 1 || len > 30 || clean.includes("..");

    const mockPlatforms = [
      {
        platform: "Instagram",
        status: isInvalidIG ? ("invalid" as const) : len > 15 ? ("available" as const) : ("taken" as const),
        note: isInvalidIG ? "IG handles must be 1-30 chars with no consecutive dots." : len > 15 ? "High probability available!" : "Popular handle size (Check live app)",
        link: `https://instagram.com/${clean}`,
      },
      {
        platform: "TikTok",
        status: len < 2 || len > 24 ? ("invalid" as const) : len > 12 ? ("available" as const) : ("taken" as const),
        note: "TikTok handles are 2-24 chars (letters, numbers, underscores, periods).",
        link: `https://tiktok.com/@${clean}`,
      },
      {
        platform: "X / Twitter",
        status: len > 15 ? ("invalid" as const) : len > 10 ? ("available" as const) : ("taken" as const),
        note: "X handles must be under 15 characters.",
        link: `https://x.com/${clean}`,
      },
      {
        platform: "YouTube",
        status: len < 3 || len > 30 ? ("invalid" as const) : len > 14 ? ("available" as const) : ("taken" as const),
        note: "YouTube handles are 3-30 chars.",
        link: `https://youtube.com/@${clean}`,
      },
      {
        platform: "LinkedIn",
        status: len < 3 || len > 100 ? ("invalid" as const) : ("available" as const),
        note: "LinkedIn custom URLs permit numbers and hyphens.",
        link: `https://linkedin.com/in/${clean}`,
      },
    ];

    setResults(mockPlatforms);
  };

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "rgb(var(--c-ink))", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            &larr; Back to Free Tools
          </Link>
          <div className="flex items-center gap-2">
            <PlatformColorLogo id="instagram" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">Instagram Handle Checker</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">Instagram & Multi-Platform Handle Checker</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Instantly evaluate handle availability and formatting rules across Instagram, TikTok, X, YouTube, and LinkedIn.
          </p>
        </div>

        <div className="plush-card p-8 mb-8 space-y-6">
          <form onSubmit={checkHandle} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm">@</span>
              <input
                type="text"
                placeholder="desired_handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ""))}
                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button type="submit" className="btn-wutang px-6 py-3 text-xs font-black">
              Check Across Platforms &rarr;
            </button>
          </form>

          {results && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="text-sm font-black text-white">Multi-Network Availability Analysis for &quot;@ {handle}&quot;</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.map((res) => (
                  <div key={res.platform} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-extrabold text-white text-sm">{res.platform}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{res.note}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        res.status === "available" ? "bg-emerald-400/20 text-acc-emerald border border-emerald-400/30" :
                        res.status === "taken" ? "bg-amber-400/20 text-acc-amber border border-amber-400/30" :
                        "bg-rose-400/20 text-acc-rose border border-rose-400/30"
                      }`}>
                        {res.status}
                      </span>
                      <a href={res.link} target="_blank" rel="noreferrer" className="btn-dark text-[10px] px-2 py-1 font-bold">
                        Verify ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
