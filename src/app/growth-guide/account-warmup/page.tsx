"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function AccountWarmupPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">Section 3 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Step 2: Account Warmup Protocol</h1>
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm font-extrabold mb-4">
            CRITICAL: DO NOT POST FOR 7 DAYS!
            <p className="text-xs text-rose-200 font-normal mt-1">Skip this step and the algorithm will bury your new account's content under 0 views.</p>
          </div>
        </div>

        {/* Video Mockup */}
        <div className="plush-card p-6 text-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2b313d 0%, #171920 100%)", border: "2px solid rgba(255,100,100,0.3)" }}>
            <div className="text-center">
              <div className="h-12 px-6 mx-auto mb-3 rounded-full flex items-center justify-center text-xs font-black text-black btn-wutang">
                WATCH TUTORIAL
              </div>
              <div className="text-sm font-extrabold text-white">Step 2 - Account Warmup Protocol Tutorial</div>
              <div className="text-xs text-slate-400 mt-1">Watch 3-7 day warmup protocol video</div>
            </div>
          </div>
        </div>

        {/* Today's Mission Cards */}
        <div className="plush-card p-6 space-y-4">
          <div className="text-base font-black text-white">Today's Mission</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: "#20242e" }}>
              <div className="text-xs font-extrabold text-wutang-metallic mb-1">1. Scroll In Your Niche (15 mins/day)</div>
              <div className="text-xs text-slate-300 font-medium">Only scroll content related to your app/niche. The algorithm watches what you engage with.</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#20242e" }}>
              <div className="text-xs font-extrabold text-azure-neon mb-1">2. Engage Naturally</div>
              <div className="text-xs text-slate-300 font-medium">Follow accounts, watch videos relevant to your niche, leave real comments. Be human, not robotic.</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#20242e" }}>
              <div className="text-xs font-extrabold text-azure-neon mb-1">3. Save Viral Content</div>
              <div className="text-xs text-slate-300 font-medium">Save videos with 100k+ views or 1k+ likes that you could recreate for your niche.</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#20242e" }}>
              <div className="text-xs font-extrabold text-rose-400 mb-1">4. NO POSTING</div>
              <div className="text-xs text-slate-300 font-medium">Do not post anything on a new account until you've warmed it up following the steps above for 7 days.</div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="plush-card p-6">
          <div className="text-base font-black text-white mb-3">Step 2 Checklist</div>
          <div className="space-y-2 text-sm font-semibold text-slate-300">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded accent-rose-400" />
              <span>Day 2: 15 min scrolling each platform + comment, reply, follow</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded accent-rose-400" />
              <span>Day 3: 15 min scrolling each platform + save viral inspiration videos</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded accent-rose-400" />
              <span>Day 4–8: Repeat Day 2 & 3 + save 3–5 videos you can recreate per day</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <Link href="/growth-guide/account-creation" className="btn-dark px-5 py-2.5 text-xs font-bold">
            &larr; Step 1 Creation
          </Link>
          <Link href="/growth-guide/content-market-fit" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Next: Step 3 Content Market Fit &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
