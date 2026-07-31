"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function TikTokCaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<"viral" | "story" | "converting" | "humor">("viral");
  const [captions, setCaptions] = useState<{ hook: string; body: string; hashtags: string; fullText: string }[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generateCaptions = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = topic.trim();
    if (!clean) return;

    const tagTopic = clean.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    let generated: { hook: string; body: string; hashtags: string; fullText: string }[] = [];

    if (tone === "viral") {
      generated = [
        {
          hook: `🛑 STOP SCROLLING! If you care about ${clean}, watch this immediately.`,
          body: `Most people are doing ${clean} completely wrong in 2026. Here is the exact secret protocol to get 10x better results.`,
          hashtags: `#fyp #${tagTopic} #viral #foryou #lifehack #algorithm`,
          fullText: `🛑 STOP SCROLLING! If you care about ${clean}, watch this immediately.\n\nMost people are doing ${clean} completely wrong in 2026. Here is the exact secret protocol to get 10x better results.\n\n#fyp #${tagTopic} #viral #foryou #lifehack`,
        },
        {
          hook: `Nobody is talking about this ${clean} hack... 🤫`,
          body: `Save this video before it gets taken down. This one adjustment saved me over 5 hours every week.`,
          hashtags: `#${tagTopic} #creatortips #growth #viralhack #fyp`,
          fullText: `Nobody is talking about this ${clean} hack... 🤫\n\nSave this video before it gets taken down. This one adjustment saved me over 5 hours every week.\n\n#${tagTopic} #creatortips #growth #viralhack #fyp`,
        },
        {
          hook: `3 reasons why ${clean} will explode in 2026 🔥`,
          body: `Reason 1: Higher reach.\nReason 2: Zero competition if you act now.\nReason 3: Maximum ROI.\n\nWhich one are you implementing first?`,
          hashtags: `#${tagTopic} #trending #future #productivity #fyp`,
          fullText: `3 reasons why ${clean} will explode in 2026 🔥\n\nReason 1: Higher reach.\nReason 2: Zero competition if you act now.\nReason 3: Maximum ROI.\n\nWhich one are you implementing first?\n\n#${tagTopic} #trending #future #productivity #fyp`,
        },
      ];
    } else if (tone === "story") {
      generated = [
        {
          hook: `I spent 30 days testing ${clean} so you don't have to.`,
          body: `Here is what happened, what went wrong, and the single change that turned everything around.`,
          hashtags: `#${tagTopic} #storytime #experiment #creatorjourney`,
          fullText: `I spent 30 days testing ${clean} so you don't have to.\n\nHere is what happened, what went wrong, and the single change that turned everything around.\n\n#${tagTopic} #storytime #experiment #creatorjourney`,
        },
        {
          hook: `How I mastered ${clean} starting from absolute zero 📈`,
          body: `If I had to restart today with $0, this is the exact 3-step strategy I would use.`,
          hashtags: `#${tagTopic} #beginnersguide #roadmap #growthmindset`,
          fullText: `How I mastered ${clean} starting from absolute zero 📈\n\nIf I had to restart today with $0, this is the exact 3-step strategy I would use.\n\n#${tagTopic} #beginnersguide #roadmap #growthmindset`,
        },
      ];
    } else {
      generated = [
        {
          hook: `Want better results with ${clean}? Read this 👇`,
          body: `Click the link in bio or drop a comment below to get my free breakdown guide.`,
          hashtags: `#${tagTopic} #linkinbio #freeguide #growth`,
          fullText: `Want better results with ${clean}? Read this 👇\n\nClick the link in bio or drop a comment below to get my free breakdown guide.\n\n#${tagTopic} #linkinbio #freeguide #growth`,
        },
      ];
    }

    setCaptions(generated);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free TikTok Caption & Viral Hook Generator",
    url: "https://socialskills.ninja/tools/tiktok-caption-generator",
    applicationCategory: "SocialMediaTool",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Generate viral TikTok hooks, story captions, and targeted hashtag stacks instantly with zero signup.",
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
            <span className="font-extrabold text-white text-sm">TikTok Caption Generator</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-400/15 text-acc-amber border border-amber-400/40">
            Viral Hook & Hashtag Stack Generator
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">TikTok Caption Generator</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Generate high-CTR TikTok hooks, story captions, and viral hashtag stacks in 1 click.
          </p>
        </div>

        <div className="plush-card p-8 space-y-6">
          <form onSubmit={generateCaptions} className="space-y-4">
            <div className="flex gap-2 justify-center">
              {(["viral", "story", "converting"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                    tone === t ? "btn-wutang" : "btn-dark"
                  }`}
                >
                  {t} Mode
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your video topic (e.g. AI Video Editing, SaaS Growth)..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" className="btn-wutang px-6 py-3 text-xs font-black">
                Generate Captions &rarr;
              </button>
            </div>
          </form>

          {captions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="text-xs font-black text-azure-neon uppercase tracking-wider">Generated Viral TikTok Captions ({captions.length})</div>
              {captions.map((cap, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="text-xs font-black text-acc-amber">Option #{idx + 1}</div>
                    <button
                      onClick={() => handleCopy(cap.fullText, idx)}
                      className="btn-wutang px-3.5 py-1 text-xs font-black"
                    >
                      {copiedIdx === idx ? "Copied!" : "⚡ Copy Caption"}
                    </button>
                  </div>
                  <div className="text-xs text-slate-100 font-medium whitespace-pre-wrap leading-relaxed">
                    {cap.fullText}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
