"use client";

import React from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

const TOOLS_LIST = [
  {
    slug: "instagram-grid-maker",
    name: "Instagram Grid Maker",
    desc: "Split large images into perfect Instagram grid posts. Upload one image and get individual pieces to create stunning grid effects.",
    platform: "instagram",
    tag: "Grid Splitter"
  },
  {
    slug: "instagram-carousel-splitter",
    name: "Instagram Carousel Splitter",
    desc: "Split panoramic images into seamless Instagram carousel posts. Create swipeable panoramas that boost engagement.",
    platform: "instagram",
    tag: "Carousel Splitter"
  },
  {
    slug: "instagram-handle-checker",
    name: "Instagram Handle Checker",
    desc: "Check if your desired Instagram username is available. Find the perfect handle for your brand, business, or personal account.",
    platform: "instagram",
    tag: "Username Checker"
  },
  {
    slug: "tiktok-username-checker",
    name: "TikTok Username Checker",
    desc: "Check if your desired TikTok username is available. Find the perfect handle for your TikTok content creator or business account.",
    platform: "tiktok",
    tag: "Username Checker"
  },
  {
    slug: "tiktok-caption-generator",
    name: "TikTok Caption Generator",
    desc: "Generate engaging, viral-worthy TikTok captions with AI. Choose your tone and audience for perfectly crafted captions.",
    platform: "tiktok",
    tag: "AI Captions"
  },
  {
    slug: "linkedin-text-formatter",
    name: "LinkedIn Text Formatter",
    desc: "Format LinkedIn posts with bold, italic, underlined text and bullet points. Stand out with professional text formatting.",
    platform: "linkedin",
    tag: "Text Formatter"
  },
  {
    slug: "youtube-title-checker",
    name: "YouTube Title Checker",
    desc: "Check title length, prevent truncation, and see how your title looks in YouTube feeds. Upload thumbnails for complete preview.",
    platform: "youtube",
    tag: "Title Simulator"
  },
  {
    slug: "youtube-tag-generator",
    name: "YouTube Tag Generator",
    desc: "Generate optimized YouTube tags with AI. Get relevant, SEO-friendly tags that boost video discoverability and rankings.",
    platform: "youtube",
    tag: "Tag Generator"
  },
  {
    slug: "timeline-blocker-x",
    name: "Timeline Blocker for X/Twitter",
    desc: "Limits your X timeline to 5 minutes per hour. DMs, notifications, and posting stay open. No accounts, no tracking.",
    platform: "twitter",
    tag: "Focus Extension"
  }
];

export default function ToolsHubPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 text-center w-full">
        <h1 className="text-4xl sm:text-6xl font-black text-center mb-4 text-white">
          Free Social Media <span className="text-wutang-metallic">Tools</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-12 font-bold text-center">
          Professional-grade free social media tools for creators & growth engineers. Automate captions, split carousels, and check handles instantly with zero registration.
        </p>

        {/* 9 Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TOOLS_LIST.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="plush-card p-6 flex flex-col justify-between hover:scale-105 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="plush-badge-wutang text-[10px] font-black">{t.tag}</span>
                  <PlatformColorLogo id={t.platform as Platform} className="h-6 w-6" />
                </div>
                <div className="font-black text-white text-lg mb-2">{t.name}</div>
                <p className="text-slate-300 text-xs font-medium leading-relaxed mb-6">{t.desc}</p>
              </div>
              <span className="text-xs font-bold text-wutang-metallic flex items-center gap-1">
                Try it free &rarr;
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
