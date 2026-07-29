import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { competitors } from "@/lib/competitors";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Compare Social Skills vs Buffer, Postiz, Post Bridge and more (2026)",
  description:
    "Side-by-side comparisons of Social Skills against Post Bridge, Postiz, Buffer, Publer, Later, Hootsuite, Typefully, and SocialBee. Features, pricing, and verdicts.",
  openGraph: {
    title: "Social Skills comparisons hub",
    description: "Find the best social media scheduling alternative for your workflow.",
  },
  alternates: { canonical: "/compare" },
};

export default async function CompareHubPage() {
  const user = await getSessionUser();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Social Skills comparisons",
    description: "Comparisons between Social Skills and other social media scheduling tools.",
    hasPart: competitors.map((c) => ({
      "@type": "WebPage",
      name: `Social Skills vs ${c.name}`,
      url: `/compare/${c.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader authed={Boolean(user)} />
      <main className="container-page py-14">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/">Home</Link> / <span className="text-ink">Compare</span>
        </nav>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink">Social Skills vs the field: social scheduling comparisons</h1>
        <p className="prose-mute mt-4 max-w-2xl text-lg">
          Searching for a Post Bridge alternative, Buffer alternative, or the best multi-platform poster in 2026? Start here. Every page includes pricing, features, FAQs, and a fair verdict.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {competitors.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="plush-card block p-6 transition hover:-translate-y-0.5 hover:border-yellow-400">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-azure-neon font-bold">Comparison</div>
              <h2 className="text-xl font-bold text-white">Social Skills vs {c.name}</h2>
              <p className="prose-mute mt-2 text-sm text-slate-300">{c.blurb}</p>
              <div className="mt-4 text-sm font-black text-wutang-metallic">Read comparison &rarr;</div>
            </Link>
          ))}
        </div>
        <div className="plush-card mt-12 p-8 text-center border-2 border-yellow-400/40">
          <h2 className="text-2xl font-black text-white">Try the core flow free</h2>
          <p className="prose-mute mx-auto mt-2 max-w-lg text-slate-300 text-sm font-medium">Compose once, pick accounts, publish with real platform rules — no credit card on the demo.</p>
          <Link href="/signup" className="btn-wutang mt-5 inline-block px-6 py-3 text-sm font-black">
            Open Social Skills &rarr;
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
