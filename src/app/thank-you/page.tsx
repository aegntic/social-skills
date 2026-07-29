"use client";

import React from "react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="flex items-center justify-center p-6 relative overflow-hidden">
      <div className="plush-card p-10 max-w-md w-full text-center relative z-10 space-y-6">
        <div className="h-16 w-16 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-3xl font-black">
          ✓
        </div>

        <div>
          <h1 className="text-3xl font-black text-white mb-2">Thank you!</h1>
          <p className="text-xs text-slate-400 font-medium">Your subscription is active.</p>
        </div>

        <Link href="/dashboard" className="btn-wutang w-full py-4 text-sm font-black block">
          Go to Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
