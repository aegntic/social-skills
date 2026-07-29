"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState("ss_live_9f83a2d1e04b78c93a401b");
  const [copied, setCopied] = useState(false);
  const [credits, setCredits] = useState(42850);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardShell title="AI Agents, MCP & API Keys">
      <div className="max-w-4xl space-y-8">
        {/* Credits Balance & Top-up Bar */}
        <div className="plush-card p-6 border-l-4 border-l-amber-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-1">API Credit Balance</div>
            <div className="text-3xl font-black text-white">{credits.toLocaleString()} / 50,000 Credits</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">1 API Credit = 1 Social Post Dispatch across your connected channels.</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCredits((c) => c + 10000)}
              className="btn-wutang px-4 py-2 text-xs font-black flex items-center gap-1.5"
            >
              <span>+ 10,000 Credits ($5)</span>
            </button>
          </div>
        </div>

        {/* Live Secret Key */}
        <div className="plush-card p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-black text-white">Live Agent & Production Secret Key</div>
              <div className="text-xs text-slate-400 font-medium">Use this key to authenticate requests from LLM agents, MCP tools, or custom code.</div>
            </div>
            <button onClick={() => setApiKey(`ss_live_${Math.random().toString(36).slice(2)}`)} className="btn-dark text-xs px-3 py-1.5 font-bold">
              Roll Key
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-amber-300 flex justify-between items-center">
            <span>{apiKey}</span>
            <button onClick={() => handleCopy(apiKey)} className="btn-wutang text-[10px] px-3 py-1 font-bold">
              {copied ? "Copied!" : "Copy Key"}
            </button>
          </div>
        </div>

        {/* Agent Credit Packs / Add-Ons */}
        <div className="plush-card p-6 space-y-4">
          <div className="text-sm font-black text-white">API Credit Add-Ons (Agent Pay-As-You-Go)</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-black text-amber-400">STARTER PACK</div>
              <div className="text-xl font-black text-white">10,000 Credits</div>
              <div className="text-xs text-slate-400 font-semibold">$5 one-time top up</div>
              <button onClick={() => setCredits((c) => c + 10000)} className="btn-wutang w-full text-xs font-black py-2">
                Buy $5 Pack
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 space-y-3 relative">
              <span className="absolute -top-2.5 right-3 bg-cyan-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">Best Value</span>
              <div className="text-xs font-black text-azure-neon">GROWTH PACK</div>
              <div className="text-xl font-black text-white">50,000 Credits</div>
              <div className="text-xs text-slate-400 font-semibold">$20 one-time top up</div>
              <button onClick={() => setCredits((c) => c + 50000)} className="btn-wutang w-full text-xs font-black py-2">
                Buy $20 Pack
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-black text-purple-400">AGENCY PACK</div>
              <div className="text-xl font-black text-white">150,000 Credits</div>
              <div className="text-xs text-slate-400 font-semibold">$50 one-time top up</div>
              <button onClick={() => setCredits((c) => c + 150000)} className="btn-wutang w-full text-xs font-black py-2">
                Buy $50 Pack
              </button>
            </div>
          </div>
        </div>

        {/* MCP & OpenClaw Agent Native Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MCP Server Setup */}
          <div className="plush-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-black text-white">1. Model Context Protocol (MCP)</div>
              <span className="text-[10px] font-extrabold bg-cyan-400/20 text-azure-neon px-2 py-0.5 rounded-full border border-cyan-400/30">Native MCP</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Add Social Skills to Claude Desktop, Cursor, or Gemini CLI.</div>
            <pre className="p-4 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
{`{
  "mcpServers": {
    "socialskills": {
      "command": "npx",
      "args": ["-y", "@socialskills/mcp"],
      "env": {
        "SOCIALSKILLS_API_KEY": "${apiKey}"
      }
    }
  }
}`}
            </pre>
          </div>

          {/* OpenClaw & Agent Skill Installer */}
          <div className="plush-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-black text-white">2. OpenClaw & Agent Skill CLI</div>
              <span className="text-[10px] font-extrabold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">CLI Ready</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Install official skill for Antigravity, AGY, or OpenClaw runner.</div>
            <pre className="p-4 rounded-xl bg-slate-900 text-amber-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
{`# Install Social Skills Agent Skill
npx agy skill add socialskills

# Run OpenClaw Cross-Post Command
npx openclaw exec socialskills:post \\
  --caption "Hello World" \\
  --networks x,instagram,linkedin`}
            </pre>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
