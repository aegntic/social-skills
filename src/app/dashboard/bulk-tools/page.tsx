"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkToolsHubPage() {
  return (
    <DashboardShell title="Bulk Tools">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/create/bulk/video-upload"
            className="plush-card p-8 flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <div>
              <div className="font-black text-2xl text-wutang-metallic mb-4">VIDEO BATCH</div>
              <div className="font-extrabold text-white text-lg mb-2">Bulk Video Upload</div>
              <p className="text-xs text-slate-400 font-medium mb-6">
                Upload up to 50 videos at once, generate titles and captions with AI, and schedule across accounts.
              </p>
            </div>
            <span className="text-xs font-bold text-wutang-metallic flex items-center gap-1">Open tool &rarr;</span>
          </Link>

          <Link
            href="/dashboard/create/bulk/image-upload"
            className="plush-card p-8 flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <div>
              <div className="font-black text-2xl text-azure-neon mb-4">IMAGE BATCH</div>
              <div className="font-extrabold text-white text-lg mb-2">Bulk Image Upload</div>
              <p className="text-xs text-slate-400 font-medium mb-6">
                Upload images in bulk, attach captions, and auto-queue post schedules.
              </p>
            </div>
            <span className="text-xs font-bold text-wutang-metallic flex items-center gap-1">Open tool &rarr;</span>
          </Link>

          <Link
            href="/dashboard/create/bulk/video-creation"
            className="plush-card p-8 flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <div>
              <div className="font-black text-2xl text-acc-purple mb-4">AI GENERATOR</div>
              <div className="font-extrabold text-white text-lg mb-2">Bulk Video Creation</div>
              <p className="text-xs text-slate-400 font-medium mb-6">
                Generate dozens of UGC-style videos automatically using AI templates and script feeds.
              </p>
            </div>
            <span className="text-xs font-bold text-wutang-metallic flex items-center gap-1">Open tool &rarr;</span>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
