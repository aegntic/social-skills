"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function AllPostsPage() {
  return (
    <DashboardShell title="All Posts">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link href="/dashboard/posts" className="btn-wutang px-4 py-2 text-xs font-black">All Posts</Link>
            <Link href="/dashboard/posts/scheduled" className="btn-dark px-4 py-2 text-xs font-bold">Scheduled</Link>
            <Link href="/dashboard/posts/calendar" className="btn-dark px-4 py-2 text-xs font-bold">Calendar</Link>
          </div>
          <Link href="/dashboard/create" className="btn-wutang px-4 py-2 text-xs font-black">+ Create Post</Link>
        </div>

        <div className="plush-card divide-y divide-slate-800">
          {[
            { id: "1", text: "Excited to launch our new organic growth guide! Check out how we hit 1M+ views.", date: "Today at 2:30 PM", platforms: ["twitter", "linkedin"], status: "Posted" },
            { id: "2", text: "3 secrets to scaling short form video content without spending on ads.", date: "Yesterday at 10:00 AM", platforms: ["instagram", "tiktok"], status: "Posted" },
            { id: "3", text: "How we connect Claude MCP to automatically post across 10 platforms.", date: "Jul 26 at 4:15 PM", platforms: ["twitter", "youtube"], status: "Posted" }
          ].map((post) => (
            <div key={post.id} className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-bold text-white max-w-xl truncate">{post.text}</div>
                <div className="text-[10px] text-slate-400 font-semibold">{post.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  {post.platforms.map((p) => (
                    <PlatformColorLogo key={p} id={p as any} className="h-4 w-4" />
                  ))}
                </div>
                <span className="plush-badge-azure text-[9px] font-black">{post.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
