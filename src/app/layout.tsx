import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";

/* Clay type pair — rounded terminals match the claymation feel */
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

/* No-FOUC: set .dark on <html> before first paint.
   Stored choice (ss-theme) wins; otherwise follow the OS. */
const themeInit = `(function(){try{var t=localStorage.getItem("ss-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

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
    <html lang="en" className={`${nunito.variable} ${baloo.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
