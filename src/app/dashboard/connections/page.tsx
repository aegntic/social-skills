"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

export default function ConnectionsPage() {
  return (
    <DashboardShell title="Connected Social Accounts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-xs text-slate-400 font-semibold">5 of 15 accounts connected</div>
          <button className="btn-wutang px-4 py-2 text-xs font-black">+ Connect Account</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { platform: "twitter", handle: "@aegntix", status: "Active" },
            { platform: "youtube", handle: "@prompt FaiL", status: "Active" },
            { platform: "instagram", handle: "@hlfstr_4332", status: "Active" },
            { platform: "linkedin", handle: "@Mattae K. Cooper", status: "Active" },
            { platform: "linkedin", handle: "@ae ltd", status: "Active" }
          ].map((acc, i) => (
            <div key={i} className="plush-card p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PlatformColorLogo id={acc.platform as Platform} className="h-8 w-8" />
                <div>
                  <div className="font-extrabold text-white text-sm capitalize">{acc.platform}</div>
                  <div className="text-xs text-slate-400 font-semibold">{acc.handle}</div>
                </div>
              </div>
              <span className="plush-badge-azure text-[9px] font-black">{acc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
