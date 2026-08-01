"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/clay/ThemeToggle";
import { BrandMark } from "@/components/BrandMark";
import { AegnticAttribution } from "@/components/AegnticAttribution";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/tools", label: "Free Tools" },
  { href: "/growth-guide", label: "Growth Guide" },
  { href: "/journey", label: "Journey" },
  { href: "/compare", label: "Compare" },
];

export function SiteHeader({ authed }: { authed?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: "rgb(var(--c-bg) / 0.92)",
          borderBottom: "1px solid rgb(var(--c-line) / 0.5)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-decoration-none">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{
                background: "var(--clay-surface-grad)",
                boxShadow: "var(--clay-raised)",
              }}
            >
              <BrandMark className="h-7 text-wutang-metallic" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">
                social<span className="text-wutang-metallic">.skills</span>
              </span>
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest"
                style={{
                  background: "rgba(0, 240, 255, 0.15)",
                  color: "var(--azure-neon)",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                }}
              >
                ninja
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            {authed ? (
              <Link href="/dashboard" className="btn-wutang px-5 py-2.5 text-xs font-black">
                Open desk &rarr;
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white transition-colors px-3 py-2">
                  Log in
                </Link>
                <Link href="/signup" className="btn-wutang px-5 py-2.5 text-xs font-black">
                  Try for free &rarr;
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 text-white font-bold text-xs"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
            <span>{open ? "Close" : "Menu"}</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 pt-20 px-6" style={{ background: "rgb(var(--c-bg))" }}>
          <div className="py-6 flex flex-col gap-5 text-base font-bold text-white">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="py-1 border-b border-slate-800">
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login" className="btn-dark py-3 text-xs font-bold text-center">
                Log in
              </Link>
              <Link href="/signup" className="btn-wutang py-3.5 text-xs font-black text-center">
                Try for free &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 text-slate-300 py-16 px-6 text-xs font-medium" style={{ background: "rgb(var(--c-fill-2))" }}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tagline */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white font-black text-lg">social<span className="text-wutang-metallic">.skills</span></span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest"
              style={{
                background: "rgba(0, 240, 255, 0.15)",
                color: "var(--azure-neon)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
              }}
            >
              ninja
            </span>
          </div>
          <p className="text-slate-300 text-sm font-bold leading-relaxed">
            Post content to multiple social media platforms at the same time, all-in one place. Cross posting made easy.
          </p>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-t border-slate-800 pt-10">
          {/* LINKS */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-wutang-metallic mb-2">LINKS</div>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><Link href="/whyareyoulikethis" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/growth-guide" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/affiliates" className="hover:text-white transition-colors">Affiliates</Link></li>
              <li><Link href="/onboarding/plans" className="hover:text-white transition-colors">Billing</Link></li>
              <li><Link href="/dashboard/api-keys" className="hover:text-white transition-colors">AI Agents</Link></li>
              <li><Link href="/dashboard/api-keys" className="hover:text-white transition-colors">MCP</Link></li>
              <li><Link href="/dashboard/api-keys" className="hover:text-white transition-colors">OpenClaw</Link></li>
              <li><Link href="/dashboard/api-keys" className="hover:text-white transition-colors">Agent Skill</Link></li>
            </ul>
          </div>

          {/* PLATFORMS */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-azure-neon mb-2">PLATFORMS</div>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Twitter/X scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Instagram scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">LinkedIn scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Facebook scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">TikTok scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">YouTube scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Bluesky scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Threads scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Pinterest scheduler</Link></li>
              <li><Link href="/#platforms" className="hover:text-white transition-colors">Google Business scheduler</Link></li>
            </ul>
          </div>

          {/* FREE TOOLS */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-acc-emerald mb-2">FREE TOOLS</div>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><Link href="/growth-guide" className="hover:text-white transition-colors">Growth Guide</Link></li>
              <li><Link href="/tools/instagram-grid-maker" className="hover:text-white transition-colors">Instagram Grid Maker</Link></li>
              <li><Link href="/tools/instagram-carousel-splitter" className="hover:text-white transition-colors">Instagram Carousel Splitter</Link></li>
              <li><Link href="/tools/instagram-handle-checker" className="hover:text-white transition-colors">Instagram Handle Checker</Link></li>
              <li><Link href="/tools/tiktok-username-checker" className="hover:text-white transition-colors">TikTok Username Checker</Link></li>
              <li><Link href="/tools/tiktok-caption-generator" className="hover:text-white transition-colors">TikTok Caption Generator</Link></li>
              <li><Link href="/tools/linkedin-text-formatter" className="hover:text-white transition-colors">LinkedIn Text Formatter</Link></li>
              <li><Link href="/tools/youtube-title-checker" className="hover:text-white transition-colors">YouTube Title Checker</Link></li>
              <li><Link href="/tools/youtube-tag-generator" className="hover:text-white transition-colors">YouTube Tag Generator</Link></li>
              <li><Link href="/tools/timeline-blocker-x" className="hover:text-white transition-colors">Timeline Blocker for X/Twitter</Link></li>
            </ul>
          </div>

          {/* COMPARE */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-acc-purple mb-2">COMPARE</div>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><Link href="/compare/buffer" className="hover:text-white transition-colors">Buffer alternative</Link></li>
              <li><Link href="/compare/hootsuite" className="hover:text-white transition-colors">Hootsuite alternative</Link></li>
              <li><Link href="/compare/later" className="hover:text-white transition-colors">Later alternative</Link></li>
              <li><Link href="/compare/publer" className="hover:text-white transition-colors">Publer alternative</Link></li>
              <li><Link href="/compare/postiz" className="hover:text-white transition-colors">Postiz alternative</Link></li>
              <li><Link href="/compare/post-bridge" className="hover:text-white transition-colors">Best scheduling APIs</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-acc-rose mb-2">LEGAL</div>
            <ul className="space-y-2 text-slate-400 font-semibold">
              <li><Link href="/whyareyoulikethis" className="hover:text-white transition-colors">Terms of services</Link></li>
              <li><Link href="/whyareyoulikethis" className="hover:text-white transition-colors">Privacy policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400">
          <div>Copyright © 2026 - All rights reserved</div>
          <div className="flex items-center gap-4">
            <AegnticAttribution size={18} />
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All systems operational &bull; Agent-Native API Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
