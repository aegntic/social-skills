"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function LinkedInTextFormatterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toBold = (str: string) => {
    return str.replace(/[a-zA-Z0-9]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + (code - 48));
      return char;
    });
  };

  const toItalic = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d44e + (code - 97));
      return char;
    });
  };

  const applyBold = () => {
    setText((prev) => toBold(prev));
  };

  const applyItalic = () => {
    setText((prev) => toItalic(prev));
  };

  const applyBullets = () => {
    setText((prev) =>
      prev
        .split("\n")
        .map((line) => (line.trim() && !line.startsWith("• ") ? `• ${line}` : line))
        .join("\n")
    );
  };

  const applySpacing = () => {
    setText((prev) => prev.split("\n").join("\n\n"));
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
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
            <PlatformColorLogo id="linkedin" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">LinkedIn Text Formatter</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">LinkedIn Text Formatter</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Convert standard text into bold (𝗕𝗼𝗹𝗱), italic (𝘐𝘵𝘢𝘭𝘪𝘤), and bullet points to bypass LinkedIn's plain-text limitations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="plush-card p-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-azure-neon uppercase tracking-wider">Draft Input</span>
              <span className="text-[10px] text-slate-400 font-bold">{text.length} / 3,000 chars</span>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex gap-2 flex-wrap">
              <button onClick={applyBold} className="btn-dark text-xs px-3 py-1 font-black">
                𝗕 Bold
              </button>
              <button onClick={applyItalic} className="btn-dark text-xs px-3 py-1 font-black">
                𝘐 Italic
              </button>
              <button onClick={applyBullets} className="btn-dark text-xs px-3 py-1 font-black">
                • Bullets
              </button>
              <button onClick={applySpacing} className="btn-dark text-xs px-3 py-1 font-black">
                ↵ Double Space
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or write your LinkedIn post draft here..."
              className="flex-1 w-full p-4 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-cyan-400 min-h-[220px]"
            />
          </div>

          <div className="plush-card p-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-wutang-metallic uppercase tracking-wider">Formatted Output</span>
              <button onClick={handleCopy} className="btn-wutang px-4 py-1.5 text-xs font-black">
                {copied ? "Copied!" : "⚡ Copy Formatted Text"}
              </button>
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-sm leading-relaxed overflow-y-auto min-h-[220px] whitespace-pre-wrap">
              {text || <span className="text-slate-500 italic">Formatted output will appear here as you type or click formatting buttons...</span>}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
