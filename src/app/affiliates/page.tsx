"use client";

import React from "react";
import Link from "next/link";

export default function AffiliatesPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(26, 29, 36, 0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-black text-wutang-metallic text-lg">S/</span>
            <span className="font-black text-white text-lg">social<span className="text-wutang-metallic">.skills</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white">Home</Link>
            <Link href="/login" className="btn-wutang px-4 py-2 text-xs font-black">Sign In &rarr;</Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="plush-badge-wutang mb-4">AFFILIATE PROGRAM</div>
        <h1 className="text-4xl sm:text-6xl font-black mb-4">
          Earn <span className="text-wutang-metallic">30% Recurring</span> Commission
        </h1>
        <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10 font-medium">
          Refer creators, agencies, and founders to Social Skills. Earn 30% monthly recurring revenue for every paying customer you bring.
        </p>

        <div className="plush-card p-8 max-w-md mx-auto space-y-6">
          <div className="text-xl font-black text-white">Join Affiliate Portal</div>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
          />
          <button className="btn-wutang w-full py-3.5 font-black text-sm">
            Get Referral Link &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
