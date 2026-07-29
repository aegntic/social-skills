"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkVideoCreationPage() {
  const [template, setTemplate] = useState("2x2_grid");
  const [script, setScript] = useState("");

  return (
    <DashboardShell title="Bulk Video Creation Wizard">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="plush-card p-8 space-y-6">
          <div className="text-sm font-extrabold text-white">1. Select AI Video Template</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "2x2_grid", name: "2x2 Grid Video", desc: "4 images/clips grid layout" },
              { id: "single_fade", name: "Single Fade-in Video", desc: "Minimalist cinematic text reveal" },
              { id: "ai_ugc", name: "AI UGC Creator", desc: "Authentic UGC talking head" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  template === t.id
                    ? "btn-wutang"
                    : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                <div className="font-extrabold text-sm mb-1">{t.name}</div>
                <div className="text-[10px] opacity-80 font-medium">{t.desc}</div>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-white">2. Paste Video Script / Batch Hooks (1 per line)</label>
            <textarea
              rows={6}
              placeholder="Hook 1: How I got 1M views on TikTok...&#10;Hook 2: Stop making this mistake on Reels...&#10;Hook 3: 3 tools I use to scale..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <button className="btn-wutang w-full py-4 text-sm font-black">
            Batch Generate Videos Now
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
