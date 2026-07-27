import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { DoomscrollHero } from "@/components/DoomscrollHero";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import { ScrollReveal, Parallax, CounterTo, MagneticHeading } from "@/components/ScrollAnim";
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
    title: "Compose",
    cmd: "socialskills compose",
    body: "Type your caption in the compose desk. No tabs, no switching context.",
  },
  {
    n: "02",
    title: "Select destinations",
    cmd: "socialskills select --platforms all",
    body: "Pick which platforms get the post. Each one gets its own transform applied automatically.",
  },
  {
    n: "03",
    title: "Publish",
    cmd: "socialskills publish",
    body: "Hit publish. Results come back per account. The memory layer notes what worked.",
  },
] as const;

const STATS = [
  { n: 10, suffix: "", l: "platforms" },
  { n: 30, suffix: "s", l: "compose to publish" },
  { n: 0, suffix: "", l: "tabs to manage" },
  { n: 0, suffix: "", l: "to start" },
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
            HERO — dark terminal
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
          <Parallax speed={0.2} className="parallax-orb" >
            <div style={{ position: "absolute", top: "5%", left: "-5%", width: "300px", height: "300px", background: "var(--electric)" }} />
          </Parallax>
          <Parallax speed={-0.3} className="parallax-orb">
            <div style={{ position: "absolute", top: "10%", right: "-8%", width: "400px", height: "400px", background: "var(--wutang)" }} />
          </Parallax>
          <div className="container-wide relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              {/* Left: headline + CTA + terminal block */}
              <div>
                {/* Live status badge */}
                <ScrollReveal from="fade" delay={0.1}>
                  <span
                    className="status-pill mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                    style={{ borderColor: "var(--line-bright)", background: "var(--card)" }}
                  >
                    <span className="status-dot" />
                    10 platforms &middot; free to start
                  </span>
                </ScrollReveal>

                {/* The belief statement */}
                <ScrollReveal from="up" delay={0.15}>
                  <h1
                    className="font-sans font-extrabold tracking-tight"
                    style={{
                      fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                      lineHeight: 1.0,
                      color: "var(--foreground)",
                    }}
                  >
                    content{" "}
                    <span style={{ color: "var(--electric)" }}>needs</span>{" "}
                    distribution
                  </h1>
                </ScrollReveal>

                {/* Outcome statement */}
                <ScrollReveal from="up" delay={0.25}>
                  <p
                    className="mt-6 max-w-lg text-lg leading-relaxed md:text-xl"
                    style={{ color: "var(--muted)" }}
                  >
                    One compose desk. Ten platforms. Each gets its own transform
                    applied automatically. Plus a memory layer that learns your
                    voice over time.
                  </p>
                </ScrollReveal>

                {/* CTAs */}
                <ScrollReveal from="up" delay={0.35}>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
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
                </ScrollReveal>

                {/* Terminal code block */}
                <ScrollReveal from="up" delay={0.45}>
                  <div className="terminal-window mt-8 max-w-md">
                    <div className="terminal-chrome">
                      <span className="terminal-dot" style={{ background: "#FF5F57" }} />
                      <span className="terminal-dot" style={{ background: "#FEBC2E" }} />
                      <span className="terminal-dot" style={{ background: "#28CA42" }} />
                      <span className="terminal-title">social-skills &mdash; zsh</span>
                    </div>
                    <div className="terminal-body">
                      <div className="cli-line">
                        <span className="cli-prompt">$</span>
                        <span style={{ color: "var(--foreground)" }}>socialskills compose</span>
                      </div>
                      <div className="cli-line">
                        <span className="cli-success">✓</span>
                        <span className="cli-output">caption ready &middot; 10 platforms detected</span>
                      </div>
                      <div className="cli-line mt-2">
                        <span className="cli-prompt">$</span>
                        <span style={{ color: "var(--foreground)" }}>socialskills publish --to all</span>
                      </div>
                      <div className="cli-line">
                        <span className="cli-arrow">→</span>
                        <span className="cli-output">X: stripped links</span>
                      </div>
                      <div className="cli-line">
                        <span className="cli-arrow">→</span>
                        <span className="cli-output">Instagram: media validated</span>
                      </div>
                      <div className="cli-line">
                        <span className="cli-arrow">→</span>
                        <span className="cli-output">LinkedIn: title set</span>
                      </div>
                      <div className="cli-line">
                        <span className="cli-success">✓</span>
                        <span className="cli-success">published to 10 platforms &middot; 30s</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: doomscroll hero */}
              <ScrollReveal from="scale" delay={0.3} duration={1.2} className="relative">
                <DoomscrollHero />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            THE PROBLEM
        ═══════════════════════════════════════════════════════════════ */}
        <section className="panel-section relative overflow-hidden">
          <div className="container-page relative z-10 py-16 md:py-24">
            <div className="max-w-3xl">
              <ScrollReveal from="fade">
                <p className="section-label mb-3">The problem</p>
              </ScrollReveal>
              <MagneticHeading
                className="font-sans font-bold tracking-tight"
                >
                <span style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, display: "block", color: "var(--foreground)" }}>
                  You&rsquo;re losing 30 minutes every day to tab-switching.
                </span>
              </MagneticHeading>
            </div>

            <ScrollReveal from="up" stagger={0.08} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PAIN_POINTS.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-3 rounded-lg border p-4"
                  style={{ borderColor: "var(--line)", background: "var(--card)" }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--primary-soft)" }}
                  >
                    <PainIcon type={p.icon} />
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{p.text}</span>
                </div>
              ))}
            </ScrollReveal>

            {/* Loss aversion callout */}
            <ScrollReveal from="scale" delay={0.2}>
              <div
                className="mt-8 flex items-center gap-4 rounded-xl border p-5"
                style={{
                  borderColor: "var(--line-bright)",
                  background: "var(--card-elevated)",
                }}
              >
                <span className="font-mono text-3xl" style={{ color: "var(--electric)" }}>~</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    That&rsquo;s 15 hours a month spent on logistics instead of creating.
                  </p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Social Skills collapses all of it into one compose surface.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HOW IT WORKS — 3 steps with CLI commands
        ═══════════════════════════════════════════════════════════════ */}
        <section id="how" className="relative overflow-hidden py-16 md:py-24">
          <Parallax speed={0.15} className="parallax-orb">
            <div style={{ position: "absolute", top: "30%", right: "0%", width: "350px", height: "350px", background: "var(--electric)" }} />
          </Parallax>
          <div className="container-page relative z-10">
            <div className="mb-12 max-w-2xl">
              <ScrollReveal from="fade">
                <p className="section-label mb-3">How it works</p>
              </ScrollReveal>
              <MagneticHeading
                className="font-sans font-bold tracking-tight"
              >
                <span style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, display: "block", color: "var(--foreground)" }}>
                  Three steps. That&rsquo;s the whole tool.
                </span>
              </MagneticHeading>
            </div>

            <ScrollReveal from="up" stagger={0.15} className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--line)", background: "var(--card)" }}
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
                  <h3 className="mb-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>{step.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step.body}</p>
                  <div className="cli-line rounded-md border px-2.5 py-1.5" style={{ borderColor: "var(--line)", background: "var(--ink)" }}>
                    <span className="cli-prompt">$</span>
                    <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{step.cmd}</span>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PER-PLATFORM INTELLIGENCE with live status
        ═══════════════════════════════════════════════════════════════ */}
        <section id="features" className="panel-section relative overflow-hidden py-16 md:py-24">
          <div className="container-page relative z-10">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <ScrollReveal from="fade">
                  <p className="section-label mb-3">Per-platform intelligence</p>
                </ScrollReveal>
                <MagneticHeading
                  className="font-sans font-bold tracking-tight"
                >
                  <span style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, display: "block", color: "var(--foreground)" }}>
                    Each network gets its own transform.
                  </span>
                </MagneticHeading>
                <ScrollReveal from="up" delay={0.1}>
                  <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
                    You write once. The desk applies the right rules to each platform
                    before publishing. No manual adjustments.
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal from="fade" delay={0.15}>
                <span className="status-pill">
                  <span className="status-dot" />
                  all platforms operational
                </span>
              </ScrollReveal>
            </div>

            {/* Platform grid with full color logos */}
            <ScrollReveal from="scale" stagger={0.06}>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-5"
                style={{ borderColor: "var(--line)", background: "var(--line)" }}
              >
                {PLATFORMS.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col items-start gap-2 p-4 transition-transform hover:scale-[1.02]"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="flex w-full items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <PlatformColorLogo id={p.id} className="h-6 w-6" />
                        <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{p.label}</span>
                      </div>
                      <span className="status-dot" style={{ width: 6, height: 6 }} />
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
                    <span className="mt-1 font-mono text-xs" style={{ color: "var(--muted)" }}>
                      {p.maxCaption.toLocaleString()} chars
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            THE MEMORY LAYER — terminal data card
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <Parallax speed={-0.2} className="parallax-orb">
            <div style={{ position: "absolute", bottom: "5%", left: "0%", width: "350px", height: "350px", background: "var(--wutang)" }} />
          </Parallax>
          <div className="container-page relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: terminal data card */}
              <ScrollReveal from="left" duration={1.0} className="order-2 lg:order-1">
                <div className="terminal-window">
                  <div className="terminal-chrome">
                    <span className="terminal-dot" style={{ background: "#FF5F57" }} />
                    <span className="terminal-dot" style={{ background: "#FEBC2E" }} />
                    <span className="terminal-dot" style={{ background: "#28CA42" }} />
                    <span className="terminal-title">memory &mdash; read</span>
                  </div>
                  <div className="terminal-body">
                    <div className="cli-line mb-3">
                      <span className="cli-prompt">$</span>
                      <span style={{ color: "var(--foreground)" }}>socialskills memory --show</span>
                    </div>
                    <div className="space-y-2">
                      <MemoryRow label="brand_voice" value={`"confident, technical"`} />
                      <MemoryRow label="best_time" value="tue/thu 09-11am" />
                      <MemoryRow label="top_platform" value="linkedin (3.2x)" />
                      <MemoryRow label="cadence" value="3-4 posts/week" />
                      <MemoryRow label="caption_style" value="short, punchy, cta" />
                    </div>
                    <div
                      className="mt-4 flex items-center gap-2 rounded-md border px-3 py-2"
                      style={{ borderColor: "var(--wutang-soft)", background: "oklch(15% 0.03 88)" }}
                    >
                      <span className="status-dot" style={{ width: 6, height: 6 }} />
                      <span className="font-mono text-xs" style={{ color: "var(--wutang)" }}>
                        compounding with every post
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right: copy */}
              <div className="order-1 lg:order-2">
                <ScrollReveal from="fade">
                  <p className="section-label mb-3">The differentiator</p>
                </ScrollReveal>
                <MagneticHeading
                  className="font-sans font-bold tracking-tight"
                >
                  <span style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, display: "block", color: "var(--foreground)" }}>
                    A memory layer that actually remembers.
                  </span>
                </MagneticHeading>
                <ScrollReveal from="up" delay={0.1}>
                  <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                    Every other tool forgets you the moment you hit post. Social
                    Skills tracks your brand voice, posting cadence, and which
                    platform performs best. The journey page makes this visible.
                  </p>
                </ScrollReveal>
                <ScrollReveal from="up" stagger={0.08} delay={0.15} className="mt-6 space-y-3">
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
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>{item}</span>
                    </div>
                  ))}
                </ScrollReveal>
                <ScrollReveal from="fade" delay={0.3}>
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
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STATS — terminal metrics
        ═══════════════════════════════════════════════════════════════ */}
        <section className="panel-section relative overflow-hidden py-12 md:py-16">
          <div className="container-page">
            <ScrollReveal from="up" stagger={0.1} className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {STATS.map((s) => (
                <div key={s.l} className="text-center md:text-left">
                  <p
                    className="font-mono font-bold tracking-tight"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1, color: "var(--foreground)" }}
                  >
                    {s.l === "to start" ? (
                      <span>
                        $<CounterTo target={s.n} />
                      </span>
                    ) : (
                      <CounterTo target={s.n} suffix={s.suffix} />
                    )}
                  </p>
                  <p className="mt-2 font-mono text-sm font-medium" style={{ color: "var(--muted)" }}>{s.l}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PRICING
        ═══════════════════════════════════════════════════════════════ */}
        <section id="pricing" className="relative overflow-hidden py-16 md:py-24">
          <Parallax speed={0.2} className="parallax-orb">
            <div style={{ position: "absolute", top: "10%", left: "5%", width: "300px", height: "300px", background: "var(--electric)" }} />
          </Parallax>
          <div className="container-page relative z-10">
            <div className="mb-12 max-w-2xl">
              <ScrollReveal from="fade">
                <p className="section-label mb-3">Pricing</p>
              </ScrollReveal>
              <MagneticHeading
                className="font-sans font-bold tracking-tight"
              >
                <span style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, color: "var(--foreground)", display: "block" }}>
                  Free to start. Pay when you grow.
                </span>
              </MagneticHeading>
              <ScrollReveal from="up" delay={0.1}>
                <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
                  No per-channel math. No credit card to start.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal from="up" stagger={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            </ScrollReveal>

            <ScrollReveal from="fade" delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/signup" className="btn btn-primary">
                  Start free
                </Link>
                <Link href="/dashboard" className="btn btn-ghost">
                  Try the demo
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            COMPARE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="panel-section py-16 md:py-20">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <ScrollReveal from="fade">
                  <p className="section-label mb-2">Comparisons</p>
                </ScrollReveal>
                <MagneticHeading
                  className="font-sans font-bold tracking-tight"
                >
                  <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", display: "block", color: "var(--foreground)" }}>
                    How we stack up.
                  </span>
                </MagneticHeading>
              </div>
              <ScrollReveal from="fade" delay={0.1}>
                <Link
                  href="/compare"
                  className="text-sm font-semibold"
                  style={{ color: "var(--electric)" }}
                >
                  Full comparison hub &rarr;
                </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal from="up" stagger={0.08}>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4"
                style={{ borderColor: "var(--line)", background: "var(--line)" }}
              >
                {competitors.slice(0, 4).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="block p-5 transition-all"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="mb-1.5 text-base font-bold" style={{ color: "var(--foreground)" }}>vs {c.name}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{c.blurb}</p>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="container-page max-w-3xl">
            <MagneticHeading
              className="mb-10 font-sans font-bold tracking-tight"
            >
              <span style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", display: "block", color: "var(--foreground)" }}>
                Questions, answered.
              </span>
            </MagneticHeading>
            <ScrollReveal from="fade" stagger={0.1}>
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
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CLOSING CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <Parallax speed={0.1} className="parallax-orb">
            <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", background: "var(--electric)" }} />
          </Parallax>
          <Parallax speed={-0.15} className="parallax-orb">
            <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "350px", height: "350px", background: "var(--wutang)" }} />
          </Parallax>
          <div className="container-page relative z-10 text-center">
            <ScrollReveal from="scale" duration={1.2}>
              <h2
                className="font-sans font-extrabold tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.05, color: "var(--foreground)" }}
              >
                Stop managing tabs.
                <br />
                <span style={{ color: "var(--electric)" }}>Start shipping.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal from="up" delay={0.15}>
              <p className="mx-auto mt-6 max-w-md text-base" style={{ color: "var(--muted)" }}>
                Join creators who collapsed their social workflow into one desk.
              </p>
            </ScrollReveal>
            <ScrollReveal from="up" delay={0.25}>
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
            </ScrollReveal>
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
  const color = "var(--electric)";
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
    electric: { bg: "var(--primary-soft)", color: "var(--electric)" },
    warn: { bg: "oklch(20% 0.04 65)", color: "var(--warn)" },
    blue: { bg: "oklch(20% 0.03 250)", color: "oklch(65% 0.15 250)" },
    muted: { bg: "oklch(18% 0.006 250)", color: "var(--muted)" },
  }[color];
  return (
    <span
      className="rounded px-1.5 py-0.5 font-mono text-[11px] font-medium"
      style={{ background: styles.bg, color: styles.color }}
    >
      {label}
    </span>
  );
}

function MemoryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-1.5" style={{ borderColor: "var(--line)" }}>
      <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="font-mono text-xs font-semibold" style={{ color: "var(--electric)" }}>{value}</span>
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
        borderColor: highlighted ? "var(--wutang)" : "var(--line-bright)",
        background: highlighted ? "oklch(16% 0.02 88)" : "var(--card)",
      }}
    >
      {highlighted && (
        <span
          className="mb-3 inline-block rounded px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide"
          style={{ background: "var(--wutang)", color: "var(--ink)" }}
        >
          Best value
        </span>
      )}
      <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-mono text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>{price}</span>
        {period && <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>{period}</span>}
      </div>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{desc}</p>
      <ul className="mt-5 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: highlighted ? "var(--wutang)" : "var(--electric)" }}>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm" style={{ color: "var(--foreground)" }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
