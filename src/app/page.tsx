import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";
import { PLATFORMS } from "@/lib/platforms";
import { competitors } from "@/lib/competitors";

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <>
      <SiteHeader authed={Boolean(user)} />
      <main>
        <section className="hero-grid border-b border-line">
          <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="badge mb-4">Social Skills · ship once · show up everywhere</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                The social skill that compounds: post everywhere from one desk
              </h1>
              <p className="prose-mute mt-5 max-w-xl text-lg">
                Publish in 30 seconds, not 30 minutes. One caption, optional media, every connected network — with real per-platform validation built in.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary">
                  {user ? "Open desk" : "Start free"}
                </Link>
                <Link href="/compare" className="btn btn-ghost">
                  See comparisons
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">Demo login: demo@socialskills.app / demo1234</p>
            </div>
            <div className="card overflow-hidden p-0">
              <div className="border-b border-line bg-[#0f291e] px-5 py-3 text-sm text-emerald-100">Compose · multi-account</div>
              <div className="space-y-3 p-5">
                <div className="rounded-xl border border-line bg-[#f8fbf9] p-4 text-sm text-ink">
                  Shipped a cleaner cross-post flow today. One caption, ten platforms, zero tab chaos. #buildinpublic
                </div>
                <div className="flex flex-wrap gap-2">
                  {["X", "IG", "TT", "YT", "LI"].map((p) => (
                    <span key={p} className="badge">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-primary-soft p-3 font-semibold text-primary-dark">Post now</div>
                  <div className="rounded-xl border border-line p-3 text-muted">Schedule</div>
                  <div className="rounded-xl border border-line p-3 text-muted">Draft</div>
                </div>
                <div className="rounded-xl bg-ink px-4 py-3 text-center text-sm font-semibold text-white">Publish to selected accounts</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container-page py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-ink">Cross-posting that just works</h2>
            <p className="prose-mute mt-3">The core job: upload once, pick accounts, publish or queue. Everything else supports that moment.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Post to all platforms instantly",
                d: "Manage personal and brand accounts without switching apps. One click fans out with independent per-network results.",
              },
              {
                t: "Schedule posts effortlessly",
                d: "Queue for later, save drafts, or fire immediately. Due items process the next time you open the desk.",
              },
              {
                t: "Platform-aware validation",
                d: "Instagram needs media, YouTube needs video, X strips links from captions — the same gotchas as production tools.",
              },
            ].map((f) => (
              <article key={f.t} className="card p-6">
                <h3 className="mb-2 text-lg font-semibold text-ink">{f.t}</h3>
                <p className="prose-mute text-sm">{f.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="platforms" className="border-y border-line bg-white py-16">
          <div className="container-page">
            <h2 className="mb-8 text-center text-3xl font-bold text-ink">10 social platforms supported</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {PLATFORMS.map((p) => (
                <div key={p.id} className="card flex items-center gap-3 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: p.color }}>
                    {p.short}
                  </span>
                  <span className="text-sm font-medium">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="container-page py-16 md:py-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-ink">Simple pricing energy</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              { name: "Starter", price: "$0", d: "Demo workspace · seeded accounts · unlimited local posts" },
              { name: "Creator", price: "$19", d: "15 accounts · caption assist · priority queue (roadmap)" },
              { name: "Pro", price: "$39", d: "Unlimited accounts · team seats · API keys (roadmap)" },
            ].map((plan, i) => (
              <div key={plan.name} className={`card p-6 ${i === 1 ? "border-primary shadow-lg shadow-emerald-100" : ""}`}>
                <div className="text-sm font-semibold text-primary-dark">{plan.name}</div>
                <div className="mt-2 text-3xl font-bold text-ink">
                  {plan.price}
                  <span className="text-base font-medium text-muted">/mo</span>
                </div>
                <p className="prose-mute mt-3 text-sm">{plan.d}</p>
                <Link href="/signup" className={`btn mt-5 w-full ${i === 1 ? "btn-primary" : "btn-ghost"}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-white py-16">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-ink">Compare Social Skills</h2>
                <p className="prose-mute mt-2">Honest side-by-sides for people searching alternatives in 2026.</p>
              </div>
              <Link href="/compare" className="btn btn-ghost">
                Full hub
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {competitors.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/compare/${c.slug}`} className="card block p-5 transition hover:-translate-y-0.5 hover:border-primary">
                  <div className="mb-2 font-semibold text-ink">Social Skills vs {c.name}</div>
                  <p className="text-sm text-muted">{c.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
