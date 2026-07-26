import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";
import { PLATFORMS } from "@/lib/platforms";
import { competitors } from "@/lib/competitors";

const PILLARS = [
  {
    n: "01",
    title: "Compose",
    body: "Write your caption. Drop media if the platform needs it. Per-platform overrides let you set a custom caption for YouTube without changing your X post.",
  },
  {
    n: "02",
    title: "Dispatch",
    body: "Pick your accounts. Hit publish. Each platform gets its own transform: X strips links, Instagram validates media, Threads gets a question hook.",
  },
  {
    n: "03",
    title: "Remember",
    body: "The app learns your voice over time. Brand tone, posting cadence, which platform performs best. The memory layer is the differentiator.",
  },
  {
    n: "04",
    title: "Analyze",
    body: "Results come back per account. Success, failure, published URL. Analytics surface what worked so the next dispatch is sharper.",
  },
] as const;

const SERVICES = [
  "Cross-post to 10 networks",
  "Per-platform transforms",
  "Per-platform overrides",
  "Scheduled + immediate publish",
  "Caption assist (AI)",
  "Memory layer + journey",
  "Analytics read-back",
  "Self-hostable on Fly.io",
] as const;

const STATS = [
  { n: "10", l: "platforms supported" },
  { n: "30s", l: "compose to published" },
  { n: "0", l: "tabs to manage" },
  { n: "$0", l: "to start, forever" },
] as const;

const FAQS = [
  {
    q: "How is this different from Buffer or Later?",
    a: "Buffer is a queue. Social Skills is a desk. The compose surface applies per-platform transforms (X strips links, Instagram validates media, Threads gets a hook) before you publish. The memory layer learns your voice and remembers which posts performed.",
  },
  {
    q: "Can I schedule posts or only publish immediately?",
    a: "Both. The dispatch flow supports immediate publish and scheduled posts. The demo workspace ships with seeded accounts so you can test the full flow without connecting anything.",
  },
  {
    q: "What does the memory layer actually do?",
    a: "It tracks your brand voice, posting cadence, and per-platform performance over time. The journey page makes this visible: you can see what the app has learned, seeded publicly for trust. Your operator memory stays private behind auth.",
  },
  {
    q: "Is there an API?",
    a: "The Pro tier ($39/mo) includes API access. The app also ships with a check-platforms script for validating that all platform integrations are live before you schedule a campaign.",
  },
  {
    q: "What about self-hosting?",
    a: "Social Skills runs on Fly.io with a Cloudflare Tunnel. If you want to self-host, the repo is structured for it: standalone Next.js server, file-based store, no external database required for the demo workspace.",
  },
] as const;

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <>
      <SiteHeader authed={Boolean(user)} />
      <main className="relative">
        {/* ═══════════════════════════════════════════════════════════════
            HERO — full viewport, oversized lowercase wordmark
            (blumenkopf pattern: EST stamp + mask-reveal + scroll cue)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden pt-24 md:pt-28">
          <div className="container-wide w-full">
            <p className="reveal delay-1 text-xs uppercase tracking-[0.18em] text-muted">
              EST. 2025 &mdash; the cross-post desk
            </p>
          </div>

          {/* Oversized lowercase wordmark */}
          <div className="container-wide relative w-full">
            <div className="mask-reveal">
              <h1
                className="display lowercase"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 13rem)",
                  fontWeight: 500,
                  lineHeight: 0.82,
                  letterSpacing: "var(--tracking-tight)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
                  color: "var(--ink)",
                }}
              >
                dispatch
              </h1>
            </div>
          </div>

          {/* Bottom strip: tagline + scroll cue */}
          <div className="container-wide flex w-full items-end justify-between gap-6 pt-10">
            <p
              className="display max-w-md text-base font-light md:text-lg"
              style={{
                fontVariationSettings: '"opsz" 60, "SOFT" 20',
                color: "var(--ink)",
              }}
            >
              is no scheduler. with a memory layer that remembers what worked.
            </p>
            <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-muted">
              ( scroll )
            </p>
          </div>
          <div className="mt-8 border-t-2 border-ink" />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CREDIBILITY STRIP (wondermakers awards pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink py-8">
          <div className="container-wide flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-muted">
            <span className="font-medium text-ink">10 platforms</span>
            <span className="text-line">/</span>
            <span>Per-platform transforms</span>
            <span className="text-line">/</span>
            <span>Memory layer</span>
            <span className="text-line">/</span>
            <span>Open-source</span>
            <span className="text-line">/</span>
            <span>Self-hostable</span>
            <span className="text-line">/</span>
            <span>Analytics read-back</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            MANIFESTO — two-line mixed serif/sans (blumenkopf pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink px-5 py-24 md:px-10 md:py-36">
          <div className="container-wide">
            <div className="mask-reveal">
              <p
                className="editorial max-w-5xl"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  color: "var(--ink)",
                }}
              >
                We make tools
              </p>
            </div>
            <div className="mask-reveal mt-1">
              <p
                className="display-thin max-w-5xl"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                that hold up.
              </p>
            </div>

            <div className="mt-14 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 md:mt-20">
              <p
                className="editorial text-base leading-relaxed md:text-lg"
                style={{ color: "oklch(35% 0.010 55 / 0.85)" }}
              >
                Postiz is a scheduling UI with no memory of you. Post Bridge is
                an agent pipe with no human-facing surface. Social Skills makes
                the memory visible: your journey page shows what the app has
                learned about your brand voice, cadence, and top platform.
              </p>
              <p
                className="editorial text-base leading-relaxed md:text-lg"
                style={{ color: "oklch(35% 0.010 55 / 0.85)" }}
              >
                One caption enters the desk. Ten networks get their own
                transform applied. Results come back per account. The memory
                layer compounds. That is the whole product, and it works the
                first time you try it.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            MEGA TYPE — "what we dispatch" (wondermakers pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink px-5 py-16 md:px-10">
          <div className="container-wide">
            <h2 className="mega-type text-ink">what we dispatch</h2>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              The intersection of a clean compose surface and platform-specific
              intelligence. Each network gets its own transform before publish.
            </p>

            {/* Platform list (blumenkopf selected-work grid) */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-3">
              {PLATFORMS.map((p) => (
                <div
                  key={p.id}
                  className="group border-t border-ink/15 py-4 transition-colors hover:border-primary"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className="display text-xl font-medium text-ink md:text-2xl"
                      style={{ fontVariationSettings: '"opsz" 60, "SOFT" 20' }}
                    >
                      {p.label}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted">
                      <span
                        className="inline-block h-2 w-2"
                        style={{ background: p.color }}
                      />
                      {p.short}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={user ? "/dashboard" : "/signup"}
                className="display text-lg uppercase tracking-[0.18em] border-b border-ink pb-1 transition-opacity hover:opacity-60"
              >
                try the desk &#8594;
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            NUMBERED PILLARS — 12-col grid (wondermakers pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="how" className="border-b-2 border-ink px-5 py-20 md:px-10 md:py-28">
          <div className="container-wide">
            <div className="mb-16 grid gap-6 md:grid-cols-[auto_1fr] md:items-end">
              <p className="section-label">How it works</p>
              <h2
                className="display-thin max-w-2xl text-ink"
                style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
              >
                four moves.
              </h2>
            </div>

            <div>
              {PILLARS.map((p) => (
                <div key={p.n} className="pillar-row">
                  <div className="md:col-span-2">
                    <span
                      className="display text-4xl font-light tracking-tight md:text-5xl"
                      style={{
                        fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                        fontStyle: "italic",
                        color: "var(--primary)",
                      }}
                    >
                      {p.n}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <h3
                      className="display mb-3 text-ink md:mb-4"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                        fontWeight: 500,
                        fontVariationSettings: '"opsz" 144, "SOFT" 20',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SERVICES TEASER (wondermakers services pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="features" className="border-b-2 border-ink px-5 py-20 md:px-10 md:py-28">
          <div className="container-wide">
            <h2
              className="display-thin uppercase text-ink"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              what you get
            </h2>
            <p className="mt-6 max-w-xl text-sm text-muted md:text-base">
              From compose to analytics &mdash; full-scope delivery or targeted
              expertise. Everything the desk does, in one list.
            </p>

            <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {SERVICES.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-4 border-t border-ink/15 pt-4"
                >
                  <span className="text-sm tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base md:text-lg">{s}</span>
                </li>
              ))}
            </ol>

            <Link
              href={user ? "/dashboard" : "/signup"}
              className="mt-12 inline-block text-sm uppercase tracking-[0.18em] border-b border-ink pb-1 transition-opacity hover:opacity-60"
            >
              start free &#8594;
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CREDENTIAL QUOTE (alitwotimes pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink px-5 py-24 md:px-10 md:py-40">
          <div className="container-wide max-w-5xl">
            <blockquote
              className="display text-ink"
              style={{
                fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                lineHeight: 1.15,
                fontWeight: 500,
                fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
              }}
            >
              &ldquo;The first cross-post tool that remembers what worked. Not
              just a scheduler &mdash; a desk that compounds your voice across
              every network.&rdquo;
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted">
              the pitch, distilled
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STATS GRID (wondermakers pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink px-5 py-20 md:px-10 md:py-28">
          <div className="container-wide">
            <h2
              className="display-thin mb-12 uppercase text-ink"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              by the numbers
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={i}>
                  <p className="stat-numeral">{s.n}</p>
                  <p className="mt-2 text-sm text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PRICING — dark inverted CTA (reformcollective NOVA pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="pricing" className="dark-section px-5 py-24 md:px-10 md:py-32">
          <div className="container-wide">
            <p className="section-label mb-6">Pricing</p>
            <div className="mask-reveal">
              <h2
                className="display uppercase"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                  fontWeight: 300,
                  lineHeight: 1.3,
                  color: "var(--background)",
                  maxWidth: "48rem",
                  fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0',
                }}
              >
                free to start. $19 when you grow.
              </h2>
            </div>
            <p
              className="mt-8 max-w-2xl text-xs uppercase leading-relaxed md:text-sm"
              style={{ color: "oklch(72% 0.008 60)" }}
            >
              The demo workspace is free forever: seeded accounts, unlimited
              local posts, the full compose-and-dispatch flow. Creator is
              nineteen a month when you need more. No per-channel math.
            </p>

            {/* Tier list (blumenkopf line-divided pattern) */}
            <div className="mt-16 max-w-2xl">
              {[
                { name: "Starter", price: "$0", desc: "Demo workspace, seeded accounts, unlimited local posts." },
                { name: "Creator", price: "$19", desc: "15 accounts, caption assist, priority queue.", featured: true },
                { name: "Pro", price: "$39", desc: "Unlimited accounts, team seats, API access." },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className="flex items-baseline justify-between border-t py-5"
                  style={{ borderColor: "oklch(35% 0.008 60)" }}
                >
                  <div>
                    <span
                      className="display text-lg font-medium"
                      style={{
                        fontVariationSettings: '"opsz" 24, "SOFT" 20',
                        color: "var(--background)",
                      }}
                    >
                      {tier.name}
                    </span>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "oklch(65% 0.008 60)" }}
                    >
                      {tier.desc}
                    </p>
                  </div>
                  <span
                    className="display text-2xl font-bold"
                    style={{
                      color: tier.featured ? "var(--primary)" : "var(--background)",
                    }}
                  >
                    {tier.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/signup" className="btn btn-primary">
                Start free
              </Link>
              <Link
                href="/dashboard"
                className="btn btn-ghost"
                style={{ borderColor: "oklch(50% 0.008 60)", color: "var(--background)" }}
              >
                Try the demo
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            COMPARE TEASER
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink px-5 py-20 md:px-10 md:py-24">
          <div className="container-wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="section-label mb-3">Comparisons</p>
                <h2
                  className="display-thin text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  Honest side-by-sides.
                </h2>
              </div>
              <Link
                href="/compare"
                className="text-sm uppercase tracking-[0.18em] border-b border-ink/30 pb-1 transition-colors hover:border-primary hover:text-primary"
              >
                Full comparison hub &#8594;
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-px bg-line md:grid-cols-4">
              {competitors.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="block bg-background p-6 transition-colors hover:bg-primary-soft"
                >
                  <div
                    className="display mb-2 font-medium text-ink"
                    style={{
                      fontVariationSettings: '"opsz" 24, "SOFT" 20',
                      fontSize: "1.1rem",
                    }}
                  >
                    vs {c.name}
                  </div>
                  <p className="text-xs leading-relaxed text-muted">{c.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FAQ — <details> accordion (wondermakers pattern)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="border-b-2 border-ink px-5 py-20 md:px-10 md:py-28">
          <div className="container-wide max-w-3xl">
            <h2
              className="display-thin mb-12 uppercase text-ink"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              FAQ
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
            CLOSING — split-line mega type
        ═══════════════════════════════════════════════════════════════ */}
        <section className="px-5 py-24 md:px-10 md:py-36">
          <div className="container-wide max-w-4xl">
            <div className="split-line">
              <p
                className="display-thin text-ink"
                style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
              >
                stop babysitting tabs.
              </p>
            </div>
            <div className="split-line">
              <p
                className="editorial"
                style={{
                  fontSize: "clamp(2rem, 6vw, 5rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--primary)",
                }}
              >
                start shipping.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary">
                {user ? "Open desk" : "Start free"}
              </Link>
              <Link href="/journey" className="btn btn-ghost">
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
