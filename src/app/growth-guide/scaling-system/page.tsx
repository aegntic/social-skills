"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function ScalingSystemPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">Section 7 of 7</div>
          <h1 className="text-3xl font-black text-white mb-3">Scaling System with Social Skills</h1>
          <p className="text-slate-300 text-base font-medium leading-relaxed">
            Once you have a winning format that gets views on one account, it&apos;s time to scale! Social Skills lets you publish that winning video across 10 platforms and multiple accounts with 1 click.
          </p>
        </div>

        <div className="plush-card p-8 text-center border-2 border-amber-400/40">
          <h2 className="text-2xl font-black text-white mb-2">Ready to multiply your success?</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 font-medium">
            Connect all 10 social networks to your desk and schedule posts across all accounts in 30 seconds.
          </p>
          <Link href="/signup" className="btn-wutang py-3.5 px-8 text-base font-black inline-block">
            Start Free Trial Now &rarr;
          </Link>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <Link href="/growth-guide/views-to-customers" className="btn-dark px-5 py-2.5 text-xs font-bold">
            &larr; Views to Customers
          </Link>
          <Link href="/signup" className="btn-wutang px-6 py-2.5 text-xs font-black">
            Get Started Free &rarr;
          </Link>
        </div>
      </div>
    </GrowthGuideLayout>
  );
}
