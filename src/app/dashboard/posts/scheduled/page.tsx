"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function ScheduledPostsPage() {
  return (
    <DashboardShell title="Scheduled Posts">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link href="/dashboard/posts" className="btn-dark px-4 py-2 text-xs font-bold">All Posts</Link>
            <Link href="/dashboard/posts/scheduled" className="btn-wutang px-4 py-2 text-xs font-black">Scheduled</Link>
            <Link href="/dashboard/posts/calendar" className="btn-dark px-4 py-2 text-xs font-bold">Calendar</Link>
          </div>
          <Link href="/dashboard/create" className="btn-wutang px-4 py-2 text-xs font-black">+ Create Post</Link>
        </div>

        <div className="plush-card p-6">
          <div className="text-xs font-extrabold uppercase tracking-wider text-wutang-metallic mb-4">Upcoming Queue (2 Posts Scheduled)</div>
          <div className="space-y-3">
            {[
              { id: "s1", text: "New tool alert: Instagram Carousel Splitter is now live for free!", time: "Tomorrow at 9:00 AM", platforms: ["twitter", "instagram"] },
              { id: "s2", text: "5 viral hooks you can copy today for your SaaS app.", time: "In 2 days at 3:00 PM", platforms: ["linkedin", "tiktok"] }
            ].map((sp) => (
              <div key={sp.id} className="p-4 rounded-xl flex items-center justify-between" style={{ background: "#20242e" }}>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white max-w-md truncate">{sp.text}</div>
                  <div className="text-[10px] text-amber-300 font-semibold">Scheduled for {sp.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {sp.platforms.map((p) => (
                      <PlatformColorLogo key={p} id={p as any} className="h-4 w-4" />
                    ))}
                  </div>
                  <button className="btn-dark text-[10px] px-2.5 py-1 font-bold">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
