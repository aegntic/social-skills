"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { group: "Create", items: [
      { href: "/dashboard/create", label: "New post" },
      { href: "/dashboard/content-studio", label: "Studio" },
      { href: "/dashboard/bulk-tools", label: "Bulk tools" },
    ]},
    { group: "Posts", items: [
      { href: "/dashboard/posts/calendar", label: "Calendar" },
      { href: "/dashboard/posts", label: "All" },
      { href: "/dashboard/posts/scheduled", label: "Scheduled" },
    ]},
    { group: "Analytics & Workspace", items: [
      { href: "/dashboard/analytics", label: "Analytics" },
      { href: "/dashboard/connections", label: "Connections" },
      { href: "/dashboard/teams", label: "Teams" },
    ]},
    { group: "Configuration & Support", items: [
      { href: "/dashboard/settings", label: "Settings" },
      { href: "/dashboard/api-keys", label: "API Keys" },
      { href: "/growth-guide", label: "Growth guide" },
    ]},
  ];

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }}>
      {/* Top Banner Offer */}
      <div className="py-2.5 px-6 flex items-center justify-between text-xs font-bold text-slate-200" style={{ background: "linear-gradient(90deg, #1e2634 0%, #151b24 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <span>Special Offer: 2 Months Free</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-extrabold">23h 57m left</span>
        </div>
        <Link href="/onboarding/plans" className="btn-wutang text-[10px] px-3 py-1 font-black">
          Claim 2 Months Free &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] min-h-[calc(100vh-42px)]">
        {/* Dashboard Left Sidebar */}
        <aside className="p-5 border-r border-slate-800 space-y-6" style={{ background: "#16181f" }}>
          <Link href="/dashboard" className="flex items-center gap-2 mb-4 text-decoration-none">
            <span className="font-black text-wutang-metallic text-base">S/</span>
            <span className="font-extrabold text-white text-base">post bridge</span>
          </Link>

          <Link href="/dashboard/create" className="btn-wutang w-full py-2.5 text-xs font-black text-center block">
            + Create post
          </Link>

          <div className="space-y-6">
            {NAV_ITEMS.map((grp, i) => (
              <div key={i}>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                  {grp.group}
                </div>
                <div className="space-y-1">
                  {grp.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          active
                            ? "bg-amber-400/15 text-amber-300 border border-amber-400/30"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Dashboard Main Area */}
        <main className="p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h1 className="text-2xl font-black text-white">{title}</h1>
              <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white">
                Back to Desk &rarr;
              </Link>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
