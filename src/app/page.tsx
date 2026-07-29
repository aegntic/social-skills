"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { ComposeDeskMockup } from "@/components/ComposeDeskMockup";
import { InteractiveBroadcastEngine } from "@/components/InteractiveBroadcastEngine";

type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "threads"
  | "bluesky"
  | "pinterest"
  | "facebook"
  | "google";

function PlatformColorLogo({ id, className = "h-5 w-5" }: { id: Platform; className?: string }) {
  switch (id) {
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#ffffff" }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#e1306c" }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#00f2fe" }}>
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.85.12V9.35a6.33 6.33 0 00-1-.08 6.34 6.34 0 106.34 6.34V9.28a8.16 8.16 0 004.92 1.62V7.45a4.79 4.79 0 01-1-.76z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#ff0000" }}>
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#0a66c2" }}>
          <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "threads":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#ffffff" }}>
          <path d="M12.186 24.004c-3.29 0-6.04-.94-8.006-2.74-1.88-1.72-2.88-4.14-2.88-7.01 0-2.88.98-5.32 2.84-7.06 1.94-1.82 4.67-2.78 7.92-2.78 3.32 0 6.07.96 8.04 2.79 1.86 1.73 2.82 4.14 2.82 7.02 0 2.45-.71 4.54-2.06 6.07-1.39 1.58-3.37 2.44-5.73 2.44-2.22 0-3.95-.77-4.88-2.18-.73-1.11-.93-2.52-.56-3.96.44-1.73 1.72-3.13 3.52-3.83.6-.23 1.25-.36 1.92-.38.25 0 .5.01.75.03v-1.17c0-1.25-.35-2.22-1.04-2.89-.7-.67-1.71-1.01-3.01-1.01-1.22 0-2.23.3-3.01.9-.78.6-1.25 1.48-1.4 2.62l-2.75-.46c.32-2.07 1.27-3.71 2.83-4.86C9.17 3.4 11.23 2.8 13.7 2.8c2.18 0 3.99.58 5.37 1.74 1.38 1.15 2.08 2.76 2.08 4.79v6.52c0 2.21.6 3.86 1.81 4.9l-2.17 1.77c-1.35-1.26-2.09-2.9-2.23-4.91-1.18 1.44-2.85 2.26-4.91 2.26-1.57 0-2.93-.5-3.94-1.45-.99-.94-1.47-2.23-1.36-3.64.14-1.79 1.11-3.29 2.72-4.22 1.24-.72 2.77-1.06 4.43-1.01v-.15c0-.62-.16-1.08-.49-1.37-.32-.29-.81-.44-1.47-.44-.65 0-1.14.14-1.46.43-.32.28-.5.71-.53 1.28l-2.75-.24c.09-1.31.59-2.33 1.49-3.05.9-.72 2.1-1.09 3.57-1.09 1.92 0 3.39.46 4.37 1.37.97.91 1.46 2.22 1.46 3.91v5.18c0 1.22.25 2.16.74 2.83.49.67 1.21 1.01 2.16 1.01 1.34 0 2.44-.54 3.28-1.61.84-1.08 1.26-2.55 1.26-4.39 0-2.22-.72-4.04-2.15-5.42C17.7 5.09 15.34 4.3 12.44 4.3c-2.79 0-5.11.78-6.9 2.33-1.79 1.55-2.69 3.66-2.69 6.27 0 2.51.84 4.58 2.5 6.16 1.66 1.58 4.01 2.39 6.99 2.39 2.05 0 3.82-.44 5.27-1.3l1.19 2.35c-1.83 1.08-4.01 1.63-6.54 1.63z" />
        </svg>
      );
    case "bluesky":
      return (
        <svg className={className} viewBox="0 0 568 501" fill="currentColor" style={{ color: "#1185fe" }}>
          <path d="M123.121 33.564C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.309C491.877-2.688 568-19.117 568 57.348c0 15.312-8.75 128.463-13.889 146.822-17.848 63.766-82.955 80.083-140.852 70.219 101.25 17.234 127.18 85.64 71.392 142.92-106.012 108.847-172.934-27.309-196.216-75.76-4.225-8.799-8.435-17.599-12.435-26.241-4 8.642-8.21 17.442-12.435 26.241-23.282 48.451-90.204 184.607-196.216 75.76-55.788-57.28-29.858-125.686 71.392-142.92C74.844 284.253 9.737 267.936-8.111 204.17 -13.25 185.811-22 72.66-22 57.348c0-76.465 76.123-60.036 123.121-23.784z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#e60023" }}>
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#1877f2" }}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "google":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" style={{ color: "#ea4335" }}>
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      );
  }
}

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Site Header */}
      <SiteHeader />

      {/* ─── 1. SUPPORTED DESTINIES MARQUEE BAR ─── */}
      <div className="py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }} className="flex items-center justify-between gap-4 flex-wrap text-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
            SUPPORTED DESTINIES:
          </span>
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-extrabold">
            {[
              { id: "twitter", name: "Twitter / X" },
              { id: "instagram", name: "Instagram" },
              { id: "tiktok", name: "TikTok" },
              { id: "youtube", name: "YouTube" },
              { id: "linkedin", name: "LinkedIn" },
              { id: "threads", name: "Threads" },
              { id: "bluesky", name: "Bluesky" },
              { id: "pinterest", name: "Pinterest" },
              { id: "facebook", name: "Facebook" },
              { id: "google", name: "Google Business" },
            ].map((platform) => (
              <span
                key={platform.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-slate-100 bg-slate-900 border border-slate-700 shadow-sm"
              >
                <PlatformColorLogo id={platform.id as Platform} className="h-3.5 w-3.5" />
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 2. HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }} className="text-center relative z-10">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-cyan-500/15 border border-cyan-500/40 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-black tracking-wide uppercase text-azure-neon">10 platforms • free to start • 3D Plush Engine</span>
          </div>

          {/* Main Headline — Consistent Wu-Tang Yellow Accent */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-white">
            Post to all your social<br />
            accounts from <span className="text-wutang-metallic">one desk</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-extrabold text-center">
            Enterprise-grade multi-platform auto-poster & AI cross-publishing engine. Built for solo creators, growth teams & agencies.
          </p>

          {/* Main CTA Group — Wu-Tang Yellow (#ffc800) & Azure Cyan (#00f0ff) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="/signup" className="btn-wutang px-8 py-4 text-base sm:text-lg font-black w-full sm:w-auto">
              Try it for free &rarr;
            </a>
            <a href="/login" className="btn-azure px-7 py-4 text-base sm:text-lg font-extrabold w-full sm:w-auto">
              Log in to Desk
            </a>
          </div>

          {/* Trust Agent Bar */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-10 text-xs sm:text-sm font-extrabold text-slate-300">
            <span className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 bg-slate-900 border border-slate-700 text-white">
              Connect any AI agent
            </span>
            <span className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 bg-sky-950/80 border border-sky-500/40 text-cyan-300 font-black">
              Use from Claude, ChatGPT via MCP
            </span>
            <span className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 font-black">
              Connect your OpenClaw agent
            </span>
          </div>

          {/* Customer Social Proof Stack */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="flex -space-x-2 overflow-hidden">
              {["J", "A", "M", "K", "S"].map((initial, i) => (
                <div key={i} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white bg-slate-900 border-2 border-slate-700 shadow-sm">
                  {initial}
                </div>
              ))}
            </div>
            <span className="text-sm font-extrabold text-slate-300">
              Used by <span className="text-wutang-metallic font-black">1,669</span> happy creators
            </span>
          </div>

          {/* Interactive 3D Showcase Component */}
          <div className="max-w-4xl mx-auto text-left">
            <ComposeDeskMockup />
          </div>
        </div>
      </section>

      {/* ─── 3. FEATURE 1: BROADCAST ENGINE ─── */}
      <section id="features" className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="plush-badge-wutang mb-4">
                MULTI-PLATFORM BROADCAST ENGINE
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-left leading-tight mb-6">
                Auto-post to 10 networks <span className="text-azure-metallic">in 30 seconds</span>
              </h2>
              <p className="text-slate-900 text-base sm:text-lg leading-relaxed mb-6 font-bold">
                Stop wasting 45 minutes every day manually copying captions across 10 browser tabs. Social Skills automatically adapts your media, strips invalid links for X, formats Instagram Reels & TikTok videos, and broadcasts simultaneously with zero tab switching.
              </p>
              <div className="flex items-center gap-4">
                <a href="/signup" className="btn-wutang px-6 py-3 text-sm font-extrabold">
                  Start posting &rarr;
                </a>
                <a href="#platforms" className="btn-dark px-5 py-3 text-sm font-bold">
                  View platforms
                </a>
              </div>
            </div>

            {/* Wordless 3D Node Animation */}
            <InteractiveBroadcastEngine />
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURE 2: AI SCHEDULER ─── */}
      <section className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 3D Plush Schedule Mockup */}
            <div className="order-2 md:order-1 plush-card p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-azure-neon">QUEUE CALENDAR</div>
                  <div className="text-lg font-black text-white">This Week's Schedule</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  Auto-Best Time Active
                </span>
              </div>

              {/* Timeline Cards */}
              <div className="space-y-3">
                {[
                  { time: "Today • 2:30 PM", title: "New AI feature announcement thread", platforms: ["twitter", "linkedin", "threads"], status: "Ready" },
                  { time: "Tomorrow • 9:00 AM", title: "Productivity hacks video demo", platforms: ["tiktok", "instagram", "youtube"], status: "Queued" },
                  { time: "Thu • 5:15 PM", title: "Weekly founder update letter", platforms: ["twitter", "linkedin", "facebook"], status: "Scheduled" }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl p-4 flex items-center justify-between bg-slate-900 border border-slate-700">
                    <div>
                      <div className="text-xs font-bold text-azure-neon mb-1">{item.time}</div>
                      <div className="text-sm font-bold text-white mb-2">{item.title}</div>
                      <div className="flex items-center gap-2">
                        {item.platforms.map((p) => (
                          <PlatformColorLogo key={p} id={p as Platform} className="h-4 w-4" />
                        ))}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <div className="plush-badge-azure mb-4">
                AI AUTOMATED SCHEDULER
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-left leading-tight mb-6">
                Automate your queue <span className="text-wutang-metallic">without limits</span>
              </h2>
              <p className="text-slate-900 text-base sm:text-lg leading-relaxed mb-6 font-bold">
                Queue up weeks of content with AI peak-time scheduling. Never miss a high-traffic engagement window or lose impressions to manual posting fatigue. Set your queue once and let the engine distribute reliably.
              </p>
              <div className="flex items-center gap-4">
                <a href="/signup" className="btn-azure px-6 py-3 text-sm font-extrabold">
                  Start scheduling &rarr;
                </a>
                <a href="#demo" className="btn-dark px-5 py-3 text-sm font-bold">
                  View demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. FEATURE 3: CONTENT MANAGEMENT & ANALYTICS ─── */}
      <section className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="plush-badge-wutang mb-4">
                CONTENT MANAGEMENT
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-left leading-tight mb-6">
                Manage content <span className="text-azure-metallic">efficiently</span>
              </h2>
              <p className="text-slate-900 text-base sm:text-lg leading-relaxed mb-6 font-bold">
                View all your scheduled and published posts in one place. Track what's performing, edit upcoming posts, and stay on top of your content strategy with real-time feedback.
              </p>
              <div className="flex items-center gap-4">
                <a href="/signup" className="btn-wutang px-6 py-3 text-sm font-extrabold">
                  Get started &rarr;
                </a>
                <a href="#pricing" className="btn-dark px-5 py-3 text-sm font-bold">
                  See pricing
                </a>
              </div>
            </div>

            {/* 3D Plush Management Mockup */}
            <div className="plush-card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-black text-white">Recent Post Performance</div>
                <div className="text-xs font-bold text-azure-neon">+148% Reach</div>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Building a SaaS in public week 12", impressions: "48.2k", engagements: "3.4k", score: "9.8" },
                  { title: "Top 5 tools for solo developers", impressions: "112.9k", engagements: "9.1k", score: "9.9" },
                  { title: "Why traditional scheduling tools suck", impressions: "34.1k", engagements: "2.1k", score: "9.4" }
                ].map((post, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-700">
                    <div className="text-sm font-extrabold text-white mb-3">{post.title}</div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-800">
                        <div className="text-slate-400 text-[10px]">Impressions</div>
                        <div className="font-extrabold text-white">{post.impressions}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-800">
                        <div className="text-slate-400 text-[10px]">Engagements</div>
                        <div className="font-extrabold text-white">{post.engagements}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-800">
                        <div className="text-slate-400 text-[10px]">Viral Score</div>
                        <div className="font-extrabold text-wutang-metallic">{post.score}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. SUPPORTED PLATFORMS GRID ─── */}
      <section id="platforms" className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }} className="text-center">
          <div className="plush-badge-azure mb-4">SUPPORTED NETWORKS</div>
          <h2 className="text-4xl sm:text-6xl font-black text-center mb-4">
            Publish anywhere your <span className="text-wutang-metallic">audience lives</span>
          </h2>
          <p className="text-slate-900 text-base sm:text-lg max-w-xl mx-auto mb-12 font-extrabold">
            Native integrations for all major platforms with platform-specific video formatting and caption adaptations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { id: "twitter", name: "Twitter / X", desc: "Auto-thread & media" },
              { id: "instagram", name: "Instagram", desc: "Reels & carousels" },
              { id: "tiktok", name: "TikTok", desc: "Shorts & auto-hashtags" },
              { id: "youtube", name: "YouTube", desc: "Shorts & long-form" },
              { id: "linkedin", name: "LinkedIn", desc: "PDFs & article posts" },
              { id: "threads", name: "Threads", desc: "Text & image loops" },
              { id: "bluesky", name: "Bluesky", desc: "Decentralized posts" },
              { id: "pinterest", name: "Pinterest", desc: "Pin boards & links" },
              { id: "facebook", name: "Facebook", desc: "Pages & group posts" },
              { id: "google", name: "Google", desc: "Local updates" },
            ].map((p) => (
              <div key={p.id} className="plush-card p-5 text-center flex flex-col items-center justify-center">
                <PlatformColorLogo id={p.id as Platform} className="h-8 w-8 mb-3" />
                <div className="font-extrabold text-white text-sm mb-1">{p.name}</div>
                <div className="text-[10px] text-slate-400 font-medium">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. API & MCP DEVELOPER SECTION ─── */}
      <section id="api" className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="plush-badge-azure mb-4">DEVELOPER & AI AGENT FIRST</div>
              <h2 className="text-4xl sm:text-6xl font-black text-left leading-tight mb-6">
                Trigger posts from <span className="text-azure-metallic">Claude & ChatGPT</span>
              </h2>
              <p className="text-slate-900 text-base sm:text-lg leading-relaxed mb-6 font-bold">
                Social Skills features a native Model Context Protocol (MCP) server and REST API. Connect your AI agents to schedule, publish, and query social analytics directly from your LLM workflows.
              </p>
              <div className="flex items-center gap-4">
                <a href="/signup" className="btn-azure px-6 py-3 text-sm font-extrabold">
                  Get API Key &rarr;
                </a>
                <a href="#mcp" className="btn-dark px-5 py-3 text-sm font-bold">
                  View Docs
                </a>
              </div>
            </div>

            {/* Code Snippet Plush Card */}
            <div className="plush-card p-6 font-mono text-xs text-left bg-slate-950 border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400" />
                </div>
                <span className="text-slate-500 text-[10px]">mcp-config.json</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed">
{`{
  "mcpServers": {
    "socialskills": {
      "command": "npx",
      "args": ["-y", "@socialskills/mcp-server"],
      "env": {
        "SOCIALSKILLS_API_KEY": "sk_live_..."
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FREE GROWTH GUIDE SECTION ─── */}
      <section className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div className="plush-card p-8 sm:p-12 text-center border-2 border-yellow-400/40 max-w-3xl mx-auto">
            <div className="plush-badge-wutang mb-4">FREE RESOURCE</div>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              The 30-Day Social Growth Playbook
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 font-medium">
              Learn the exact account warmup sequence, content market fit framework, and algorithm acceleration rules used by top 1% creators.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/growth-guide" className="btn-wutang px-8 py-4 text-base font-black">
                Read Growth Guide ($0) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. PRICING SECTION ─── */}
      <section id="pricing" className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }} className="text-center">
          <div className="plush-badge-wutang mb-4">SIMPLE PRICING</div>
          <h2 className="text-4xl sm:text-6xl font-black text-center mb-4">
            Simple, transparent <span className="text-wutang-metallic">pricing</span>
          </h2>
          <p className="text-slate-900 text-base sm:text-lg max-w-lg mx-auto mb-8 font-extrabold">
            No per-channel add-on fees. Start free, upgrade when you scale.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-xs font-extrabold ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-600"}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-14 h-8 rounded-full bg-slate-900 p-1 relative transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-yellow-400 transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-extrabold ${billingCycle === "yearly" ? "text-slate-900" : "text-slate-600"}`}>
              Yearly <span className="text-azure-neon font-black">(Save 20%)</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Starter */}
            <div className="plush-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Starter</div>
                <div className="text-4xl font-black text-white mb-4">$0</div>
                <p className="text-xs text-slate-300 mb-6 font-medium">Perfect for testing multi-platform cross-posting.</p>
                <ul className="space-y-3 text-xs text-slate-200 font-bold mb-8">
                  <li>• Up to 3 connected accounts</li>
                  <li>• Manual cross-posting</li>
                  <li>• Standard text & image formatting</li>
                  <li>• Basic post history</li>
                </ul>
              </div>
              <a href="/signup" className="btn-dark py-3.5 w-full text-center text-sm font-bold">
                Get Started Free
              </a>
            </div>

            {/* Creator */}
            <div className="plush-card p-8 border-2 border-yellow-400/60 flex flex-col justify-between relative transform md:-translate-y-2">
              <span className="absolute -top-3 right-6 plush-badge-wutang text-[10px] font-black">MOST POPULAR</span>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-azure-neon mb-2">Creator</div>
                <div className="text-4xl font-black text-white mb-4">
                  {billingCycle === "monthly" ? "$19" : "$15"}<span className="text-sm font-medium text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-300 mb-6 font-medium">Built for active solo creators and brand builders.</p>
                <ul className="space-y-3 text-xs text-slate-200 font-bold mb-8">
                  <li>• Unlimited connected accounts</li>
                  <li>• AI peak-time scheduling</li>
                  <li>• Video Reels & Shorts formatting</li>
                  <li>• MCP & API access</li>
                </ul>
              </div>
              <a href="/signup" className="btn-wutang py-3.5 w-full text-center text-sm font-black">
                Start 7-Day Free Trial &rarr;
              </a>
            </div>

            {/* Agency */}
            <div className="plush-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-purple-400 mb-2">Agency</div>
                <div className="text-4xl font-black text-white mb-4">
                  {billingCycle === "monthly" ? "$49" : "$39"}<span className="text-sm font-medium text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-300 mb-6 font-medium">For growth agencies & multi-brand operations.</p>
                <ul className="space-y-3 text-xs text-slate-200 font-bold mb-8">
                  <li>• Everything in Creator</li>
                  <li>• Up to 10 team seats</li>
                  <li>• Custom client workspaces</li>
                  <li>• Dedicated priority queue</li>
                </ul>
              </div>
              <a href="/signup" className="btn-azure py-3.5 w-full text-center text-sm font-extrabold">
                Start Agency Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ SECTION ─── */}
      <section id="faq" className="py-20 border-t border-slate-300/60">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div className="plush-badge-azure mb-4 text-center block w-fit mx-auto">FREQUENTLY ASKED</div>
          <h2 className="text-4xl sm:text-6xl font-black text-center mb-12">
            Frequently asked <span className="text-azure-metallic">questions</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Is Social Skills free to start?",
                a: "Yes! Our Starter plan is 100% free with no credit card required. You can connect accounts and publish immediately."
              },
              {
                q: "How does the AI cross-publishing engine work?",
                a: "You compose your post once in the central desk. The engine automatically transforms captions, hashtags, image aspect ratios, and video lengths for each specific target network before broadcasting."
              },
              {
                q: "Can I connect AI agents via MCP or API?",
                a: "Absolutely. We provide a full MCP server for Claude and ChatGPT, plus a REST API so your autonomous agents can trigger posts programmatically."
              },
              {
                q: "Are there any hidden per-account channel fees?",
                a: "Never. Unlike legacy tools that charge extra for every single social account, Social Skills includes multi-platform posting out of the box."
              }
            ].map((faq, i) => (
              <div key={i} className="plush-card p-6 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between font-extrabold text-lg text-white">
                  <span>{faq.q}</span>
                  <span className="text-azure-neon text-xl">{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && (
                  <p className="mt-4 text-sm text-slate-300 font-medium leading-relaxed border-t border-slate-800 pt-4">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. BOTTOM CTA SECTION ("Ready to get started") ─── */}
      {/* Clean Sapphire Obsidian Container (#0f172a) — ZERO cheap/murky background gradients */}
      <section className="py-24 border-t border-slate-300/60">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="plush-card p-10 sm:p-16 text-center border-2 border-slate-700 bg-slate-900 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="plush-badge-wutang mb-4">GET STARTED TODAY</div>
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
                Ready to master <span className="text-wutang-metallic">social publishing?</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-10 font-medium leading-relaxed">
                Join thousands of creators auto-publishing across 10 platforms in 30 seconds. Setup takes under 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/signup" className="btn-wutang px-9 py-4 text-base sm:text-lg font-black w-full sm:w-auto">
                  Try it for free &rarr;
                </a>
                <a href="#api" className="btn-azure px-8 py-4 text-base sm:text-lg font-extrabold w-full sm:w-auto">
                  View documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
