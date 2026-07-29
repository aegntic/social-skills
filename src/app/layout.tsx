import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
});

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://socialskills.ninja";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Social Skills — Multi-Platform Social Media Auto-Poster & AI Cross-Publishing Engine",
    template: "%s · Social Skills",
  },
  description:
    "The ultimate multi-platform social media auto-poster and AI cross-publishing engine. Publish simultaneously to X, Instagram Reels, TikTok, YouTube Shorts, LinkedIn, Threads, Bluesky, Pinterest, and Facebook with per-platform validation and Claude/ChatGPT MCP integration.",
  keywords: [
    "multi-platform social media auto-poster",
    "social media cross posting tool",
    "schedule instagram reels and tiktok",
    "ai social media publisher",
    "postiz alternative",
    "buffer alternative",
    "model context protocol social media",
    "cross post to all social networks",
    "social media growth engine"
  ],
  authors: [{ name: "Social Skills Engineering Team" }],
  openGraph: {
    type: "website",
    siteName: "Social Skills Ninja",
    title: "Social Skills — Multi-Platform Social Media Cross-Publishing Engine",
    description: "Publish content simultaneously across 10 social networks from one AI-powered desk. Built for creators, growth teams, and agencies.",
    url: site,
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Skills — Multi-Platform Social Media Auto-Poster",
    description: "Automate content distribution to X, IG Reels, TikTok, Shorts, and LinkedIn in seconds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
