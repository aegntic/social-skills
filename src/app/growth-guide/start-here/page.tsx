"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function StartHerePage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Section 1 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Welcome to the Organic Growth Guide</h1>
          <p className="text-slate-300 text-base font-medium">
            This is the exact system used to get 30,000+ app downloads in 30 days using only organic content on TikTok and Instagram. No ads. No budget. Just a proven system you can start today.
          </p>
        </div>

        <div className="plush-card p-6 border-l-4 border-wutang-yellow">
          <div className="text-sm font-extrabold text-white mb-2">The 30-Day Timeline</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-bold text-wutang-metallic">DAY 1</div>
              <div className="text-sm font-extrabold text-white">Account Creation</div>
              <div className="text-xs text-slate-400 mt-1">Set up new TikTok & Instagram accounts properly</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-bold text-azure-neon">DAYS 2–8</div>
              <div className="text-sm font-extrabold text-white">Account Warmup</div>
              <div className="text-xs text-slate-400 mt-1">Train the algorithm (DO NOT POST YET)</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-bold text-azure-neon">DAYS 8–30</div>
              <div className="text-sm font-extrabold text-white">Content Testing</div>
              <div className="text-xs text-slate-400 mt-1">Find your winning content format</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-bold text-acc-purple">DAYS 30+</div>
              <div className="text-sm font-extrabold text-white">Scaling Up</div>
              <div className="text-xs text-slate-400 mt-1">Multiply reach across multiple platforms</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <span className="text-xs text-slate-500 font-bold">Section 1 of 7</span>
          <Link href="/growth-guide/account-creation" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Next: Step 1 Account Creation &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
