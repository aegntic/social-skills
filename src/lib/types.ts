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

export interface PlatformResult {
  accountId: number;
  platform: Platform;
  username: string;
  success: boolean;
  url?: string;
  error?: string;
  publishedCaption?: string;
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
