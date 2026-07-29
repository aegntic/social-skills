"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function CalendarPage() {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <DashboardShell title="Content Calendar">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link href="/dashboard/posts" className="btn-dark px-4 py-2 text-xs font-bold">All Posts</Link>
            <Link href="/dashboard/posts/scheduled" className="btn-dark px-4 py-2 text-xs font-bold">Scheduled</Link>
            <Link href="/dashboard/posts/calendar" className="btn-wutang px-4 py-2 text-xs font-black">Calendar</Link>
          </div>
          <div className="text-sm font-extrabold text-white">July 2026</div>
        </div>

        {/* Calendar Grid */}
        <div className="plush-card p-6">
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-black text-slate-400">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const hasPost = day === 15 || day === 22 || day === 28;
              return (
                <div
                  key={day}
                  className={`min-h-[70px] p-2 rounded-xl border flex flex-col justify-between transition-colors ${
                    hasPost
                      ? "bg-amber-400/10 border-amber-400/40 text-amber-300 font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="text-xs font-extrabold">{day}</span>
                  {hasPost && (
                    <div className="text-[9px] bg-amber-400 text-black font-black px-1.5 py-0.5 rounded truncate">
                      2 posts
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
