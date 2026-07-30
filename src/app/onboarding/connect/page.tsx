"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import type { Platform } from "@/lib/types";

const CONNECTED_DEFAULTS = [
  { platform: "twitter", handle: "@aegntix", name: "Twitter/X" },
  { platform: "youtube", handle: "@prompt FaiL", name: "YouTube" },
  { platform: "instagram", handle: "@hlfstr_4332", name: "Instagram" },
  { platform: "linkedin", handle: "@Mattae K. Cooper", name: "LinkedIn" },
  { platform: "linkedin", handle: "@ae ltd", name: "LinkedIn" }
];

export default function OnboardingConnectPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <SiteHeader authed={false} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Step 2 of 3 &bull; Connected Accounts
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Connect Your Accounts</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold leading-relaxed">
            Manage all your social media accounts and AI agents from one unified desk.
          </p>
        </div>

        <div className="plush-card p-6 md:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-bold flex items-center justify-center gap-2">
            <span>⚡ Connection Manager Active</span>
            <span className="font-normal text-amber-300/80">Manage accounts connected to your desk below.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {CONNECTED_DEFAULTS.map((acc, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#161920] border border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PlatformColorLogo id={acc.platform as Platform} className="h-8 w-8" />
                  <div>
                    <div className="text-xs font-extrabold text-white">{acc.name}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{acc.handle}</div>
                  </div>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"></div>
              </div>
            ))}
            <button
              onClick={() => setShowAddModal(true)}
              className="p-4 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-400 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-[#161920]"
            >
              <span>+ Add Connection</span>
            </button>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <Link href="/onboarding/start" className="btn-dark px-6 py-3 text-xs font-bold">
              &larr; Back
            </Link>
            <Link href="/onboarding/plans" className="btn-wutang px-8 py-3 text-xs font-black">
              Next &rarr;
            </Link>
          </div>
        </div>
      </main>

      {/* Add Accounts Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="plush-card max-w-lg w-full p-8 text-left relative space-y-6">
            <div>
              <h2 className="text-xl font-black text-white mb-1">Add Social Connections</h2>
              <p className="text-xs text-slate-400 font-medium">Connect your accounts to post to all networks at once.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {["instagram", "twitter", "tiktok", "youtube", "facebook", "linkedin", "bluesky", "threads", "pinterest"].map((p) => (
                <button
                  key={p}
                  onClick={() => setShowAddModal(false)}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400 flex flex-col items-center gap-2 transition-colors"
                >
                  <PlatformColorLogo id={p as Platform} className="h-7 w-7" />
                  <span className="text-[10px] font-extrabold capitalize text-white">{p}</span>
                  <span className="btn-wutang text-[9px] px-2 py-0.5 font-black">Add</span>
                </button>
              ))}
            </div>

            <button onClick={() => setShowAddModal(false)} className="btn-dark w-full py-2.5 text-xs font-bold">
              Close Modal
            </button>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
