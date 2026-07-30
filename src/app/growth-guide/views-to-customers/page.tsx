"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function ViewsToCustomersPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">Section 6 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Views → Customers</h1>
          <p className="text-slate-300 text-base font-medium leading-relaxed">
            Now let&apos;s turn those views into paying customers. Getting views is just the first step — the real goal is converting viewers into users who visit your site or download your app.
          </p>
        </div>

        <div className="plush-card p-6 space-y-4">
          <div className="text-base font-black text-white">What Works For Conversions</div>
          <div className="space-y-3">
            {[
              { title: "Create content around problems your app solves", body: "Make content that helps people with problems your app can fix. Mention your app naturally as the solution." },
              { title: "Show, don't just tell", body: "Show your app in action. Screen recordings and real usage work 10x better than talking slides." },
              { title: "Reply to comments strategically", body: "When people ask questions in comments, give helpful answers and naturally mention your app link." }
            ].map((c, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: "#20242e" }}>
                <div className="text-xs font-extrabold text-azure-neon mb-1">{c.title}</div>
                <div className="text-xs text-slate-300 font-medium">{c.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <Link href="/growth-guide/riding-trends" className="btn-dark px-5 py-2.5 text-xs font-bold">
            &larr; Riding Trends
          </Link>
          <Link href="/growth-guide/scaling-system" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Next: Scaling System &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
