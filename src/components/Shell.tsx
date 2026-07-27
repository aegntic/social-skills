"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#how", label: "How" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/journey", label: "Journey" },
  { href: "/compare", label: "Compare" },
];

export function SiteHeader({ authed }: { authed?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: "rgba(250, 247, 242, 0.85)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="container-page flex items-center justify-between gap-4" style={{ height: "var(--navbar-height)" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="flex items-center justify-center rounded-xl px-2 py-1 text-sm font-black"
              style={{ background: "var(--card)", border: "1px solid var(--line-bright)", color: "var(--foreground)", boxShadow: "var(--shadow-sm)" }}
            >
              <span style={{ color: "var(--electric)" }}>s</span><span style={{ color: "var(--wutang)" }}>/</span>
            </span>
            <span className="text-sm font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
              social<span style={{ color: "var(--muted)" }}>.</span>skills
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--muted)" }}
              >
                <span className="transition-colors hover:text-[var(--electric)]" style={{ color: "inherit" }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            {authed ? (
              <Link href="/dashboard" className="btn btn-primary">
                Open desk
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-link">
                  Log in
                </Link>
                <Link href="/signup" className="btn btn-primary">
                  Start free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {open ? "Close" : "Menu"}
            </span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" style={{ color: "var(--foreground)" }}>
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        className="menu-overlay md:hidden"
        data-open={open}
        style={{ background: "var(--background)" }}
      >
        <nav className="flex h-full flex-col justify-between px-5 pb-12 pt-24">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b py-4 text-2xl font-semibold"
                style={{
                  borderColor: "var(--line)",
                  color: "var(--foreground)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={authed ? "/dashboard" : "/signup"}
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              {authed ? "Open desk" : "Start free"}
            </Link>
            {!authed && (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn btn-ghost w-full"
              >
                Log in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      {/* Gold marquee strip */}
      <div
        className="overflow-hidden border-y-2 py-3"
        style={{
          background: "var(--wutang)",
          borderColor: "rgba(0,0,0,0.08)",
        }}
      >
        <div className="marquee-banner">
          <div className="marquee-banner-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="px-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: "#fff" }}
              >
                content needs distribution &#9733;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div style={{ background: "var(--background)" }}>
        <div className="container-page py-14">
          <div className="mb-12 grid grid-cols-2 gap-8 border-b pb-10 md:grid-cols-4"
            style={{ borderColor: "var(--line)" }}
          >
            {[
              { href: "/#how", label: "How" },
              { href: "/#pricing", label: "Pricing" },
              { href: "/journey", label: "Journey" },
              { href: "/compare", label: "Compare" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium uppercase tracking-wider transition-colors"
                style={{ color: "var(--muted)" }}
              >
                <span className="transition-colors hover:text-[var(--foreground)]" style={{ color: "inherit" }}>
                  {l.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Have something to ship?
              </p>
              <Link href="/signup">
                <p
                  className="text-3xl font-bold md:text-5xl"
                  style={{ color: "var(--wutang)" }}
                >
                  start free &rarr;
                </p>
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 text-xs uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              <Link href="/signup" className="transition-colors hover:text-[var(--foreground)]">Signup</Link>
              <Link href="/login" className="transition-colors hover:text-[var(--foreground)]">Login</Link>
              <Link href="/dashboard" className="transition-colors hover:text-[var(--foreground)]">Demo</Link>
              <Link href="/journey" className="transition-colors hover:text-[var(--foreground)]">Journey</Link>
            </div>
          </div>

          <div
            className="mt-12 flex flex-col justify-between gap-2 border-t pt-6 text-xs uppercase tracking-wider md:flex-row"
            style={{
              borderColor: "var(--line)",
              color: "var(--muted-dim)",
            }}
          >
            <span>&copy; {new Date().getFullYear()} Social Skills</span>
            <span style={{ color: "var(--muted-dim)" }}>
              the distribution layer for creators
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
