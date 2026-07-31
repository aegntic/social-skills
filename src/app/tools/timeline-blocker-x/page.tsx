"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function TimelineBlockerXPage() {
  const [hideFeed, setHideFeed] = useState(true);
  const [hideTrends, setHideTrends] = useState(true);
  const [hideExplore, setHideExplore] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewBlocked, setPreviewBlocked] = useState(true);

  const getCssRules = () => {
    const rules: string[] = [];
    if (hideFeed) rules.push(`[aria-label="Home timeline"], [data-testid="primaryColumn"] section { display: none !important; }`);
    if (hideTrends) rules.push(`[data-testid="sidebarColumn"] [aria-label="Timeline: Trending now"] { display: none !important; }`);
    if (hideExplore) rules.push(`a[data-testid="AppTabBar_Explore_Link"] { display: none !important; }`);
    return rules.join("\n");
  };

  const getUblockRules = () => {
    const rules: string[] = [];
    if (hideFeed) rules.push(`x.com##[aria-label="Home timeline"]`);
    if (hideTrends) rules.push(`x.com##[data-testid="sidebarColumn"]`);
    if (hideExplore) rules.push(`x.com##a[data-testid="AppTabBar_Explore_Link"]`);
    return rules.join("\n");
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Timeline Blocker for Twitter / X",
    url: "https://socialskills.ninja/tools/timeline-blocker-x",
    applicationCategory: "ProductivityTool",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Block the X/Twitter home timeline and trending sidebar to eliminate doomscrolling while retaining compose and DM capabilities.",
  };

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "rgb(var(--c-ink))", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        <div className="flex items-center justify-between mb-2">
          <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            &larr; Back to Free Tools
          </Link>
          <div className="flex items-center gap-2">
            <PlatformColorLogo id="twitter" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">Timeline Blocker for X</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-400/15 text-acc-cyan border border-cyan-400/40">
            Focus & Productivity Script Generator
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Timeline Blocker for X/Twitter</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Block your Twitter/X home timeline and trending sidebar so you can post, reply to DMs, and build without doomscrolling.
          </p>
        </div>

        <div className="plush-card p-8 space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-acc-amber">1. Customize What To Block</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setHideFeed(!hideFeed)}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  hideFeed ? "bg-amber-400/20 border-amber-400 text-acc-amber" : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {hideFeed ? "✓ Home Timeline Blocked" : "Block Home Timeline"}
              </button>

              <button
                onClick={() => setHideTrends(!hideTrends)}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  hideTrends ? "bg-amber-400/20 border-amber-400 text-acc-amber" : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {hideTrends ? "✓ Trending Sidebar Blocked" : "Block Trending Sidebar"}
              </button>

              <button
                onClick={() => setHideExplore(!hideExplore)}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  hideExplore ? "bg-amber-400/20 border-amber-400 text-acc-amber" : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {hideExplore ? "✓ Explore Tab Blocked" : "Block Explore Tab"}
              </button>
            </div>
          </div>

          {/* Generated Code & uBlock Filters */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-azure-neon uppercase tracking-wider">uBlock Origin / AdGuard Filter Rules</span>
              <button onClick={() => handleCopy(getUblockRules())} className="btn-wutang px-3.5 py-1 text-xs font-black">
                {copied ? "Copied!" : "⚡ Copy uBlock Filters"}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-acc-cyan font-mono text-xs overflow-x-auto border border-slate-800">
              {getUblockRules()}
            </pre>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-wutang-metallic uppercase tracking-wider">Custom CSS Code (Stylus / Stylish)</span>
              <button onClick={() => handleCopy(getCssRules())} className="btn-dark px-3.5 py-1 text-xs font-bold">
                Copy CSS
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-acc-amber font-mono text-xs overflow-x-auto border border-slate-800">
              {getCssRules()}
            </pre>
          </div>

          {/* Live Preview Simulation */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white uppercase">X Feed Simulator Preview</span>
              <button onClick={() => setPreviewBlocked(!previewBlocked)} className="btn-dark text-[10px] px-3 py-1 font-bold">
                Toggle Simulator ({previewBlocked ? "Blocked Mode" : "Normal Mode"})
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
              {previewBlocked ? (
                <div className="py-8 space-y-2">
                  <div className="text-2xl">⚡</div>
                  <div className="text-sm font-black text-acc-amber">Timeline Blocked & Focus Active</div>
                  <div className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
                    No doomscrolling allowed. Use Social Skills to publish content to X without distractions.
                  </div>
                  <Link href="/signup" className="btn-wutang px-4 py-2 text-xs font-black inline-block mt-2">
                    Open Compose Desk &rarr;
                  </Link>
                </div>
              ) : (
                <div className="py-6 text-xs text-slate-400 font-mono space-y-2">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-left">Random User @user123: Breaking outrage story...</div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-left">Hot Take @influencer: Why you are doing everything wrong...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
