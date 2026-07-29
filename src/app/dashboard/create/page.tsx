"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardCreateHubPage() {
  return (
    <DashboardShell title="Create a new post">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            href="/dashboard/create/text"
            className="plush-card p-8 text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="font-black text-2xl text-wutang-metallic mb-4">TEXT</span>
            <div className="font-extrabold text-white text-base mb-1">Text Post</div>
            <div className="text-xs text-slate-400 font-medium">Text, threads & short updates</div>
          </Link>

          <div className="plush-card p-8 text-center flex flex-col items-center justify-center hover:scale-105 transition-transform opacity-90">
            <span className="font-black text-2xl text-azure-neon mb-4">IMAGE</span>
            <div className="font-extrabold text-white text-base mb-1">Image Post</div>
            <div className="text-xs text-slate-400 font-medium">Single images & carousels</div>
          </div>

          <div className="plush-card p-8 text-center flex flex-col items-center justify-center hover:scale-105 transition-transform opacity-90">
            <span className="font-black text-2xl text-purple-400 mb-4">VIDEO</span>
            <div className="font-extrabold text-white text-base mb-1">Video Post</div>
            <div className="text-xs text-slate-400 font-medium">Reels, Shorts & TikToks</div>
          </div>

          <div className="plush-card p-8 text-center flex flex-col items-center justify-center hover:scale-105 transition-transform opacity-90">
            <span className="font-black text-2xl text-azure-neon mb-4">STORY</span>
            <div className="font-extrabold text-white text-base mb-1">Story Post</div>
            <div className="text-xs text-slate-400 font-medium">Instagram & Facebook stories</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
