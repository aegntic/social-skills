"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string; sub: string };

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", sub: "The front plate" },
  { href: "/#how", label: "How", sub: "Three moves, that's it" },
  { href: "/#pricing", label: "Pricing", sub: "Free to start, $19 to grow" },
  { href: "/journey", label: "Journey", sub: "What the app has learned" },
  { href: "/compare", label: "Compare", sub: "Honest side-by-sides" },
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ mixBlendMode: "difference" }}
      >
        <div
          className="mx-auto flex items-center justify-between gap-4 px-5 md:px-10"
          style={{ height: "var(--navbar-height)" }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-sans text-sm font-medium uppercase tracking-[0.18em] text-white"
          >
            Social Skills
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-sans text-sm uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-60"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu (blumenkopf pattern) */}
      <div
        id="site-menu"
        className="menu-overlay bg-ink text-background"
        data-open={open}
      >
        <nav className="mx-auto flex h-full flex-col justify-between px-5 pb-12 pt-28 md:px-10">
          <ul className="space-y-4 md:space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group block border-b pb-3"
                  style={{ borderColor: "oklch(35% 0.008 60)" }}
                >
                  <span
                    className="display block text-5xl font-light tracking-tight text-background transition-colors duration-300 group-hover:text-primary md:text-7xl lg:text-8xl"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0' }}
                  >
                    {link.label}
                  </span>
                  <span className="mt-2 block max-w-md text-sm text-background/40">
                    {link.sub}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-6">
            <Link
              href={authed ? "/dashboard" : "/signup"}
              onClick={() => setOpen(false)}
              className="btn btn-primary"
            >
              {authed ? "Open desk" : "Start free"}
            </Link>
            {!authed && (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn btn-ghost"
                style={{ borderColor: "oklch(50% 0.008 60)", color: "var(--background)" }}
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
  const marqueeItems = Array.from({ length: 8 });

  return (
    <footer className="mt-auto">
      {/* Tangerine marquee banner (blumenkopf pattern) */}
      <div
        className="marquee-banner overflow-hidden py-3 md:py-4"
        style={{
          background: "var(--primary)",
          color: "white",
          borderTop: "2px solid var(--ink)",
          borderBottom: "2px solid var(--ink)",
        }}
        aria-label="Tagline marquee"
      >
        <div className="marquee-banner-track">
          {marqueeItems.concat(marqueeItems).map((_, i) => (
            <span
              key={i}
              className="display px-6 text-sm font-medium uppercase tracking-[0.18em] md:text-base"
              style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20' }}
            >
              write once, show up everywhere &#9733;
            </span>
          ))}
        </div>
      </div>

      {/* Footer body */}
      <div className="bg-background text-ink">
        <div className="container-wide py-14 md:py-20">
          <div className="mb-14 grid grid-cols-2 gap-8 border-b-2 border-ink pb-10 md:grid-cols-4">
            {[
              { href: "/#how", label: "How" },
              { href: "/#pricing", label: "Pricing" },
              { href: "/journey", label: "Journey" },
              { href: "/compare", label: "Compare" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm uppercase tracking-[0.18em] transition-colors hover:text-primary md:text-base"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.18em] text-muted">
                Have something to ship?
              </p>
              <p
                className="display text-3xl lowercase md:text-5xl"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0',
                  fontWeight: 300,
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                start free
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-muted">
              <Link href="/signup" className="transition-colors hover:text-ink">Signup</Link>
              <Link href="/login" className="transition-colors hover:text-ink">Login</Link>
              <Link href="/dashboard" className="transition-colors hover:text-ink">Demo</Link>
              <Link href="/journey" className="transition-colors hover:text-ink">Journey</Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-2 border-t pt-6 text-xs uppercase tracking-[0.18em] text-muted md:flex-row"
            style={{ borderColor: "oklch(88% 0.005 70)" }}
          >
            <span>&copy; {new Date().getFullYear()} Social Skills</span>
            <span
              className="display italic"
              style={{ fontVariationSettings: '"opsz" 14, "SOFT" 50, "WONK" 1' }}
            >
              a cross-post desk with a memory layer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
