"use client";

import React from "react";
import Link from "next/link";

export default function GrowthGuideMainPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(26, 29, 36, 0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-black text-wutang-metallic text-lg">S/</span>
            <span className="font-black text-white text-lg">social<span className="text-wutang-metallic">.skills</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white">Home</Link>
            <Link href="/signup" className="btn-wutang px-4 py-2 text-xs font-black">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center max-w-4xl mx-auto px-6">
        <div className="plush-badge-wutang mb-4">ORGANIC GROWTH GUIDE</div>
        <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
          How to go from <br />
          <span className="text-slate-400">0 views</span> to <span className="text-wutang-metallic">1M+ views</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 font-medium">
          Using the system that generated 500M+ views on TikTok & Instagram... Leading to 100K+ downloads & $30K+ for my app
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <Link href="/growth-guide/start-here" className="btn-wutang px-8 py-4 text-base font-black">
            Get started &rarr;
          </Link>
        </div>

        {/* 30-Day Modules Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left mb-16">
          {[
            { href: "/growth-guide/start-here", step: "START HERE", title: "30-Day Action Plan", desc: "Exact steps to get more views on TikTok & Instagram in the next 30 days." },
            { href: "/growth-guide/account-creation", step: "DAY 1", title: "Account Creation", desc: "Setting up new accounts properly to avoid bot flags and shadowbans." },
            { href: "/growth-guide/account-warmup", step: "DAYS 2-8", title: "Account Warmup Protocol", desc: "Warm up accounts before posting your first reel or video." },
            { href: "/growth-guide/content-market-fit", step: "DAYS 8-30", title: "Content Market Fit", desc: "How to find winning formulas and formats for your niche." },
            { href: "/growth-guide/riding-trends", step: "MAXING OUT", title: "Riding Trends", desc: "Leverage trending sounds and topics to multiply reach." },
            { href: "/growth-guide/views-to-customers", step: "MAXING OUT", title: "Views -> Customers", desc: "Convert views into paying customers with strategic CTAs." }
          ].map((m, idx) => (
            <Link key={idx} href={m.href} className="plush-card p-6 block hover:scale-105 transition-transform">
              <div className="text-[10px] font-extrabold text-azure-neon uppercase tracking-wider mb-2">{m.step}</div>
              <div className="font-extrabold text-white text-base mb-2">{m.title}</div>
              <div className="text-xs text-slate-400 font-medium leading-relaxed">{m.desc}</div>
            </Link>
          ))}
        </div>

        {/* Proof Stats */}
        <div className="plush-card p-10 text-center mb-16">
          <div className="text-4xl font-black text-wutang-metallic mb-2">500M+ Views Generated</div>
          <div className="text-sm font-semibold text-slate-400 mb-6">Real Instagram & TikTok stats using this exact strategy</div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl" style={{ background: "#20242e" }}>
              <div className="text-2xl font-black text-white">132,000+</div>
              <div className="text-xs text-slate-400 font-semibold">Direct Downloads</div>
            </div>
            <div className="p-4 rounded-2xl" style={{ background: "#20242e" }}>
              <div className="text-2xl font-black text-azure-neon">$33,000+</div>
              <div className="text-xs text-slate-400 font-semibold">App Revenue</div>
            </div>
          </div>
        </div>

        {/* Free Guide Card */}
        <div className="plush-card p-8 sm:p-12 text-center max-w-lg mx-auto border-2 border-amber-400/40">
          <div className="text-xs font-black text-wutang-metallic uppercase tracking-widest mb-2">NO SIGNUP REQUIRED</div>
          <div className="text-3xl font-black text-white mb-2">Growth Guide</div>
          <div className="text-4xl font-black text-wutang-metallic mb-6">$0 (FREE)</div>
          <ul className="text-left text-sm space-y-2 text-slate-300 font-semibold mb-8 max-w-xs mx-auto">
            <li>[✓] 30-day timeline for growth</li>
            <li>[✓] Account warmup protocol</li>
            <li>[✓] How to find winning formats</li>
            <li>[✓] Converting views into customers</li>
            <li>[✓] Scaling workflows for small teams</li>
          </ul>
          <Link href="/growth-guide/start-here" className="btn-wutang py-3.5 px-8 text-base font-black w-full block">
            Start Learning Now &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
