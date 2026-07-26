export type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "facebook"
  | "pinterest"
  | "threads"
  | "bluesky"
  | "google_business";

export type PostStatus = "draft" | "scheduled" | "processing" | "posted" | "failed" | "partial";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export interface SocialAccount {
  id: number;
  userId: string;
  platform: Platform;
  username: string;
  displayName: string;
  avatarColor: string;
  connected: boolean;
}

export interface MediaAsset {
  id: string;
  userId: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  path: string; // /uploads/...
  createdAt: string;
}

/**
 * Per-platform authoring override. Shape borrowed from Post Bridge's
 * `PlatformConfigurationsDto` (a JSON map keyed by platform) — not the SaaS,
 * just the data model. A missing field falls back to the post-level value.
 *
 * `title` only matters for platforms that have one (YouTube, TikTok, Pinterest);
 * other platforms silently ignore it.
 */
export interface PlatformOverride {
  caption?: string;
  title?: string;
  mediaIds?: string[];
}

/**
 * Per-platform post-results metrics. Shape mirrors Post Bridge's
 * `AnalyticsDto` core fields (views / likes / comments / shares) plus
 * `last_synced_at`. The values are the cumulative totals returned by the
 * platform's analytics API, not social-skills' own counts.
 */
export interface PostMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  fetchedAt: string; // ISO timestamp of last successful sync
}

export interface PlatformResult {
  accountId: number;
  platform: Platform;
  username: string;
  success: boolean;
  url?: string;
  error?: string;
  publishedCaption?: string;
  /** Title actually sent to a title-bearing platform (YouTube/TikTok/Pinterest). */
  publishedTitle?: string;
  /** Per-platform metrics read-back. `null` once published but not yet synced. */
  metrics?: PostMetrics | null;
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  status: PostStatus;
  accountIds: number[];
  mediaIds: string[];
  scheduledAt: string | null;
  isDraft: boolean;
  /** Per-platform authoring overrides keyed by platform. */
  platformOverrides?: Partial<Record<Platform, PlatformOverride>>;
  results: PlatformResult[];
  createdAt: string;
  updatedAt: string;
  postedAt: string | null;
}

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
}

export interface DbShape {
  users: User[];
  sessions: Session[];
  accounts: SocialAccount[];
  media: MediaAsset[];
  posts: Post[];
}

// Raw journey memory node before COS v3 hygiene maps `source` -> `scope`.
export interface JourneyMemoryNode {
  id: string;
  label: string;
  kind: "skill" | "memory";
  timestamp: number | null;
  category: string;
  body: string;
  source: "product" | "user_demo";
}
