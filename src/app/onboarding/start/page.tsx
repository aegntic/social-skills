"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";

const PERSONAS = [
  { id: "founder", title: "Founder", desc: "Building a startup or SaaS business" },
  { id: "creator", title: "Creator", desc: "Growing a personal brand & audience" },
  { id: "agency", title: "Agency", desc: "Managing multiple client brand accounts" },
  { id: "enterprise", title: "Enterprise", desc: "Large team & high-volume output" },
  { id: "small_business", title: "Small Business", desc: "Running a local or e-commerce shop" },
  { id: "personal", title: "Personal", desc: "Automating personal social presence" }
];

export default function OnboardingStartPage() {
  const [selected, setSelected] = useState("founder");

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <SiteHeader authed={false} />

      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Step 1 of 3 &bull; Persona Setup
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">What Sounds Most Like You?</h1>
          <p className="text-slate-300 text-sm max-w-md mx-auto font-bold leading-relaxed">
            We tailor your desk AI presets and automation rules based on your primary workflow.
          </p>
        </div>

        <div className="plush-card p-6 md:p-8 space-y-6">
          <div className="space-y-3 text-left">
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                  selected === p.id
                    ? "bg-slate-900 border-2 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-[#161920] border border-slate-700/80 text-slate-300 hover:border-slate-500"
                }`}
              >
                <div>
                  <div className="font-extrabold text-sm text-white">{p.title}</div>
                  <div className="text-xs text-slate-400 font-medium">{p.desc}</div>
                </div>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center font-black ${
                  selected === p.id ? "border-cyan-400 bg-cyan-400 text-slate-950 text-xs" : "border-slate-700"
                }`}>
                  {selected === p.id && "✓"}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link href="/onboarding/connect" className="btn-wutang w-full py-4 text-sm font-black text-center block">
              Continue to Account Setup &rarr;
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
