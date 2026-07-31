"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function RidingTrendsPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-acc-amber mb-1">Section 5 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Riding Trends</h1>
          <p className="text-slate-300 text-base font-medium leading-relaxed">
            This is a good way to build momentum and get more views for new accounts. Hopping on a trending format or audio can outrank videos that were already doing well!
          </p>
        </div>

        <div className="plush-card p-6 space-y-4">
          <div className="text-base font-black text-white">How to Spot & Use Trends</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-extrabold text-wutang-metallic mb-1">1. Early Trend Spotting</div>
              <div className="text-xs text-slate-300 font-medium">Look for sounds/formats with 10k–50k uses that are growing rapidly.</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-extrabold text-azure-neon mb-1">2. Quick Adaptation</div>
              <div className="text-xs text-slate-300 font-medium">When you see a trend all over, adapt it to your niche within 24 hours.</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--c-fill-1))" }}>
              <div className="text-xs font-extrabold text-azure-neon mb-1">3. Mix It Up</div>
              <div className="text-xs text-slate-300 font-medium">Most content should be evergreen. Add 1–2 trend posts per week max.</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <Link href="/growth-guide/content-market-fit" className="btn-dark px-5 py-2.5 text-xs font-bold">
            &larr; Step 3 Market Fit
          </Link>
          <Link href="/growth-guide/views-to-customers" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Next: Views → Customers &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
