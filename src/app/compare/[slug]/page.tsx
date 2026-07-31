import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { APP, competitors, getCompetitor } from "@/lib/competitors";
import { getSessionUser } from "@/lib/auth";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  const title = `Social Skills vs ${c.name}: features, pricing and which is better in 2026`;
  const description = `Compare Social Skills and ${c.name} on platforms, pricing, API, self-hosting, and ease of use. Is Social Skills a good ${c.name} alternative?`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    alternates: { canonical: `/compare/${c.slug}` },
    keywords: [
      `${c.name} alternative`,
      `Social Skills vs ${c.name}`,
      `${c.name} vs Social Skills`,
      "best social media scheduling tool",
      `${c.name} alternatives`,
    ],
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();
  const user = await getSessionUser();

  const faqs = [
    {
      q: `Is Social Skills a good ${c.name} alternative?`,
      a: `Yes if you want a simple multi-network compose desk focused on the main creator platforms. ${c.name} may still win if you need ${c.bestFor.toLowerCase()}.`,
    },
    {
      q: `${c.name} vs Social Skills — which is better?`,
      a: `Neither is universally better. Social Skills is stronger for fast cross-posting with transparent platform rules; ${c.name} is stronger for ${c.bestFor.toLowerCase()}.`,
    },
    {
      q: `Does Social Skills replace ${c.name}?`,
      a: `For cross-posting and scheduling on the core 10 networks, Social Skills covers the main job. It does not claim feature parity with every enterprise or open-source suite.`,
    },
    {
      q: `What about pricing: Social Skills vs ${c.name}?`,
      a: `Social Skills demo is free; listed creator pricing starts around $19/mo. ${c.name}: ${c.pricing}.`,
    },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "/compare" },
      { "@type": "ListItem", position: 3, name: `vs ${c.name}`, item: `/compare/${c.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Social Skills",
    description: APP.tagline,
    brand: { "@type": "Brand", name: "Social Skills" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free demo workspace",
    },
  };

  const others = competitors.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <SiteHeader authed={Boolean(user)} />
      <main className="container-page py-12 md:py-14">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/">Home</Link> / <Link href="/compare">Compare</Link> / <span className="text-ink">{c.name}</span>
        </nav>

        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
          Social Skills vs {c.name}: features, pricing and which is better in 2026
        </h1>
        <p className="prose-mute mt-5 max-w-3xl text-lg">
          {c.name} is {c.blurb} Social Skills is a creator-first cross-poster for ten major networks with a working compose → validate → publish desk.
          {" "}
          {c.vsSocialSkills}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className="btn-wutang px-6 py-3 text-xs font-black inline-flex">
            Try Social Skills free &rarr;
          </Link>
          <a href={c.website} className="btn-dark px-5 py-3 text-xs font-bold inline-flex" target="_blank" rel="noreferrer">
            Visit {c.name}
          </a>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-black text-ink">Side-by-side comparison</h2>
          <div className="table-wrap plush-card p-6 overflow-x-auto">
            <table className="compare w-full text-left text-sm text-slate-200">
              <thead>
                <tr className="border-b border-slate-700 text-azure-neon font-black">
                  <th className="py-3 px-4">Criteria</th>
                  <th className="py-3 px-4">Social Skills</th>
                  <th className="py-3 px-4">{c.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  ["Core job", "One caption → many accounts", c.blurb],
                  ["Pricing", APP.pricing, c.pricing],
                  ["Free option", "Yes — full demo workspace", c.freeOption],
                  ["Platforms", APP.platforms, c.platforms],
                  ["API / agents", "Local REST in this build; caption assist", c.api],
                  ["Self-host", "Runnable codebase (this app)", c.selfHost],
                  ["Best for", "Fast multi-network sends with clear validation", c.bestFor],
                  ["Ease of use", "Single compose desk, few screens", "Varies — see pros/cons"],
                  ["Speed to first post", "Minutes with seeded accounts", "Account connect + plan setup"],
                ].map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="py-3 px-4 font-bold text-white">{k}</td>
                    <td className="py-3 px-4 text-slate-300 font-medium">{a}</td>
                    <td className="py-3 px-4 text-slate-400 font-medium">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="plush-card p-6">
            <h2 className="text-xl font-bold text-ink">Social Skills pros</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Compose once with multi-select accounts</li>
              <li>Real per-platform validation (media rules, X link strip)</li>
              <li>Schedule, draft, and publish results in one place</li>
              <li>No per-channel pricing in the product story</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-ink">{c.name} pros</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {c.pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <h3 className="mt-5 font-semibold text-ink">Tradeoffs</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
              {c.cons.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="card mt-12 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-ink">Verdict</h2>
          <p className="prose-mute mt-3">
            Choose <strong>Social Skills</strong> when the job is shipping the same creative to several mainstream networks without enterprise overhead.
            Choose <strong>{c.name}</strong> when you specifically need: {c.bestFor}.
            This page favors Social Skills on simplicity and cross-post clarity, without inventing fake flaws in {c.name}.
          </p>
          <Link href="/signup" className="btn btn-primary mt-6">
            Start with Social Skills
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-ink">FAQ</h2>
          <div className="grid gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
                <p className="prose-mute mt-3 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-ink">Related comparisons</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/compare" className="badge">
              All comparisons
            </Link>
            {others.map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}`} className="badge badge-muted">
                vs {o.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
