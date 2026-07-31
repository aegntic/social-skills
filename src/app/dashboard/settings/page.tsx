"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function SettingsPage() {
  const [mcpUrl, setMcpUrl] = useState("http://localhost:3456/api/mcp");
  const [use24Hour, setUse24Hour] = useState(false);

  return (
    <DashboardShell title="Account & Preferences Settings">
      <div className="max-w-3xl space-y-8">
        <div className="plush-card p-6 space-y-6">
          <div className="text-sm font-black text-white">Profile Preferences</div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value="user@postbridge.com"
                readOnly
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 font-bold text-xs"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-white">Use 24-hour time format</div>
                <div className="text-[10px] text-slate-400">Display 14:00 instead of 2:00 PM in scheduling queues</div>
              </div>
              <input
                type="checkbox"
                checked={use24Hour}
                onChange={(e) => setUse24Hour(e.target.checked)}
                className="h-4 w-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="plush-card p-6 space-y-4">
          <div className="text-sm font-black text-white flex items-center gap-2">
            <span>Claude / Agent MCP Server Endpoint</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Use this URL to connect your local AI agents (Claude, OpenClaw, Antigravity) to Post Bridge.</p>
          <input
            type="text"
            value={mcpUrl}
            onChange={(e) => setMcpUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-acc-amber font-mono text-xs focus:outline-none focus:border-amber-400"
          />
          <button className="btn-wutang px-6 py-2.5 text-xs font-black">Save MCP Settings</button>
        </div>
      </div>
    </DashboardShell>
  );
}
