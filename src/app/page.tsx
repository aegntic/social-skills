import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";
import { PLATFORMS } from "@/lib/platforms";
import { competitors } from "@/lib/competitors";

const platformRules: Record<string, string> = {
  twitter: "Links stripped automatically",
  instagram: "Media required",
  tiktok: "Title field supported",
  youtube: "Title field + video required",
  linkedin: "Long-form preserved",
  facebook: "No character limit",
  pinterest: "Title field supported",
  threads: "Conversation hook suggested",
  bluesky: "300 char limit enforced",
  google_business: "Local business formatted",
};

const steps = [
  {
    num: "01",
    title: "Compose",
    body: "Write your caption. Drop media if the platform needs it. The compose surface stays clean until you want more.",
    detail: "Per-platform overrides let you set a custom caption or title for YouTube without changing your X post. Same dispatch, different voice per network.",
  },
  {
    num: "02",
    title: "Dispatch",
    body: "Pick your accounts. Hit publish. Each platform gets its own transform applied: X strips links, Instagram validates media, Threads gets a question hook.",
    detail: "Results come back per account. Success, failure, published URL. If something breaks, you see exactly which platform and why.",
  },
  {
    num: "03",
    title: "Remember",
    body: "The app learns your voice over time. Brand tone, posting cadence, which platform performs best. The memory layer is the differentiator.",
    detail: "Journey shows what the app has learned, publicly seeded for trust. Your operator memory stays private behind auth.",
  },
];

const faqs = [
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
];

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <>
      <SiteHeader authed={Boolean(user)} />
      <main>
        {/* ─── Hero ─── */}
        <section className="hero-section">
          <div className="hero-grid-bg" />
          <div className="container-page relative">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-3xl">
                <p className="section-label reveal delay-1 mb-6">
                  Social Skills &mdash; the cross-post desk
                </p>
                {/* Mixed-type headline: Fraunces + Newsreader pairing */}
                <h1
                  className="display reveal delay-2"
                  style={{
                    fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  Write once.
                  <br />
                  <span className="editorial" style={{ fontWeight: 300 }}>
                    Show up
                  </span>{" "}
                  <em>everywhere.</em>
                </h1>
                <p
                  className="reveal delay-3 mt-8 max-w-xl text-lg leading-relaxed text-muted"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                >
                  One caption. Ten networks. Zero tab chaos. The first cross-post desk
                  with a memory layer that learns your voice and remembers what worked.
                </p>
                <div className="reveal delay-4 mt-10 flex flex-wrap items-center gap-4">
                  <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary">
                    {user ? "Open desk" : "Start free"}
                  </Link>
                  <Link href="/#how" className="btn-link">
                    See how it works
                  </Link>
                </div>
                <p className="reveal delay-5 mt-6 text-sm text-muted">
                  Demo:{" "}
                  <span className="font-medium text-ink">demo@socialskills.app</span>
                  {" "}/{" "}
                  <span className="font-medium text-ink">demo1234</span>
                </p>
              </div>
              <div className="reveal-fade delay-4 hidden md:block">
                <div
                  className="display text-ink/15"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 7rem)",
                    fontWeight: 900,
                    lineHeight: 0.85,
                    fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
                    fontStyle: "italic",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  dispatch
                </div>
              </div>
            </div>

            {/* Dispatch strip */}
            <div className="reveal delay-5 mt-14">
              <div className="dispatch-strip">
                <div className="dispatch-caption">
                  Shipped a cleaner cross-post flow today. One caption, ten platforms,
                  zero tab chaos.
                </div>
                <div className="dispatch-platforms">
                  {PLATFORMS.slice(0, 7).map((p) => (
                    <div key={p.id} className="dispatch-row">
                      <span className="dispatch-dot" style={{ background: p.color }} />
                      <span className="font-semibold text-ink">{p.short}</span>
                      <span className="text-muted">{platformRules[p.id]}</span>
                      <span className="ml-auto text-xs font-semibold text-foreground/40">
                        sent
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Credibility strip (wondermakers awards pattern) ─── */}
        <section className="border-b border-line py-8">
          <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted">
            <span className="font-medium text-ink">10 platforms</span>
            <span className="text-line">/</span>
            <span>Per-platform transforms</span>
            <span className="text-line">/</span>
            <span>Memory layer</span>
            <span className="text-line">/</span>
            <span>Open-source</span>
            <span className="text-line">/</span>
            <span>Self-hostable</span>
          </div>
        </section>

        {/* ─── How it works — 12-col numbered grid (wondermakers pattern) ─── */}
        <section id="how" className="border-b border-line py-20 md:py-28">
          <div className="container-page">
            <div className="mb-16 grid gap-6 md:grid-cols-[auto_1fr] md:items-end">
              <p className="section-label">How it works</p>
              <h2
                className="display-thin max-w-2xl text-ink"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
              >
                Three moves.{" "}
                <span className="editorial" style={{ color: "var(--primary)", fontStyle: "italic" }}>
                  That&apos;s the whole tool.
                </span>
              </h2>
            </div>

            {/* 12-col grid: col-span-2 numeral + col-span-10 content */}
            <div className="space-y-0">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="grid grid-cols-1 gap-4 border-t-2 border-ink py-10 md:grid-cols-12 md:gap-8"
                >
                  <div className="md:col-span-2">
                    <span className="editorial-numeral">{step.num}</span>
                  </div>
                  <div className="md:col-span-10">
                    <h3
                      className="display mb-4 text-ink"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                    <p className="max-w-lg text-xs leading-relaxed text-muted/70">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Credential quote (alitwotimes pattern) ─── */}
        <section className="border-b border-line py-24 md:py-36">
          <div className="container-page max-w-4xl">
            <blockquote
              className="editorial text-ink"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
                lineHeight: 1.25,
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              &ldquo;The first cross-post tool that remembers what worked. Not just a
              scheduler &mdash; a desk that compounds your voice across every
              network.&rdquo;
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted">
              The pitch, distilled
            </p>
          </div>
        </section>

        {/* ─── Features — editorial, not card grid ─── */}
        <section id="features" className="border-b border-line py-20 md:py-28">
          <div className="container-page">
            <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
              <div>
                <p className="section-label mb-4">Why this exists</p>
                <h2
                  className="display-thin text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Most tools forget you the moment you hit{" "}
                  <span className="editorial" style={{ fontStyle: "italic", color: "var(--primary)" }}>
                    post.
                  </span>
                </h2>
              </div>
              <div className="max-w-xl space-y-8">
                <p
                  className="editorial text-ink"
                  style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)", lineHeight: 1.65, fontWeight: 400 }}
                >
                  Postiz is a scheduling UI with no memory of you. Post Bridge is an agent
                  pipe with no human-facing surface. Social Skills makes the memory{" "}
                  <em className="display-italic font-semibold">visible</em>: your journey
                  page shows what the app has learned about your brand voice, cadence, and
                  top platform.
                </p>
                <div className="flex gap-12">
                  <div>
                    <div className="stat-figure">10</div>
                    <p className="mt-2 text-sm text-muted">platforms supported</p>
                  </div>
                  <div>
                    <div className="stat-figure">30s</div>
                    <p className="mt-2 text-sm text-muted">from compose to published</p>
                  </div>
                  <div>
                    <div className="stat-figure">
                      <em
                        className="display-italic"
                        style={{ fontWeight: 500, color: "var(--primary)" }}
                      >
                        0
                      </em>
                    </div>
                    <p className="mt-2 text-sm text-muted">tabs to manage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Platforms — mega type heading (wondermakers pattern) ─── */}
        <section id="platforms" className="border-b border-line bg-card py-20 md:py-28">
          <div className="container-page">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="section-label mb-4">Platforms</p>
                <h2 className="mega-type text-ink">
                  ten networks
                </h2>
              </div>
              <p className="hidden max-w-xs text-sm text-muted sm:block">
                Each platform gets its own transform. Hover to see the rule.
              </p>
            </div>

            <div className="platform-poster">
              {PLATFORMS.map((p) => (
                <div key={p.id} className="platform-poster-item">
                  {p.label}
                  <span className="platform-rule">{platformRules[p.id]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing — dark inverted CTA section (reformcollective pattern) ─── */}
        <section id="pricing" className="dark-section py-20 md:py-28">
          <div className="container-page">
            <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-20">
              <div>
                <p className="section-label mb-6">Pricing</p>
                {/* Mixed-type: Fraunces + editorial italic pairing */}
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--background)",
                  }}
                >
                  Free to start.
                  <br />
                  <span className="editorial" style={{ fontStyle: "italic", color: "var(--primary)" }}>
                    $19/mo
                  </span>{" "}
                  when you grow.
                </h2>
                <p
                  className="mt-8 max-w-md text-lg leading-relaxed"
                  style={{ color: "oklch(72% 0.008 60)" }}
                >
                  The demo workspace is free forever: seeded accounts, unlimited local
                  posts, the full compose-and-dispatch flow. When you need more accounts or
                  caption assist, Creator is nineteen a month. No per-channel math.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/signup" className="btn btn-primary">
                    Start free
                  </Link>
                  <Link href="/dashboard" className="btn btn-ghost">
                    Try the demo
                  </Link>
                </div>
              </div>
              <div className="space-y-px border-l pl-8" style={{ borderColor: "oklch(40% 0.008 60)" }}>
                <div className="border-b pb-5" style={{ borderColor: "oklch(35% 0.008 60)" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="display text-lg font-semibold" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20', color: "var(--background)" }}>
                      Starter
                    </span>
                    <span className="display text-2xl font-bold" style={{ color: "var(--background)" }}>$0</span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "oklch(65% 0.008 60)" }}>
                    Demo workspace, seeded accounts, unlimited local posts.
                  </p>
                </div>
                <div className="border-b py-5" style={{ borderColor: "oklch(35% 0.008 60)" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="display text-lg font-semibold" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20', color: "var(--background)" }}>
                      Creator
                    </span>
                    <span className="display text-2xl font-bold" style={{ color: "var(--primary)" }}>
                      $19
                    </span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "oklch(65% 0.008 60)" }}>
                    15 accounts, caption assist, priority queue.
                  </p>
                </div>
                <div className="pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="display text-lg font-semibold" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20', color: "var(--background)" }}>
                      Pro
                    </span>
                    <span className="display text-2xl font-bold" style={{ color: "var(--background)" }}>$39</span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "oklch(65% 0.008 60)" }}>
                    Unlimited accounts, team seats, API access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Compare teaser ─── */}
        <section className="border-b border-line py-20 md:py-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="section-label mb-3">Comparisons</p>
                <h2
                  className="display-thin text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  Honest side-by-sides for{" "}
                  <span className="editorial" style={{ fontStyle: "italic" }}>
                    people searching in 2026.
                  </span>
                </h2>
              </div>
              <Link href="/compare" className="btn-link">
                Full comparison hub
              </Link>
            </div>
            <div className="mt-10 grid gap-px bg-line md:grid-cols-4">
              {competitors.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="block bg-background p-6 transition-colors hover:bg-primary-soft"
                >
                  <div
                    className="display mb-2 font-semibold text-ink"
                    style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20', fontSize: "1.1rem" }}
                  >
                    vs {c.name}
                  </div>
                  <p className="text-xs leading-relaxed text-muted">{c.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ (wondermakers <details> pattern) ─── */}
        <section className="border-b border-line py-20 md:py-28">
          <div className="container-page max-w-3xl">
            <h2
              className="display-thin mb-12 text-ink"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              FAQ
            </h2>
            <div>
              {faqs.map((faq) => (
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

        {/* ─── Closing — split-line mega type ─── */}
        <section className="py-24 md:py-36">
          <div className="container-page text-center">
            <div className="split-line mx-auto max-w-3xl">
              <p
                className="display-thin text-ink"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Stop babysitting tabs.
              </p>
            </div>
            <div className="split-line mx-auto max-w-3xl">
              <p
                className="editorial text-ink"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--primary)",
                }}
              >
                Start shipping.
              </p>
            </div>
            <div className="mt-10 flex justify-center gap-4">
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
