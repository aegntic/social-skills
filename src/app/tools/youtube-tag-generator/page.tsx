"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function YouTubeTagGeneratorPage() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateTags = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = keyword.trim();
    if (!clean) return;

    setTags([
      clean,
      `${clean} tutorial`,
      `how to ${clean}`,
      `best ${clean} 2026`,
      `${clean} guide for beginners`,
      `${clean} tips and tricks`,
      `${clean} strategy`,
      `${clean} secrets`,
      `${clean} step by step`,
      `${clean} workflow`,
      `${clean} automation`,
      `learn ${clean}`,
      `${clean} masterclass`,
      `${clean} 101`,
      `${clean} walkthrough`,
      `organic ${clean} growth`
    ]);
  };

  const csvString = tags.join(", ");
  const totalChars = csvString.length;

  const handleCopy = () => {
    if (!csvString) return;
    navigator.clipboard.writeText(csvString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            &larr; Back to Free Tools
          </Link>
          <div className="flex items-center gap-2">
            <PlatformColorLogo id="youtube" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">YouTube Tag Generator</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">YouTube Tag Generator</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Generate high-intent SEO tags formatted for YouTube Studio with 500-character budget management.
          </p>
        </div>

        <div className="plush-card p-8 mb-8 space-y-6">
          <form onSubmit={generateTags} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter YouTube video main topic (e.g. AI Video Editing)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
            />
            <button type="submit" className="btn-wutang px-6 py-3 text-xs font-black">
              Generate 16 Tags &rarr;
            </button>
          </form>

          {tags.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-azure-neon uppercase tracking-wider">Generated Tags ({tags.length}):</span>
                  <div className="text-[11px] text-slate-400 font-semibold">
                    Character Budget: <span className={totalChars > 500 ? "text-rose-400 font-bold" : "text-emerald-300 font-bold"}>{totalChars} / 500 chars</span>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="btn-wutang px-4 py-2 text-xs font-black"
                >
                  {copied ? "Copied CSV!" : "⚡ Copy All Tags (CSV)"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{tag}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({tag.length})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
