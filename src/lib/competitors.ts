export type Competitor = {
  slug: string;
  name: string;
  website: string;
  blurb: string;
  pricing: string;
  freeOption: string;
  platforms: string;
  api: string;
  selfHost: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  vsSocialSkills: string;
};

export const APP = {
  name: "Social Skills",
  tagline: "Ship once. Show up everywhere.",
  url: "https://socialskills.app",
  pricing: "Free to start · Creator $19/mo · Pro $39/mo",
  platforms: "10 major networks",
};

export const competitors: Competitor[] = [
  {
    slug: "post-bridge",
    name: "Post Bridge",
    website: "https://www.post-bridge.com",
    blurb: "Indie cross-poster with MCP, API add-on, and a content studio.",
    pricing: "$29–$99/mo + $5 API add-on",
    freeOption: "Limited free tier (~5 posts/mo)",
    platforms: "10 (X, IG, TT, YT, LI, FB, Pin, Threads, Bluesky, GMB)",
    api: "Yes ($5/mo add-on)",
    selfHost: "No",
    bestFor: "Creators who want hosted cross-post + AI agents via MCP",
    pros: ["Native MCP server", "Unlimited posts on paid plans", "Strong agent CLI/skill"],
    cons: ["Closed source", "API costs extra", "Fewer platforms than open tools"],
    vsSocialSkills:
      "Social Skills keeps the same core cross-post workflow with transparent local publishing rules (including X link stripping) and no API surcharge in this build.",
  },
  {
    slug: "postiz",
    name: "Postiz",
    website: "https://postiz.com",
    blurb: "Open-source agentic scheduler with 28+ channels and self-hosting.",
    pricing: "Cloud $29–$99/mo · self-host free (infra)",
    freeOption: "Self-host free; cloud trial",
    platforms: "28–30+",
    api: "Yes (included)",
    selfHost: "Yes (AGPL)",
    bestFor: "Teams needing Reddit/Discord/Telegram and full data control",
    pros: ["Open source", "Huge channel list", "CLI + agent ecosystem"],
    cons: ["Heavier ops if self-hosted", "Cloud channel caps"],
    vsSocialSkills:
      "Postiz wins on channel breadth; Social Skills wins on a simpler creator-first compose UX for the main 10 networks.",
  },
  {
    slug: "buffer",
    name: "Buffer",
    website: "https://buffer.com",
    blurb: "Veteran scheduler with a clean queue and strong brand trust.",
    pricing: "Free limited · Essentials from ~$6/channel/mo",
    freeOption: "Yes (limited channels/posts)",
    platforms: "~8–10 core networks",
    api: "Limited / partner",
    selfHost: "No",
    bestFor: "Individuals wanting a polished, familiar queue",
    pros: ["Polished UX", "Trusted brand", "Solid analytics add-ons"],
    cons: ["Per-channel pricing adds up", "Less agent-native"],
    vsSocialSkills:
      "Buffer is more mature analytically; Social Skills focuses on one-shot multi-account publish without per-channel math.",
  },
  {
    slug: "publer",
    name: "Publer",
    website: "https://publer.com",
    blurb: "Feature-dense scheduler with AI assist and bulk tools.",
    pricing: "From ~$12/workspace/mo (tiered)",
    freeOption: "Limited free plan",
    platforms: "Broad social set",
    api: "Yes (paid plans)",
    selfHost: "No",
    bestFor: "Power users who want bulk + AI inside one SaaS",
    pros: ["Bulk scheduling", "AI writing assists", "Competitor analysis tools"],
    cons: ["UI can feel dense", "Advanced features gated"],
    vsSocialSkills:
      "Publer is deeper for bulk marketing teams; Social Skills is faster for “caption + accounts + go.”",
  },
  {
    slug: "later",
    name: "Later",
    website: "https://later.com",
    blurb: "Visual-first planner popular with Instagram-led brands.",
    pricing: "From ~$16.67/mo (annual billing common)",
    freeOption: "Limited free",
    platforms: "IG-strong; multi-network",
    api: "Limited",
    selfHost: "No",
    bestFor: "Visual planners and link-in-bio workflows",
    pros: ["Visual calendar", "IG/TikTok focus", "Link in bio"],
    cons: ["Weaker for X/Bluesky-heavy workflows", "Post caps on lower tiers"],
    vsSocialSkills:
      "Later is stronger as a visual content calendar; Social Skills is stronger as a multi-network send button.",
  },
  {
    slug: "hootsuite",
    name: "Hootsuite",
    website: "https://www.hootsuite.com",
    blurb: "Enterprise social suite with inbox, compliance, and team workflows.",
    pricing: "From ~$99/user/mo",
    freeOption: "Trial only",
    platforms: "Enterprise set",
    api: "Enterprise",
    selfHost: "No",
    bestFor: "Large teams and regulated brands",
    pros: ["Team permissions", "Listening/inbox", "Enterprise support"],
    cons: ["Expensive", "Heavy for solo creators"],
    vsSocialSkills:
      "Hootsuite is the enterprise desk; Social Skills is the indie creator desk at a fraction of the complexity.",
  },
  {
    slug: "typefully",
    name: "Typefully",
    website: "https://typefully.com",
    blurb: "Writing-first tool built around X/LinkedIn drafts and analytics.",
    pricing: "Free limited · Pro from ~$12.50/mo",
    freeOption: "Yes",
    platforms: "Primarily X + LinkedIn",
    api: "Limited",
    selfHost: "No",
    bestFor: "Writers who live in long-form posts and threads",
    pros: ["Excellent editor", "Thread craft", "Analytics for writers"],
    cons: ["Not a full multi-network cross-poster"],
    vsSocialSkills:
      "Typefully wins for prose craft on X/LI; Social Skills wins when the same clip must hit IG, TikTok, and YouTube too.",
  },
  {
    slug: "socialbee",
    name: "SocialBee",
    website: "https://socialbee.com",
    blurb: "Category-based recycling scheduler for evergreen content.",
    pricing: "From ~$19/mo",
    freeOption: "Trial",
    platforms: "Major networks",
    api: "Limited",
    selfHost: "No",
    bestFor: "Evergreen content recycling by category",
    pros: ["Content categories", "Recycling queues", "Agency workspace options"],
    cons: ["Learning curve", "Less agent-first"],
    vsSocialSkills:
      "SocialBee is stronger for evergreen recycling; Social Skills is stronger for immediate multi-platform sends.",
  },
];

export function getCompetitor(slug: string) {
  return competitors.find((c) => c.slug === slug);
}
