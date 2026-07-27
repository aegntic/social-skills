import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { ComposeDeskMockup } from "@/components/ComposeDeskMockup";
import { PlatformIcon } from "@/components/PlatformIcons";
import { getSessionUser } from "@/lib/auth";
import { PLATFORMS } from "@/lib/platforms";
import { competitors } from "@/lib/competitors";

const PAIN_POINTS = [
  { icon: "tabs", text: "7 browser tabs open at once" },
  { icon: "copy", text: "Copy-pasting the same caption 5 times" },
  { icon: "rules", text: "Remembering X strips links, IG needs media" },
  { icon: "resize", text: "Resizing images for each platform" },
  { icon: "wonder", text: "Wondering if you missed one" },
  { icon: "time", text: "30+ minutes gone. Every day." },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Write once",
    body: "Type your caption in the compose desk. No tabs, no switching context.",
    accent: "compose",
  },
  {
    n: "02",
    title: "Pick destinations",
    body: "Select which platforms get the post. Each one gets its own transform applied automatically.",
    accent: "dispatch",
  },
  {
    n: "03",
    title: "Publish & learn",
    body: "Hit publish. Results come back per account. The memory layer notes what worked.",
    accent: "remember",
  },
] as const;

const STATS = [
  { n: "10", l: "platforms" },
  { n: "30s", l: "compose to publish" },
  { n: "0", l: "tabs to manage" },
  { n: "$0", l: "to start" },
] as const;

const FAQS = [
  {
    q: "How is this different from Buffer or Later?",
    a: "Buffer is a queue. Social Skills is a desk with a memory layer. Per-platform transforms (X strips links, Instagram validates media, Threads gets a hook) happen before you publish. The memory layer tracks your voice and performance over time.",
  },
  {
    q: "What does the memory layer actually do?",
    a: "It learns your brand voice, posting cadence, and which platform performs best. The journey page shows what the app has learned, publicly. Your private operator memory stays behind auth.",
  },
  {
    q: "Can I schedule posts?",
    a: "Yes. The dispatch flow supports both immediate publish and scheduled posts. The demo workspace ships with seeded accounts so you can test the full flow without connecting anything.",
  },
  {
    q: "Is there an API?",
    a: "The Pro tier ($39/mo) includes API access. The app also ships with a check-platforms script for validating that all platform integrations are live before you schedule a campaign.",
  },
  {
    q: "Can I self-host?",
    a: "Yes. Social Skills runs on Fly.io with a Cloudflare Tunnel. The repo is standalone Next.js with a file-based store. No external database required for the demo workspace.",
  },
] as const;

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <>
      <SiteHeader authed={Boolean(user)} />
      <main className="relative">
        {/* ═══════════════════════════════════════════════════════════════
            HERO — "content NEEDS distribution"
            Trigger: relief + outcome. Show the belief, then the proof.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
          <div className="container-wide">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              {/* Left: headline + CTA */}
              <div>
                {/* Trust badge */}
                <div
                  className="reveal delay-1 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: "oklch(88% 0.01 240)",
                    background: "white",
                    color: "var(--muted)",
                  }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "var(--ok)" }}
                  />
                  10 platforms &middot; free to start
                </div>

                {/* The belief statement */}
                <h1
                  className="reveal delay-2 font-sans font-extrabold tracking-tight text-ink"
                  style={{
                    fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                    lineHeight: 1.0,
                  }}
                >
                  content{" "}
                  <span style={{ color: "var(--electric)" }}>needs</span>{" "}
                  distribution
                </h1>

                {/* Outcome statement */}
                <p
                  className="reveal delay-3 mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl"
                >
                  One compose desk. Ten platforms. Each gets its own transform
                  applied automatically. Plus a memory layer that learns your
                  voice over time.
                </p>

                {/* CTAs */}
                <div className="reveal delay-4 mt-8 flex flex-wrap items-center gap-4">
                  <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary text-base">
                    {user ? "Open desk" : "Start free"}
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link href="/#how" className="btn btn-ghost text-base">
                    See how it works
                  </Link>
                </div>

                {/* Trust signals */}
                <div className="reveal delay-5 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" style={{ color: "var(--ok)" }}>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    No credit card
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" style={{ color: "var(--ok)" }}>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Free forever plan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" style={{ color: "var(--ok)" }}>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Self-hostable
                  </span>
                </div>
              </div>

              {/* Right: compose desk mockup */}
              <div className="reveal delay-3 relative">
                <ComposeDeskMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            THE PROBLEM — empathy trigger
            "You're losing 30 minutes every day"
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-y" style={{ borderColor: "var(--line)", background: "oklch(99% 0.002 240)" }}>
          <div className="container-page py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="section-label mb-3">The problem</p>
              <h2
                className="font-sans font-bold tracking-tight text-ink"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                You&rsquo;re losing 30 minutes every day to tab-switching.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PAIN_POINTS.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-3 rounded-lg border bg-white p-4"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "oklch(95% 0.008 20)" }}
                  >
                    <PainIcon type={p.icon} />
                  </span>
                  <span className="text-sm font-medium text-ink">{p.text}</span>
                </div>
              ))}
            </div>

            {/* Loss aversion callout */}
            <div
              className="mt-8 flex items-center gap-4 rounded-xl border p-5"
              style={{
                borderColor: "oklch(88% 0.01 240)",
                background: "oklch(97% 0.008 240)",
              }}
            >
              <span className="text-3xl" style={{ color: "var(--electric)" }}>~</span>
              <div>
                <p className="text-sm font-bold text-ink">
                  That&rsquo;s 15 hours a month spent on logistics instead of creating.
                </p>
                <p className="text-sm text-muted">
                  Social Skills collapses all of it into one compose surface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HOW IT WORKS — 3 steps
            Trigger: cognitive fluency
        ═══════════════════════════════════════════════════════════════ */}
        <section id="how" className="py-16 md:py-24">
          <div className="container-page">
            <div className="mb-12 max-w-2xl">
              <p className="section-label mb-3">How it works</p>
              <h2
                className="font-sans font-bold tracking-tight text-ink"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Three steps. That&rsquo;s the whole tool.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: "var(--electric)" }}
                    >
                      {step.n}
                    </span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: "var(--wutang)" }}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PER-PLATFORM INTELLIGENCE
            Trigger: competence signaling — show the actual transforms
        ═══════════════════════════════════════════════════════════════ */}
        <section id="features" className="border-y py-16 md:py-24" style={{ borderColor: "var(--line)", background: "oklch(99% 0.002 240)" }}>
          <div className="container-page">
            <div className="mb-12 max-w-2xl">
              <p className="section-label mb-3">Per-platform intelligence</p>
              <h2
                className="font-sans font-bold tracking-tight text-ink"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Each network gets its own transform.
              </h2>
              <p className="mt-4 text-base text-muted">
                You write once. The desk applies the right rules to each platform
                before publishing. No manual adjustments.
              </p>
            </div>

            {/* Platform grid with real icons */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-5"
              style={{ borderColor: "var(--line)", background: "var(--line)" }}
            >
              {PLATFORMS.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col items-start gap-2 bg-white p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon id={p.id} className="h-5 w-5 text-ink" />
                    <span className="text-sm font-bold text-ink">{p.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stripsLinks && (
                      <TransformBadge label="strips links" color="electric" />
                    )}
                    {p.needsMedia && (
                      <TransformBadge label="media required" color="warn" />
                    )}
                    {p.hasTitle && (
                      <TransformBadge label="title field" color="blue" />
                    )}
                    {!p.stripsLinks && !p.needsMedia && !p.hasTitle && (
                      <TransformBadge label="direct post" color="muted" />
                    )}
                  </div>
                  <span className="mt-1 text-xs text-muted">
                    {p.maxCaption.toLocaleString()} chars max
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            THE MEMORY LAYER — the differentiator
            Trigger: the Zeigarnik effect (incomplete curiosity)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="container-page">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: visual */}
              <div className="order-2 lg:order-1">
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    borderColor: "oklch(88% 0.01 240)",
                    background: "linear-gradient(135deg, oklch(99% 0.002 240), oklch(96% 0.015 240))",
                  }}
                >
                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted">
                    What the app has learned
                  </p>
                  <div className="space-y-3">
                    <MemoryRow label="Brand voice" value="Confident, technical, no emojis" />
                    <MemoryRow label="Best posting time" value="Tue/Thu 9-11am" />
                    <MemoryRow label="Top platform" value="LinkedIn (3.2x engagement)" />
                    <MemoryRow label="Cadence" value="3-4 posts/week" />
                    <MemoryRow label="Caption style" value="Short, punchy, CTA at end" />
                  </div>
                  <div
                    className="mt-5 flex items-center gap-2 rounded-lg p-3"
                    style={{ background: "var(--wutang-soft)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" style={{ color: "oklch(55% 0.14 75)" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs font-medium" style={{ color: "oklch(45% 0.12 75)" }}>
                      Compounds with every post you publish
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: copy */}
              <div className="order-1 lg:order-2">
                <p className="section-label mb-3">The differentiator</p>
                <h2
                  className="font-sans font-bold tracking-tight text-ink"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
                >
                  A memory layer that actually remembers.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  Every other tool forgets you the moment you hit post. Social
                  Skills tracks your brand voice, posting cadence, and which
                  platform performs best. The journey page makes this visible.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Learns your tone and applies it to future captions",
                    "Surfaces your best-performing platform automatically",
                    "Tracks posting rhythm and suggests optimal times",
                    "Public journey page builds trust with your audience",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--electric)" }}>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/journey"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--electric)" }}
                >
                  See the live journey page
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STATS — social proof
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-y py-12 md:py-16" style={{ borderColor: "var(--line)", background: "oklch(99% 0.002 240)" }}>
          <div className="container-page">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {STATS.map((s) => (
                <div key={s.l} className="text-center md:text-left">
                  <p
                    className="font-sans font-extrabold tracking-tight text-ink"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}
                  >
                    {s.n}
                  </p>
                  <p className="mt-2 text-sm font-medium text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PRICING — safe commitment trigger
            Anchored: show Pro first (anchor), Creator second, Free last
        ═══════════════════════════════════════════════════════════════ */}
        <section id="pricing" className="dark-section py-16 md:py-24">
          <div className="container-page">
            <div className="mb-12 max-w-2xl">
              <p className="section-label mb-3">Pricing</p>
              <h2
                className="font-sans font-bold tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, color: "white" }}
              >
                Free to start. Pay when you grow.
              </h2>
              <p className="mt-4 text-base" style={{ color: "oklch(65% 0.008 240)" }}>
                No per-channel math. No credit card to start.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Pro — anchor */}
              <PriceCard
                name="Pro"
                price="$39"
                period="/mo"
                desc="Unlimited everything. For serious creators."
                features={["Unlimited accounts", "Team seats", "API access", "Priority queue"]}
                highlighted
              />
              {/* Creator */}
              <PriceCard
                name="Creator"
                price="$19"
                period="/mo"
                desc="The sweet spot. Most people pick this."
                features={["15 accounts", "Caption assist (AI)", "Scheduled posts", "Memory layer"]}
              />
              {/* Free */}
              <PriceCard
                name="Starter"
                price="$0"
                period=""
                desc="Free forever. Full compose-and-dispatch flow."
                features={["Demo workspace", "Seeded accounts", "Unlimited local posts", "All transforms"]}
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/signup" className="btn btn-primary">
                Start free
              </Link>
              <Link href="/dashboard" className="btn btn-ghost">
                Try the demo
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            COMPARE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label mb-2">Comparisons</p>
                <h2
                  className="font-sans font-bold tracking-tight text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  How we stack up.
                </h2>
              </div>
              <Link
                href="/compare"
                className="text-sm font-semibold"
                style={{ color: "var(--electric)" }}
              >
                Full comparison hub &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4"
              style={{ borderColor: "var(--line)", background: "var(--line)" }}
            >
              {competitors.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="block bg-white p-5 transition-all hover:shadow-md"
                >
                  <div className="mb-1.5 text-base font-bold text-ink">vs {c.name}</div>
                  <p className="text-xs leading-relaxed text-muted">{c.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FAQ — objection handling
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-t py-16 md:py-24" style={{ borderColor: "var(--line)", background: "oklch(99% 0.002 240)" }}>
          <div className="container-page max-w-3xl">
            <h2
              className="mb-10 font-sans font-bold tracking-tight text-ink"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Questions, answered.
            </h2>
            <div>
              {FAQS.map((faq) => (
                <details key={faq.q} className="faq-item">
                  <summary>
                    <span>{faq.q}</span>
                    <span className="faq-icon">+</span>
                  </summary>
                  <div className="faq-answer">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CLOSING CTA — identity return
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32">
          <div className="container-page text-center">
            <h2
              className="font-sans font-extrabold tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.05 }}
            >
              Stop managing tabs.
              <br />
              <span style={{ color: "var(--electric)" }}>Start shipping.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-muted">
              Join creators who collapsed their social workflow into one desk.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary text-base">
                {user ? "Open desk" : "Start free"}
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/journey" className="btn btn-ghost text-base">
                See the journey
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ─── Helper components ─── */

function PainIcon({ type }: { type: string }) {
  const common = "h-4 w-4";
  const color = "oklch(55% 0.015 20)";
  switch (type) {
    case "tabs":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} style={{ color }}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "copy":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} style={{ color }}>
          <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "rules":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} style={{ color }}>
          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "resize":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} style={{ color }}>
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "wonder":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} style={{ color }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "time":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} style={{ color }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function TransformBadge({ label, color }: { label: string; color: "electric" | "warn" | "blue" | "muted" }) {
  const styles = {
    electric: { bg: "oklch(93% 0.03 264)", color: "oklch(40% 0.15 264)" },
    warn: { bg: "oklch(92% 0.04 65)", color: "oklch(40% 0.12 65)" },
    blue: { bg: "oklch(93% 0.03 250)", color: "oklch(40% 0.12 250)" },
    muted: { bg: "oklch(95% 0.005 240)", color: "oklch(45% 0.008 240)" },
  }[color];
  return (
    <span
      className="rounded px-1.5 py-0.5 text-[11px] font-medium"
      style={{ background: styles.bg, color: styles.color }}
    >
      {label}
    </span>
  );
}

function MemoryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-2.5" style={{ borderColor: "oklch(92% 0.005 240)" }}>
      <span className="text-xs font-medium text-muted">{label}</span>
      <span className="text-xs font-semibold text-ink">{value}</span>
    </div>
  );
}

function PriceCard({
  name,
  price,
  period,
  desc,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: highlighted ? "var(--wutang)" : "oklch(35% 0.008 250)",
        background: highlighted ? "oklch(20% 0.012 250)" : "oklch(17% 0.010 250)",
      }}
    >
      {highlighted && (
        <span
          className="mb-3 inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
          style={{ background: "var(--wutang)", color: "var(--ink)" }}
        >
          Best value
        </span>
      )}
      <h3 className="text-lg font-bold text-white">{name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-white">{price}</span>
        {period && <span className="text-sm" style={{ color: "oklch(65% 0.008 240)" }}>{period}</span>}
      </div>
      <p className="mt-2 text-sm" style={{ color: "oklch(60% 0.008 240)" }}>{desc}</p>
      <ul className="mt-5 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: highlighted ? "var(--wutang)" : "var(--electric)" }}>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm" style={{ color: "oklch(85% 0.005 240)" }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
