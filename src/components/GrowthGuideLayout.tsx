"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { slug: "start-here", title: "Start Here", subtitle: "Overview & timeline" },
  { slug: "account-creation", title: "Step 1: Account Creation", subtitle: "Setting up new accounts properly" },
  { slug: "account-warmup", title: "Step 2: Account Warmup", subtitle: "3-7 day warmup protocol" },
  { slug: "content-market-fit", title: "Step 3: Content Market Fit", subtitle: "Finding your winning format" },
  { slug: "riding-trends", title: "Riding Trends", subtitle: "Leverage trending topics" },
  { slug: "views-to-customers", title: "Views -> Customers", subtitle: "Convert views into revenue" },
  { slug: "scaling-system", title: "Scaling System", subtitle: "Scale with Social Skills" },
];

export function GrowthGuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "rgb(var(--c-ink))", minHeight: "100vh" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgb(var(--c-bg) / 0.92)", borderBottom: "1px solid rgb(var(--c-line) / 0.55)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/growth-guide" className="flex items-center gap-3 text-decoration-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-wutang-metallic" style={{ background: "var(--clay-surface-grad)", border: "1px solid rgb(var(--c-line) / 0.6)" }}>
              S/
            </div>
            <div>
              <span className="font-black text-white text-base">Organic Growth Guide</span>
              <span className="text-xs text-slate-400 block">by social.skills</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
              &larr; Back to Desk
            </Link>
            <Link href="/signup" className="btn-wutang px-4 py-2 text-xs font-black">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* Sidebar Navigation */}
          <aside className="space-y-6">
            <div className="plush-card p-5">
              <div className="text-xs font-extrabold uppercase tracking-widest text-wutang-metallic mb-4">Core Content</div>
              <div className="space-y-1.5">
                {SECTIONS.slice(0, 4).map((sec) => {
                  const href = `/growth-guide/${sec.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={sec.slug}
                      href={href}
                      className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                        active
                          ? "bg-amber-400/15 border border-amber-400/40 text-acc-amber font-bold"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{sec.title}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{sec.subtitle}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="text-xs font-extrabold uppercase tracking-widest text-azure-neon mt-6 mb-4">Maxing Out</div>
              <div className="space-y-1.5">
                {SECTIONS.slice(4).map((sec) => {
                  const href = `/growth-guide/${sec.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={sec.slug}
                      href={href}
                      className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                        active
                          ? "bg-cyan-400/15 border border-cyan-400/40 text-acc-cyan font-bold"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{sec.title}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{sec.subtitle}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="plush-card p-5 text-center">
              <div className="text-sm font-black text-white mb-1">Growth Guide $0 FREE</div>
              <div className="text-xs text-slate-400 mb-4 font-medium">Complete organic growth playbook for TikTok & Instagram.</div>
              <Link href="/signup" className="btn-wutang py-2.5 px-4 text-xs font-black w-full block">
                Start Learning Now
              </Link>
            </div>
          </aside>

          {/* Main Article Body */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
