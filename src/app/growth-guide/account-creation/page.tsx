"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function AccountCreationPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-wutang-metallic mb-1">Section 2 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Step 1: Account Creation</h1>
          <p className="text-slate-300 text-base font-medium leading-relaxed">
            The first step to getting views on platforms like TikTok and Instagram is to <strong className="text-white">NOT look like a bot</strong>. This is why we will be using brand new accounts and warming them up properly.
          </p>
        </div>

        {/* Video Mockup */}
        <div className="plush-card p-6 text-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2b313d 0%, #171920 100%)", border: "2px solid rgba(255,200,0,0.3)" }}>
            <div className="text-center">
              <div className="h-12 px-6 mx-auto mb-3 rounded-full flex items-center justify-center text-xs font-black text-black btn-wutang">
                WATCH TUTORIAL
              </div>
              <div className="text-sm font-extrabold text-white">Step 1 - Account Creation Tutorial</div>
              <div className="text-xs text-slate-400 mt-1">Watch step 1 video guide (Growth Masterclass)</div>
            </div>
          </div>
        </div>

        {/* Missions */}
        <div className="plush-card p-6 space-y-4">
          <div className="text-base font-black text-white">Today's Mission</div>
          <ul className="space-y-2 text-sm text-slate-300 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-wutang-metallic font-bold">•</span>
              <span>Create a brand new TikTok account, and a brand new Instagram account.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-wutang-metallic font-bold">•</span>
              <span>Use separate email addresses for each account if possible.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-wutang-metallic font-bold">•</span>
              <span>Come up with a bio that turns views into traffic.</span>
            </li>
          </ul>
        </div>

        {/* Bio Examples Grid */}
        <div className="plush-card p-6">
          <div className="text-base font-black text-white mb-4">Good Bio Examples (Click to enlarge)</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["curiosity_quench", "scoutr_app", "habitboard", "post_bridge"].map((name, idx) => (
              <div key={idx} className="p-3 rounded-xl text-center" style={{ background: "#20242e", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="h-10 w-10 mx-auto rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs mb-2 text-white">
                  @{name[0]}
                </div>
                <div className="text-xs font-bold text-white">{name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High Converting</div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="plush-card p-6">
          <div className="text-base font-black text-white mb-3">Step 1 Checklist</div>
          <div className="space-y-2 text-sm font-semibold text-slate-300">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded accent-amber-400" />
              <span>Create ONE TikTok account</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded accent-amber-400" />
              <span>Create ONE Instagram account</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded accent-amber-400" />
              <span>Make a bio that turns views into traffic</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <Link href="/growth-guide/start-here" className="btn-dark px-5 py-2.5 text-xs font-bold">
            &larr; Start Here
          </Link>
          <Link href="/growth-guide/account-warmup" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Next: Step 2 Account Warmup &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
