"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

export default function CreateTextPostPage() {
  const [caption, setCaption] = useState("");
  const [scheduled, setScheduled] = useState(false);

  return (
    <DashboardShell title="Create text post">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          {/* Target Accounts Selector */}
          <div className="plush-card p-4 flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Target Accounts:</span>
            <div className="flex gap-2">
              {["twitter", "linkedin"].map((p) => (
                <div key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
                  <PlatformColorLogo id={p as Platform} className="h-4 w-4" />
                  <span className="text-xs font-extrabold capitalize text-white">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Caption Box */}
          <div className="plush-card p-6 space-y-4">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Main Caption</div>
            <textarea
              rows={10}
              placeholder="Start writing your post here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-amber-400 resize-none"
            />
            <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
              <span>{caption.length} / 2200 characters</span>
              <button className="btn-dark px-3 py-1 text-[10px]">AI Polish</button>
            </div>
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="space-y-6">
          <div className="plush-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white">Schedule post</span>
              <input
                type="checkbox"
                checked={scheduled}
                onChange={(e) => setScheduled(e.target.checked)}
                className="h-4 w-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            <button className="btn-wutang w-full py-3.5 text-xs font-black">
              {scheduled ? "Schedule Post" : "Post Now"}
            </button>
            <button className="btn-dark w-full py-2.5 text-xs font-bold">
              Save to Drafts
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
