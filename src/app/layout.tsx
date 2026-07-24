import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3456";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Social Skills — post everywhere from one desk",
    template: "%s · Social Skills",
  },
  description:
    "Social Skills is the cross-post desk for creators. Schedule and publish to X, Instagram, TikTok, YouTube, LinkedIn, and more with real per-platform validation.",
  openGraph: {
    type: "website",
    siteName: "Social Skills",
    title: "Social Skills — cross-post desk",
    description: "Ship once. Show up everywhere. The social skill that compounds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Skills",
    description: "Post to all your social accounts from one desk.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
