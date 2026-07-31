"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function ContentMarketFitPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-azure-neon mb-1">Section 4 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Step 3: Content Market Fit</h1>
          <p className="text-slate-300 text-base font-medium leading-relaxed">
            NOW IT&apos;S TIME TO CREATE CONTENT AND POST! After 7 days of warmup, you&apos;re ready to start making content that strikes key viral boxes.
          </p>
        </div>

        {/* Video Tutorial */}
        <div className="plush-card p-6 text-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 flex items-center justify-center" style={{ background: "var(--clay-surface-grad)", border: "2px solid rgba(0,240,255,0.3)" }}>
            <div className="text-center">
              <div className="h-12 px-6 mx-auto mb-3 rounded-full flex items-center justify-center text-xs font-black text-black btn-azure">
                WATCH MASTERCLASS
              </div>
              <div className="text-sm font-extrabold text-white">Step 3 - Creating Content & Finding Winning Formats</div>
              <div className="text-xs text-slate-400 mt-1">Watch 17-minute content creation masterclass</div>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="plush-card p-6 space-y-4">
          <div className="text-base font-black text-white">How to Make Content That Gets Views</div>
          <div className="space-y-3">
            {[
              { step: "Step 1: Download CapCut (Free)", body: "CapCut is the best free video editor. Download it on your phone or computer to recreate viral formats." },
              { step: "Step 2: Get viral audio & music", body: "Search 'TikTok to MP3' or 'Reels to MP3' to extract viral audio tracks." },
              { step: "Step 3: Recreate the format", body: "Take that viral video format and make it about YOUR niche. Keep the exact same hook & structure." },
              { step: "Step 4: Focus on Watch Time & Comments", body: "Hook people in the first 3 seconds to maximize watch time percentage." }
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
                <div className="text-xs font-extrabold text-wutang-metallic mb-1">{s.step}</div>
                <div className="text-xs text-slate-300 font-medium">{s.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <Link href="/growth-guide/account-warmup" className="btn-dark px-5 py-2.5 text-xs font-bold">
            &larr; Step 2 Warmup
          </Link>
          <Link href="/growth-guide/riding-trends" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Next: Riding Trends &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
