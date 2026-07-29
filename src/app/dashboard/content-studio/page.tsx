"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function ContentStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [videoText, setVideoText] = useState("");

  return (
    <DashboardShell title="Content Studio">
      <div className="space-y-8">
        {!selectedTemplate ? (
          /* Template Hub View */
          <div className="space-y-6">
            <div className="plush-card p-6 border-2 border-cyan-400/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="plush-badge-wutang text-[10px] uppercase font-black mb-2 inline-block">AI-Powered</span>
                <h2 className="text-2xl font-black text-white mb-1">AI UGC Video Creator</h2>
                <p className="text-xs text-slate-300 font-medium">Create authentic UGC-style videos in seconds using AI templates. Perfect for product demos & testimonials.</p>
              </div>
              <button onClick={() => setSelectedTemplate("ai_ugc")} className="btn-wutang px-6 py-3 text-xs font-black flex-shrink-0">
                Try AI UGC Creator &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: "grid_2x2", title: "2x2 Grid Video", desc: "Create viral videos with this 4 image grid format.", views: "20M+ views", tag: "Trending" },
                { id: "single_fade", title: "Single Fade-in Video", desc: "Simple format with billions of views - use your imagination.", views: "500M+ views", tag: "Trending" },
                { id: "ai_ugc", title: "AI UGC Creator", desc: "Authentic UGC-style videos with AI avatars.", views: "1B+ views", tag: "Trending" }
              ].map((t) => (
                <div key={t.id} className="plush-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="plush-badge-azure text-[10px] uppercase font-extrabold">{t.tag}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{t.views}</span>
                    </div>
                    <div className="text-lg font-black text-white mb-2">{t.title}</div>
                    <p className="text-xs text-slate-400 font-medium mb-6">{t.desc}</p>
                  </div>
                  <button onClick={() => setSelectedTemplate(t.id)} className="btn-wutang w-full py-2.5 text-xs font-black">
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Video Editor View */
          <div className="space-y-6">
            <button onClick={() => setSelectedTemplate(null)} className="btn-dark px-4 py-2 text-xs font-bold mb-4">
              &larr; Back to templates
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
              {/* Controls */}
              <div className="space-y-6">
                <div className="plush-card p-6 space-y-4">
                  <div className="text-xs font-extrabold text-white">Add Video Text</div>
                  <textarea
                    rows={4}
                    placeholder="Enter the text you want to show in your video..."
                    value={videoText}
                    onChange={(e) => setVideoText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:outline-none focus:border-amber-400 resize-none"
                  />
                  <div className="flex justify-between gap-2">
                    <button className="btn-dark text-[10px] py-1.5 px-3 font-bold flex-1">Top</button>
                    <button className="btn-wutang text-[10px] py-1.5 px-3 font-bold flex-1">Middle</button>
                    <button className="btn-dark text-[10px] py-1.5 px-3 font-bold flex-1">Bottom</button>
                  </div>
                </div>

                <div className="plush-card p-6 space-y-3">
                  <div className="text-xs font-extrabold text-white">Upload Music</div>
                  <div className="p-6 rounded-xl border-2 border-dashed border-slate-700 text-center cursor-pointer hover:border-amber-400">
                    <div className="text-xs font-bold text-white">Click or drag audio file</div>
                    <div className="text-[10px] text-slate-400 mt-1">MP3, WAV accepted</div>
                  </div>
                </div>
              </div>

              {/* Video Preview Canvas */}
              <div className="plush-card p-6 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #20242e 0%, #12141a 100%)" }}>
                <div className="w-[240px] aspect-[9/16] rounded-2xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl flex items-center justify-center p-4 text-center relative">
                  <span className="text-sm font-black text-white">{videoText || "Select a template & enter text to preview"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
