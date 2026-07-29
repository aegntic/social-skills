"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";

export default function OnboardingPlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <SiteHeader authed={false} />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Step 3 of 3 &bull; Select Plan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Choose Your Plan</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold leading-relaxed">
            Try free for 7 days &bull; Cancel anytime with 1-click
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-700 mt-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === "monthly" ? "btn-wutang" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === "yearly" ? "btn-wutang" : "text-slate-400 hover:text-white"
              }`}
            >
              Yearly <span className="text-[10px] text-azure-neon font-extrabold ml-1">(1 month free)</span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Creator */}
          <div className="plush-card p-6 border-2 border-cyan-400/40 relative flex flex-col justify-between">
            <div>
              <span className="plush-badge-azure text-[10px] uppercase font-black mb-3 inline-block">Most Popular</span>
              <div className="text-xl font-black text-white mb-1">Creator</div>
              <div className="text-xs text-slate-400 mb-4">Best for solo creators & founders</div>
              <div className="text-4xl font-black text-white mb-6">
                $29 <span className="text-xs font-semibold text-slate-400">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-300 mb-8">
                <li>✓ 15 connected social accounts</li>
                <li>✓ Multiple accounts per platform</li>
                <li>✓ Unlimited posts & scheduling</li>
                <li>✓ Carousel posts</li>
                <li>✓ Bulk video scheduling</li>
                <li>✓ Content studio access</li>
              </ul>
            </div>
            <Link href="/thank-you" className="btn-wutang w-full py-3.5 text-xs font-black text-center block">
              Start 7-Day Free Trial &rarr;
            </Link>
          </div>

          {/* Growth */}
          <div className="plush-card p-6 border-2 border-amber-400/40 relative flex flex-col justify-between">
            <div>
              <div className="text-xl font-black text-white mb-1">Growth</div>
              <div className="text-xs text-slate-400 mb-4">Best for growing teams & agencies</div>
              <div className="text-4xl font-black text-wutang-metallic mb-6">
                $49 <span className="text-xs font-semibold text-slate-400">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-300 mb-8">
                <li>✓ 50 connected social accounts</li>
                <li>✓ Unlimited posts & scheduling</li>
                <li>✓ API credit add-ons included</li>
                <li>✓ Deep analytics dashboard</li>
                <li>✓ Viral growth consulting</li>
                <li>✓ Invite team members</li>
              </ul>
            </div>
            <Link href="/thank-you" className="btn-wutang w-full py-3.5 text-xs font-black text-center block">
              Start 7-Day Free Trial &rarr;
            </Link>
          </div>

          {/* Pro */}
          <div className="plush-card p-6 border-2 border-cyan-400/40 relative flex flex-col justify-between">
            <div>
              <span className="plush-badge-azure text-[10px] uppercase font-black mb-3 inline-block">Best Deal</span>
              <div className="text-xl font-black text-white mb-1">Pro</div>
              <div className="text-xs text-slate-400 mb-4">Best for scaling brands & AI agents</div>
              <div className="text-4xl font-black text-azure-neon mb-6">
                $99 <span className="text-xs font-semibold text-slate-400">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-300 mb-8">
                <li>✓ Unlimited connected accounts</li>
                <li>✓ Priority human & agent support</li>
                <li>✓ API add-on & Claude MCP native</li>
                <li>✓ OpenClaw agent execution</li>
                <li>✓ All Growth features included</li>
              </ul>
            </div>
            <Link href="/thank-you" className="btn-wutang w-full py-3.5 text-xs font-black text-center block">
              Start 7-Day Free Trial &rarr;
            </Link>
          </div>
        </div>

        <div className="flex justify-start">
          <Link href="/onboarding/connect" className="btn-dark px-6 py-3 text-xs font-bold">
            &larr; Back to Accounts
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
