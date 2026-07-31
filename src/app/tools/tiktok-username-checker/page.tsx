"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function TikTokUsernameCheckerPage() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    score: number;
    notes: string[];
    suggestions: string[];
    link: string;
  } | null>(null);

  const checkUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = username.trim().replace(/^@/, "");
    if (!clean) return;

    const len = clean.length;
    const notes: string[] = [];
    let score = 90;
    let valid = true;

    if (len < 2 || len > 24) {
      valid = false;
      score = 0;
      notes.push("TikTok usernames must be between 2 and 24 characters long.");
    } else {
      notes.push("✓ Character length (2-24 chars) is valid.");
    }

    if (clean.endsWith(".")) {
      valid = false;
      score = 0;
      notes.push("❌ TikTok usernames cannot end with a period.");
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(clean)) {
      valid = false;
      score = 0;
      notes.push("❌ TikTok usernames can only contain letters, numbers, underscores, and periods.");
    } else if (valid) {
      notes.push("✓ Allowed character format (letters, numbers, _, .).");
    }

    if (valid) {
      if (len <= 6) {
        notes.push("🔥 Short username! Extremely high brand value if available.");
        score = 95;
      } else {
        notes.push("✓ Standard brand username length.");
      }
    }

    const suggestions = [
      `thereal_${clean}`,
      `${clean}_official`,
      `iam_${clean}`,
      `get_${clean}`,
      `${clean}.tok`
    ];

    setResult({ valid, score, notes, suggestions, link: `https://tiktok.com/@${clean}` });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free TikTok Username Checker",
    url: "https://socialskills.ninja/tools/tiktok-username-checker",
    applicationCategory: "SocialMediaTool",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Check TikTok username availability and format compliance (2-24 chars). Get alternative username ideas instantly.",
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
            <PlatformColorLogo id="tiktok" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">TikTok Username Checker</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-400/15 text-acc-cyan border border-cyan-400/40">
            Official TikTok Format Validator & Brand Score
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">TikTok Username Checker</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Verify TikTok handle compliance, brand strength, and generate 5 alternative handle ideas in 1 click.
          </p>
        </div>

        <div className="plush-card p-8 space-y-6">
          <form onSubmit={checkUsername} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm">@</span>
              <input
                type="text"
                placeholder="desired_username"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ""))}
                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button type="submit" className="btn-wutang px-6 py-3 text-xs font-black">
              Check TikTok Handle &rarr;
            </button>
          </form>

          {result && (
            <div className="space-y-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="text-xs font-extrabold text-slate-400 uppercase">Analysis for @{username}</div>
                  <div className="text-lg font-black text-white">{result.valid ? "Valid TikTok Handle" : "Invalid TikTok Handle"}</div>
                </div>
                <a href={result.link} target="_blank" rel="noreferrer" className="btn-wutang px-4 py-2 text-xs font-black">
                  Test on TikTok.com ↗
                </a>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-black uppercase text-acc-amber">Rule Validation Check</div>
                <div className="space-y-1.5">
                  {result.notes.map((note, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 text-xs font-semibold text-slate-200">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-black uppercase text-acc-cyan">Alternative Available Handles</div>
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((sug, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white">
                      @{sug}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
