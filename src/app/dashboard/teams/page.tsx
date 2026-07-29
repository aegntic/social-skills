"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function TeamsPage() {
  return (
    <DashboardShell title="Team Workspaces">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-xs text-slate-400 font-semibold">Active workspace: <strong>Main Team</strong></div>
          <button className="btn-wutang px-4 py-2 text-xs font-black">+ Invite Team Member</button>
        </div>

        <div className="plush-card p-6 divide-y divide-slate-800">
          {[
            { name: "Admin Lead (Owner)", email: "admin@socialskills.ninja", role: "Owner" },
            { name: "Alex Editor", email: "alex@postbridge.com", role: "Content Manager" }
          ].map((member, i) => (
            <div key={i} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
              <div>
                <div className="font-extrabold text-white text-sm">{member.name}</div>
                <div className="text-xs text-slate-400 font-semibold">{member.email}</div>
              </div>
              <span className="plush-badge-wutang text-[10px] font-black">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
