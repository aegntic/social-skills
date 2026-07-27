"use client";

import { DoomscrollHero } from "@/components/DoomscrollHero";
import { SiteHeader, SiteFooter } from "@/components/Shell";

export default function WhyAreYouLikeThisPage() {
  return (
    <>
      <SiteHeader authed={false} />
      <main className="relative min-h-screen">
        <DoomscrollHero />
      </main>
      <SiteFooter />
    </>
  );
}