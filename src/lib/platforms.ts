import type { Platform } from "./types";

export const PLATFORMS: {
  id: Platform;
  label: string;
  short: string;
  color: string;
  maxCaption: number;
  needsMedia: boolean;
  stripsLinks: boolean;
  /** True for platforms whose API exposes a separate title field (YouTube, TikTok, Pinterest). */
  hasTitle: boolean;
}[] = [
  { id: "twitter", label: "X (Twitter)", short: "X", color: "#0f1419", maxCaption: 280, needsMedia: false, stripsLinks: true, hasTitle: false },
  { id: "instagram", label: "Instagram", short: "IG", color: "#E4405F", maxCaption: 2200, needsMedia: true, stripsLinks: false, hasTitle: false },
  { id: "tiktok", label: "TikTok", short: "TT", color: "#010101", maxCaption: 2200, needsMedia: true, stripsLinks: false, hasTitle: true },
  { id: "youtube", label: "YouTube", short: "YT", color: "#FF0000", maxCaption: 5000, needsMedia: true, stripsLinks: false, hasTitle: true },
  { id: "linkedin", label: "LinkedIn", short: "LI", color: "#0A66C2", maxCaption: 3000, needsMedia: false, stripsLinks: false, hasTitle: false },
  { id: "facebook", label: "Facebook", short: "FB", color: "#1877F2", maxCaption: 63206, needsMedia: false, stripsLinks: false, hasTitle: false },
  { id: "pinterest", label: "Pinterest", short: "Pin", color: "#E60023", maxCaption: 500, needsMedia: true, stripsLinks: false, hasTitle: true },
  { id: "threads", label: "Threads", short: "Th", color: "#000000", maxCaption: 500, needsMedia: false, stripsLinks: false, hasTitle: false },
  { id: "bluesky", label: "Bluesky", short: "BS", color: "#1185FE", maxCaption: 300, needsMedia: false, stripsLinks: false, hasTitle: false },
  { id: "google_business", label: "Google Business", short: "GMB", color: "#4285F4", maxCaption: 1500, needsMedia: false, stripsLinks: false, hasTitle: false },
];

export function platformMeta(id: Platform) {
  return PLATFORMS.find((p) => p.id === id)!;
}

/** Same rule Post Bridge documents: strip URLs from X captions. */
export function stripLinksForX(caption: string): string {
  return caption
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/www\.\S+/gi, "")
    .replace(/\b[a-z0-9-]+\.(com|io|co|net|org|ai|dev|app)(\/\S*)?/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
