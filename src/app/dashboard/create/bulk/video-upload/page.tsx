"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkVideoUploadPage() {
  return (
    <DashboardShell title="Bulk Video Upload">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="plush-card p-8 text-center space-y-6">
          <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 text-center hover:border-cyan-400 transition-colors cursor-pointer" style={{ background: "#020617" }}>
            <div className="text-xs font-bold text-azure-neon uppercase tracking-wider mb-2">MP4, MOV, WEBM UP TO 500MB EACH</div>
            <div className="text-xs text-slate-400 font-semibold">Upload up to 50 short-form video files</div>
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/dashboard/bulk-tools" className="btn-dark px-5 py-2.5 text-xs font-bold">
              Cancel
            </Link>
            <button className="btn-wutang px-6 py-2.5 text-xs font-black">
              Next: Configure Captions & Scheduling &rarr;
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
