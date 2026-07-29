"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function YouTubeTitleCheckerPage() {
  const [title, setTitle] = useState("");

  const getScore = (val: string) => {
    if (!val) return 0;
    let score = 50;
    if (val.length >= 30 && val.length <= 60) score += 30;
    if (/\d/.test(val)) score += 10;
    if (/[!?]/.test(val)) score += 10;
    return Math.min(100, score);
  };

  const score = getScore(title);

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            &larr; Back to Free Tools
          </Link>
          <div className="flex items-center gap-2">
            <PlatformColorLogo id="youtube" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">YouTube Title Optimizer</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">YouTube Title Optimizer</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Analyze your YouTube video titles for character length, click-through-rate power words, and mobile preview truncation.
          </p>
        </div>

        <div className="plush-card p-8 mb-8 space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
              YouTube Video Title
            </label>
            <input
              type="text"
              placeholder="e.g. How I Built a 7-Figure App in 30 Days (Step-by-Step)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {title && (
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-700 text-center">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Char Count</div>
                <div className="text-2xl font-black text-white">{title.length} / 100</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] font-bold text-slate-400 uppercase">CTR Score</div>
                <div className="text-2xl font-black text-wutang-metallic">{score} / 100</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Mobile Truncation</div>
                <div className="text-2xl font-black text-azure-neon">
                  {title.length > 55 ? "Truncated" : "Safe"}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
