# 🌌 Social Skills — Google Stitch Full Project Manifest

> Complete project export containing all **61 pages**, **13 components**, and full Obsidian Dark design tokens for import into **Google Stitch**.

---

## 🎨 Design System & Theme Tokens

- **Base Background**: `#0b0d14` (Obsidian Dark Studio)
- **Card Container**: `#151924` (Plush Slate)
- **Primary CTA**: `#ffc800` (Wu-Tang Yellow Metallic)
- **Secondary CTA**: `#00f0ff` (Azure Cyan Neon)

---

## 📄 Exported Pages & Routes (61 total)

### 🔗 Route: `/` (`src/app/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { ComposeDeskMockup } from "@/components/ComposeDeskMockup";
import { InteractiveBroadcastEngine } from "@/components/InteractiveBroadcastEngine";...
```

---

### 🔗 Route: `/affiliates` (`src/app/affiliates/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";

export default function AffiliatesPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <header className="sticky top-...
```

---

### 🔗 Route: `/api/accounts/route.ts` (`src/app/api/accounts/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createAccounts, deleteAccount, readDb } from "@/lib/store";
import type { Platform } from "@/lib/types";

const KNOWN_PLATFORMS = new Set<Platform>([
  "twitter",
  "instagram",
  "tiktok",
  "youtube",...
```

---

### 🔗 Route: `/api/auth/logout/route.ts` (`src/app/api/auth/logout/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
...
```

---

### 🔗 Route: `/api/auth/route.ts` (`src/app/api/auth/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession, createUser, readDb, verifyPassword } from "@/lib/store";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
   ...
```

---

### 🔗 Route: `/api/caption/route.ts` (`src/app/api/caption/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

/**
 * Real caption assistant: uses OpenAI-compatible APIs when keyed,
 * otherwise a deterministic multi-platform rewriter (still functional, not a stub response).
 */
export async function POST(req: Request) ...
```

---

### 🔗 Route: `/api/journey/operator/route.ts` (`src/app/api/journey/operator/route.ts`)

```tsx
// Operator-only: returns the agent's gbrain memory graph. Never exposed to
// unauthenticated callers — this is operator brain state, not product memory.
import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";
import { getSessionUs...
```

---

### 🔗 Route: `/api/journey/route.ts` (`src/app/api/journey/route.ts`)

```tsx
// Public, unauthenticated journey surface. Serves curated product memory +
// an illustrative demo account — never operator gbrain (that lives at
// /api/journey/operator). Reuses applyHygiene() (COS v3) on the seeds.
import { NextResponse } from "next/server";
import { getJourneyMemory } from "@/l...
```

---

### 🔗 Route: `/api/me/route.ts` (`src/app/api/me/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { processDuePosts, readDb } from "@/lib/store";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  a...
```

---

### 🔗 Route: `/api/posts/analytics/route.ts` (`src/app/api/posts/analytics/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { aggregatePostMetrics, readDb, syncPostMetrics } from "@/lib/store";

/**
 * Per-platform post-results analytics. Schema borrowed from Post Bridge's
 * `/v1/analytics` + `/v1/post-results`: every publish...
```

---

### 🔗 Route: `/api/posts/route.ts` (`src/app/api/posts/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createPost, processDuePosts, readDb, mutateDb } from "@/lib/store";
import type { Platform, PlatformOverride } from "@/lib/types";

export async function GET() {
  const user = await getSessionUser();
 ...
```

---

### 🔗 Route: `/api/upload/route.ts` (`src/app/api/upload/route.ts`)

```tsx
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { saveUpload } from "@/lib/store";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  ...
```

---

### 🔗 Route: `/compare` (`src/app/compare/page.tsx`)

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { competitors } from "@/lib/competitors";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Compare Social Skills vs Buffe...
```

---

### 🔗 Route: `/compare/[slug]` (`src/app/compare/[slug]/page.tsx`)

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { APP, competitors, getCompetitor } from "@/lib/competitors";
import { getSessionUser } from "@/lib/auth";

type Props =...
```

---

### 🔗 Route: `/dashboard` (`src/app/dashboard/page.tsx`)

```tsx
import { DashboardApp } from "@/components/DashboardApp";
import { getSessionUser } from "@/lib/auth";
import { hasAccounts } from "@/lib/store";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  description: "Compose, schedule, and review multi-platform ...
```

---

### 🔗 Route: `/dashboard/analytics` (`src/app/dashboard/analytics/page.tsx`)

```tsx
"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function AnalyticsPage() {
  return (
    <DashboardShell title="Analytics Overview">
      <div className="space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-c...
```

---

### 🔗 Route: `/dashboard/api-keys` (`src/app/dashboard/api-keys/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState("ss_live_9f83a2d1e04b78c93a401b");
  const [copied, setCopied] = useState(false);
  const [credits, se...
```

---

### 🔗 Route: `/dashboard/bulk-tools` (`src/app/dashboard/bulk-tools/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkToolsHubPage() {
  return (
    <DashboardShell title="Bulk Tools">
      <div className="space-y-8">
        <div className="grid grid-c...
```

---

### 🔗 Route: `/dashboard/connections` (`src/app/dashboard/connections/page.tsx`)

```tsx
"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function ConnectionsPage() {
  return (
    <DashboardShell title="Connected Social Accounts">
      <div classN...
```

---

### 🔗 Route: `/dashboard/content-studio` (`src/app/dashboard/content-studio/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function ContentStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [videoText, setV...
```

---

### 🔗 Route: `/dashboard/create` (`src/app/dashboard/create/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardCreateHubPage() {
  return (
    <DashboardShell title="Create a new post">
      <div className="space-y-8">
        <div className...
```

---

### 🔗 Route: `/dashboard/create/bulk/image-upload` (`src/app/dashboard/create/bulk/image-upload/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkImageUploadPage() {
  return (
    <DashboardShell title="Bulk Image Upload">
      <div className="max-w-4xl mx-auto space-y-8">
       ...
```

---

### 🔗 Route: `/dashboard/create/bulk/video-creation` (`src/app/dashboard/create/bulk/video-creation/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkVideoCreationPage() {
  const [template, setTemplate] = useState("2x2_grid");
  const [script, setScript] = useState("");

...
```

---

### 🔗 Route: `/dashboard/create/bulk/video-upload` (`src/app/dashboard/create/bulk/video-upload/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function BulkVideoUploadPage() {
  return (
    <DashboardShell title="Bulk Video Upload">
      <div className="max-w-4xl mx-auto space-y-8">
       ...
```

---

### 🔗 Route: `/dashboard/create/text` (`src/app/dashboard/create/text/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function CreateTextPostPage() {
  const [caption, setCaption] = useS...
```

---

### 🔗 Route: `/dashboard/posts` (`src/app/dashboard/posts/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function AllPostsPage() {
  return (
    <DashboardShell title="All Posts">
      ...
```

---

### 🔗 Route: `/dashboard/posts/calendar` (`src/app/dashboard/posts/calendar/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";

export default function CalendarPage() {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <DashboardShell title="Content Calendar">...
```

---

### 🔗 Route: `/dashboard/posts/scheduled` (`src/app/dashboard/posts/scheduled/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function ScheduledPostsPage() {
  return (
    <DashboardShell title="Scheduled Po...
```

---

### 🔗 Route: `/dashboard/settings` (`src/app/dashboard/settings/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function SettingsPage() {
  const [mcpUrl, setMcpUrl] = useState("http://localhost:3456/api/mcp");
  const [use24Hour, setUse24Hour] = useState(false);

  return (
  ...
```

---

### 🔗 Route: `/dashboard/teams` (`src/app/dashboard/teams/page.tsx`)

```tsx
"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function TeamsPage() {
  return (
    <DashboardShell title="Team Workspaces">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
       ...
```

---

### 🔗 Route: `/globals.css` (`src/app/globals.css`)

```tsx
@import "tailwindcss";

:root {
  /* Sleek Obsidian Dark Studio Base */
  --bg-page: #0b0d14;
  --bg-page-gradient: linear-gradient(180deg, #0b0d14 0%, #0f131d 50%, #131722 100%);
  
  /* Deep Obsidian Slate Plush Cards */
  --bg-card: #151924;
  --bg-card-hover: #1c2232;
  --bg-surface: #1c2232;
  ...
```

---

### 🔗 Route: `/growth-guide` (`src/app/growth-guide/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";

export default function GrowthGuideMainPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <he...
```

---

### 🔗 Route: `/growth-guide/account-creation` (`src/app/growth-guide/account-creation/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function AccountCreationPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="te...
```

---

### 🔗 Route: `/growth-guide/account-warmup` (`src/app/growth-guide/account-warmup/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function AccountWarmupPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text...
```

---

### 🔗 Route: `/growth-guide/content-market-fit` (`src/app/growth-guide/content-market-fit/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function ContentMarketFitPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="t...
```

---

### 🔗 Route: `/growth-guide/riding-trends` (`src/app/growth-guide/riding-trends/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function RidingTrendsPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-...
```

---

### 🔗 Route: `/growth-guide/scaling-system` (`src/app/growth-guide/scaling-system/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function ScalingSystemPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text...
```

---

### 🔗 Route: `/growth-guide/start-here` (`src/app/growth-guide/start-here/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function StartHerePage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="text-xs ...
```

---

### 🔗 Route: `/growth-guide/views-to-customers` (`src/app/growth-guide/views-to-customers/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { GrowthGuideLayout } from "@/components/GrowthGuideLayout";

export default function ViewsToCustomersPage() {
  return (
    <GrowthGuideLayout>
      <div className="space-y-8">
        <div>
          <div className="t...
```

---

### 🔗 Route: `/journey` (`src/app/journey/page.tsx`)

```tsx
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Shell";

export const metadata = {
  title: "Journey — what Social Skills learns about your account",
  description:
    "See the memory layer that makes Social Skills different: the patterns, brand voice, and cadence...
```

---

### 🔗 Route: `/layout.tsx` (`src/app/layout.tsx`)

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ...
```

---

### 🔗 Route: `/login` (`src/app/login/page.tsx`)

```tsx
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { AuthForm } from "@/components/AuthForm";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Log in",
  description: "Log in to Social Skills and publish ac...
```

---

### 🔗 Route: `/onboarding` (`src/app/onboarding/page.tsx`)

```tsx
import { getSessionUser } from "@/lib/auth";
import { hasAccounts } from "@/lib/store";
import { OnboardingForm } from "@/components/OnboardingForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Set up your accounts",
  description: "Connect the social platforms y...
```

---

### 🔗 Route: `/onboarding/connect` (`src/app/onboarding/connect/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import { SiteHeader, SiteFooter } from "@/components/Shell";

const CONNECTED_DEFAULTS = [
  { platform: "twitter", handle: "@aegntix", name: "Twi...
```

---

### 🔗 Route: `/onboarding/plans` (`src/app/onboarding/plans/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";

export default function OnboardingPlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <di...
```

---

### 🔗 Route: `/onboarding/start` (`src/app/onboarding/start/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";

const PERSONAS = [
  { id: "founder", title: "Founder", desc: "Building a startup or SaaS business" },
  { id: "creator", title: "Creator", desc: "Growi...
```

---

### 🔗 Route: `/robots.ts` (`src/app/robots.ts`)

```tsx
import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3456";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/"],
    },
    sitemap:...
```

---

### 🔗 Route: `/signup` (`src/app/signup/page.tsx`)

```tsx
import { SiteFooter, SiteHeader } from "@/components/Shell";
import { AuthForm } from "@/components/AuthForm";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign up",
  description: "Create a Social Skills account and st...
```

---

### 🔗 Route: `/sitemap.ts` (`src/app/sitemap.ts`)

```tsx
import type { MetadataRoute } from "next";
import { competitors } from "@/lib/competitors";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3456";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site}/`, lastModified:...
```

---

### 🔗 Route: `/thank-you` (`src/app/thank-you/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="flex items-center justify-center p-6 relative overflow-hidden">
   ...
```

---

### 🔗 Route: `/tools` (`src/app/tools/page.tsx`)

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

const TOOLS_LIST = [
  {
    slug: "instagram-grid-maker",
    name: "Instagram Grid Maker",
    d...
```

---

### 🔗 Route: `/tools/instagram-carousel-splitter` (`src/app/tools/instagram-carousel-splitter/page.tsx`)

```tsx
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function CarouselSplitterPage() {
  const [slidesCount, setSl...
```

---

### 🔗 Route: `/tools/instagram-grid-maker` (`src/app/tools/instagram-grid-maker/page.tsx`)

```tsx
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function InstagramGridMakerPage() {
  const [gridSize, setGri...
```

---

### 🔗 Route: `/tools/instagram-handle-checker` (`src/app/tools/instagram-handle-checker/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function InstagramHandleCheckerPage() {
  const [handle, setHandle] =...
```

---

### 🔗 Route: `/tools/linkedin-text-formatter` (`src/app/tools/linkedin-text-formatter/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function LinkedInTextFormatterPage() {
  const [text, setText] = useS...
```

---

### 🔗 Route: `/tools/tiktok-caption-generator` (`src/app/tools/tiktok-caption-generator/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function TikTokCaptionGeneratorPage() {
  const [topic, setTopic] = u...
```

---

### 🔗 Route: `/tools/tiktok-username-checker` (`src/app/tools/tiktok-username-checker/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function TikTokUsernameCheckerPage() {
  const [username, setUsername...
```

---

### 🔗 Route: `/tools/timeline-blocker-x` (`src/app/tools/timeline-blocker-x/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function TimelineBlockerXPage() {
  const [hideFeed, setHideFeed] = u...
```

---

### 🔗 Route: `/tools/youtube-tag-generator` (`src/app/tools/youtube-tag-generator/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function YouTubeTagGeneratorPage() {
  const [keyword, setKeyword] = ...
```

---

### 🔗 Route: `/tools/youtube-title-checker` (`src/app/tools/youtube-title-checker/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function YouTubeTitleCheckerPage() {
  const [title, setTitle] = useS...
```

---

### 🔗 Route: `/whyareyoulikethis` (`src/app/whyareyoulikethis/page.tsx`)

```tsx
"use client";

import { DoomscrollHero } from "@/components/DoomscrollHero";
import { SiteHeader, SiteFooter } from "@/components/Shell";

export default function WhyAreYouLikeThisPage() {
  return (
    <>
      <SiteHeader authed={false} />
      <main className="relative min-h-screen">
        <D...
```

---

## 🧩 Component Registry (13 total)

- **AccountManager** (`src/components/AccountManager.tsx`)
- **AuthForm** (`src/components/AuthForm.tsx`)
- **ComposeDeskMockup** (`src/components/ComposeDeskMockup.tsx`)
- **DashboardApp** (`src/components/DashboardApp.tsx`)
- **DashboardShell** (`src/components/DashboardShell.tsx`)
- **DoomscrollHero** (`src/components/DoomscrollHero.tsx`)
- **GrowthGuideLayout** (`src/components/GrowthGuideLayout.tsx`)
- **InteractiveBroadcastEngine** (`src/components/InteractiveBroadcastEngine.tsx`)
- **OnboardingForm** (`src/components/OnboardingForm.tsx`)
- **PlatformColorLogo** (`src/components/PlatformColorLogo.tsx`)
- **PlatformIcons** (`src/components/PlatformIcons.tsx`)
- **ScrollAnim** (`src/components/ScrollAnim.tsx`)
- **Shell** (`src/components/Shell.tsx`)
