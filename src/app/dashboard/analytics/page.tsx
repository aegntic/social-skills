"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function AnalyticsPage() {
  return (
    <DashboardShell title="Analytics Overview">
      <div className="space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="plush-card p-6 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Impressions</div>
            <div className="text-3xl font-black text-wutang-metallic">1,428,500</div>
            <div className="text-[10px] text-azure-neon font-bold mt-1">↑ 42% this week</div>
          </div>
          <div className="plush-card p-6 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Engagements</div>
            <div className="text-3xl font-black text-azure-neon">184,200</div>
            <div className="text-[10px] text-azure-neon font-bold mt-1">↑ 28% this week</div>
          </div>
          <div className="plush-card p-6 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Posts Published</div>
            <div className="text-3xl font-black text-white">48</div>
            <div className="text-[10px] text-slate-400 font-bold mt-1">Across 5 accounts</div>
          </div>
          <div className="plush-card p-6 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Link Clicks</div>
            <div className="text-3xl font-black text-purple-400">12,450</div>
            <div className="text-[10px] text-azure-neon font-bold mt-1">8.7% CTR</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
