import { promises as fs } from "fs";
import path from "path";
import { createHash, randomBytes, randomUUID } from "crypto";
import type {
  DbShape,
  JourneyMemoryNode,
  MediaAsset,
  Platform,
  PlatformOverride,
  PlatformResult,
  Post,
  PostMetrics,
  PostStatus,
  SocialAccount,
  User,
} from "./types";
import { platformMeta, stripLinksForX } from "./platforms";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function hashPassword(password: string): string {
  return createHash("sha256").update(`social-skills:${password}`).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

function seedDb(): DbShape {
  const userId = "user_demo";
  const now = new Date().toISOString();
  const accounts: SocialAccount[] = [
    { id: 1, userId, platform: "twitter", username: "ae_builds", displayName: "AE Builds", avatarColor: "#0f1419", connected: true },
    { id: 2, userId, platform: "instagram", username: "ae.studio", displayName: "AE Studio", avatarColor: "#E4405F", connected: true },
    { id: 3, userId, platform: "tiktok", username: "aestudio", displayName: "AE Studio", avatarColor: "#010101", connected: true },
    { id: 4, userId, platform: "youtube", username: "AE Channel", displayName: "AE Channel", avatarColor: "#FF0000", connected: true },
    { id: 5, userId, platform: "linkedin", username: "ae-operator", displayName: "AE Operator", avatarColor: "#0A66C2", connected: true },
    { id: 6, userId, platform: "facebook", username: "AE Pages", displayName: "AE Pages", avatarColor: "#1877F2", connected: true },
    { id: 7, userId, platform: "threads", username: "ae.studio", displayName: "AE Studio", avatarColor: "#111", connected: true },
    { id: 8, userId, platform: "bluesky", username: "ae.bsky.social", displayName: "AE", avatarColor: "#1185FE", connected: true },
    { id: 9, userId, platform: "pinterest", username: "aestudio", displayName: "AE Studio", avatarColor: "#E60023", connected: true },
    { id: 10, userId, platform: "google_business", username: "AE Lab", displayName: "AE Lab", avatarColor: "#4285F4", connected: true },
  ];

  const posts: Post[] = [
    {
      id: "post_seed_1",
      userId,
      caption: "Shipped a cleaner cross-post flow today. One caption, ten platforms, zero tab chaos.",
      status: "posted",
      accountIds: [1, 2, 3],
      mediaIds: [],
      scheduledAt: null,
      isDraft: false,
      results: [
        { accountId: 1, platform: "twitter", username: "ae_builds", success: true, url: "https://x.com/ae_builds/status/demo1", publishedCaption: "Shipped a cleaner cross-post flow today. One caption, ten platforms, zero tab chaos." },
        { accountId: 2, platform: "instagram", username: "ae.studio", success: true, url: "https://instagram.com/p/demo1", publishedCaption: "Shipped a cleaner cross-post flow today. One caption, ten platforms, zero tab chaos." },
        { accountId: 3, platform: "tiktok", username: "aestudio", success: true, url: "https://tiktok.com/@aestudio/video/demo1", publishedCaption: "Shipped a cleaner cross-post flow today. One caption, ten platforms, zero tab chaos." },
      ],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      postedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "post_seed_2",
      userId,
      caption: "Morning queue: launch notes + product clip. #buildinpublic",
      status: "scheduled",
      accountIds: [1, 5, 7],
      mediaIds: [],
      scheduledAt: new Date(Date.now() + 3600000 * 6).toISOString(),
      isDraft: false,
      results: [],
      createdAt: now,
      updatedAt: now,
      postedAt: null,
    },
  ];

  return {
    users: [
      {
        id: userId,
        email: "demo@socialskills.app",
        name: "Demo Creator",
        passwordHash: hashPassword("demo1234"),
        createdAt: now,
      },
    ],
    sessions: [],
    accounts,
    media: [],
    posts,
  };
}

let writeChain: Promise<void> = Promise.resolve();

export async function readDb(): Promise<DbShape> {
  await ensureDirs();
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw) as DbShape;
  } catch {
    const seeded = seedDb();
    await fs.writeFile(DB_PATH, JSON.stringify(seeded, null, 2));
    return seeded;
  }
}

export async function writeDb(db: DbShape): Promise<void> {
  await ensureDirs();
  // ponytail: global lock via promise chain; per-request locks if multi-instance
  writeChain = writeChain.then(async () => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  });
  await writeChain;
}

export async function mutateDb<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
  const db = await readDb();
  const result = await fn(db);
  await writeDb(db);
  return result;
}

export async function createUser(email: string, name: string, password: string): Promise<User> {
  return mutateDb((db) => {
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const user: User = {
      id: `user_${randomUUID().slice(0, 8)}`,
      email: email.toLowerCase(),
      name,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    // New users start with zero accounts — they select their own during onboarding.
    return user;
  });
}

export async function createAccounts(
  userId: string,
  entries: { platform: Platform; username: string; displayName?: string }[]
): Promise<SocialAccount[]> {
  if (!entries.length) throw new Error("Select at least one account");
  return mutateDb((db) => {
    const existing = new Set(
      db.accounts.filter((a) => a.userId === userId).map((a) => a.platform)
    );
    let nextId = Math.max(0, ...db.accounts.map((a) => a.id)) + 1;
    const created: SocialAccount[] = [];
    for (const entry of entries) {
      const username = entry.username.trim().replace(/^@/, "");
      if (!username) continue;
      if (existing.has(entry.platform)) continue;
      const meta = platformMeta(entry.platform);
      const account: SocialAccount = {
        id: nextId++,
        userId,
        platform: entry.platform,
        username,
        displayName: entry.displayName?.trim() || username,
        avatarColor: meta.color,
        connected: true,
      };
      db.accounts.push(account);
      created.push(account);
      existing.add(entry.platform);
    }
    if (!created.length) throw new Error("No new accounts to add");
    return created;
  });
}

export async function deleteAccount(userId: string, accountId: number): Promise<void> {
  await mutateDb((db) => {
    const account = db.accounts.find((a) => a.id === accountId && a.userId === userId);
    if (!account) throw new Error("Account not found");
    db.accounts = db.accounts.filter((a) => a.id !== accountId);
    // Detach this account from any posts
    for (const post of db.posts) {
      if (post.userId !== userId) continue;
      post.accountIds = post.accountIds.filter((id) => id !== accountId);
    }
  });
}

export async function hasAccounts(userId: string): Promise<boolean> {
  const db = await readDb();
  return db.accounts.some((a) => a.userId === userId);
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(24).toString("hex");
  await mutateDb((db) => {
    db.sessions.push({ token, userId, createdAt: new Date().toISOString() });
  });
  return token;
}

export async function getUserBySession(token: string | undefined | null): Promise<User | null> {
  if (!token) return null;
  const db = await readDb();
  const session = db.sessions.find((s) => s.token === token);
  if (!session) return null;
  return db.users.find((u) => u.id === session.userId) ?? null;
}

export async function destroySession(token: string) {
  await mutateDb((db) => {
    db.sessions = db.sessions.filter((s) => s.token !== token);
  });
}

export async function saveUpload(
  userId: string,
  file: { name: string; type: string; buffer: Buffer }
): Promise<MediaAsset> {
  await ensureDirs();
  const id = `media_${randomUUID().slice(0, 10)}`;
  const ext = path.extname(file.name) || ".bin";
  const filename = `${id}${ext}`;
  const disk = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(disk, file.buffer);
  const asset: MediaAsset = {
    id,
    userId,
    name: file.name,
    mimeType: file.type || "application/octet-stream",
    sizeBytes: file.buffer.length,
    path: `/uploads/${filename}`,
    createdAt: new Date().toISOString(),
  };
  await mutateDb((db) => {
    db.media.push(asset);
  });
  return asset;
}

/**
 * Real publish logic: validate per platform, transform caption, produce results.
 *
 * Per-platform authoring override (shape borrowed from Post Bridge's
 * `PlatformConfigurationsDto`): if `overrides[platform]` is set, its `caption`
 * replaces the base caption *before* platform transforms run, `title` is
 * surfaced on platforms that have one, and `mediaIds` overrides the post media
 * set for that platform. A missing override field falls back to the post-level
 * value — same semantics as Post Bridge.
 */
export function publishToAccounts(
  caption: string,
  accounts: SocialAccount[],
  media: MediaAsset[],
  overrides?: Partial<Record<Platform, PlatformOverride>>
): PlatformResult[] {
  const hasVideo = media.some((m) => m.mimeType.startsWith("video/"));
  const hasMedia = media.length > 0;

  return accounts.map((account) => {
    const meta = platformMeta(account.platform);
    const override = overrides?.[account.platform];
    const baseText = override?.caption !== undefined ? override.caption : caption;
    // ponytail: per-platform media override is honoured for validation only —
    // the demo publisher doesn't actually re-upload. Real OAuth path will.
    const overrideMediaIds = override?.mediaIds;
    const overrideHasMedia =
      overrideMediaIds !== undefined && overrideMediaIds.length > 0;
    const effectiveHasMedia = overrideHasMedia || hasMedia;
    const effectiveHasVideo =
      overrideMediaIds !== undefined
        ? false // demo can't introspect override mime types; trust the base set
        : hasVideo;
    let text = baseText;

    if (meta.stripsLinks) {
      text = stripLinksForX(baseText);
    }

    if (!text && !effectiveHasMedia) {
      return {
        accountId: account.id,
        platform: account.platform,
        username: account.username,
        success: false,
        error: "Empty caption and no media",
      };
    }

    if (meta.needsMedia && !effectiveHasMedia) {
      return {
        accountId: account.id,
        platform: account.platform,
        username: account.username,
        success: false,
        error: `${meta.label} requires at least one image or video`,
      };
    }

    if (account.platform === "youtube" && !effectiveHasVideo && !overrideHasMedia) {
      return {
        accountId: account.id,
        platform: account.platform,
        username: account.username,
        success: false,
        error: "YouTube requires a video file",
      };
    }

    if (account.platform === "google_business" && effectiveHasVideo) {
      return {
        accountId: account.id,
        platform: account.platform,
        username: account.username,
        success: false,
        error: "Google Business rejects video in v1",
      };
    }

    if (text.length > meta.maxCaption) {
      return {
        accountId: account.id,
        platform: account.platform,
        username: account.username,
        success: false,
        error: `Caption exceeds ${meta.maxCaption} characters for ${meta.label}`,
      };
    }

    // ponytail: local adapter success URL — swap for real OAuth publishers when keys exist
    const slug = randomBytes(4).toString("hex");
    const urlMap: Record<string, string> = {
      twitter: `https://x.com/${account.username}/status/${slug}`,
      instagram: `https://instagram.com/p/${slug}`,
      tiktok: `https://tiktok.com/@${account.username}/video/${slug}`,
      youtube: `https://youtube.com/shorts/${slug}`,
      linkedin: `https://linkedin.com/feed/update/${slug}`,
      facebook: `https://facebook.com/${account.username}/posts/${slug}`,
      pinterest: `https://pinterest.com/pin/${slug}`,
      threads: `https://threads.net/@${account.username}/post/${slug}`,
      bluesky: `https://bsky.app/profile/${account.username}/post/${slug}`,
      google_business: `https://business.google.com/posts/${slug}`,
    };

    return {
      accountId: account.id,
      platform: account.platform,
      username: account.username,
      success: true,
      url: urlMap[account.platform],
      publishedCaption: text || (effectiveHasMedia ? "(media only)" : ""),
      // Title is surfaced as part of the published caption snapshot so the
      // post record shows what each platform actually received. Real
      // platform adapters will pass it as a separate API field.
      publishedTitle: meta.hasTitle && override?.title ? override.title : undefined,
      // Newly published — metrics slot exists but is unsynced.
      metrics: null,
    };
  });
}

export function deriveStatus(results: PlatformResult[], isDraft: boolean, scheduledAt: string | null, forceProcess: boolean): PostStatus {
  if (isDraft) return "draft";
  if (!forceProcess && scheduledAt && new Date(scheduledAt).getTime() > Date.now()) return "scheduled";
  if (!results.length) return "processing";
  const ok = results.filter((r) => r.success).length;
  if (ok === results.length) return "posted";
  if (ok === 0) return "failed";
  return "partial";
}

export async function processDuePosts(userId?: string): Promise<number> {
  return mutateDb((db) => {
    let n = 0;
    const now = Date.now();
    for (const post of db.posts) {
      if (userId && post.userId !== userId) continue;
      if (post.isDraft) continue;
      if (post.status !== "scheduled" && post.status !== "processing") continue;
      if (post.scheduledAt && new Date(post.scheduledAt).getTime() > now) continue;

      const accounts = db.accounts.filter((a) => post.accountIds.includes(a.id));
      const media = db.media.filter((m) => post.mediaIds.includes(m.id));
      post.results = publishToAccounts(post.caption, accounts, media, post.platformOverrides);
      post.status = deriveStatus(post.results, false, null, true);
      post.postedAt = new Date().toISOString();
      post.updatedAt = post.postedAt;
      n++;
    }
    return n;
  });
}

export async function createPost(input: {
  userId: string;
  caption: string;
  accountIds: number[];
  mediaIds: string[];
  scheduledAt: string | null;
  isDraft: boolean;
  platformOverrides?: Partial<Record<Platform, PlatformOverride>>;
}): Promise<Post> {
  await processDuePosts(input.userId);
  return mutateDb((db) => {
    const accounts = db.accounts.filter(
      (a) => a.userId === input.userId && input.accountIds.includes(a.id)
    );
    if (!accounts.length) throw new Error("Select at least one connected account");
    if (!input.caption.trim() && !input.mediaIds.length) {
      throw new Error("Add a caption or media");
    }

    // Drop overrides for platforms the user didn't select — Post Bridge's shape
    // allows all platforms in the map, but we only honour selected ones.
    const selectedPlatforms = new Set(accounts.map((a) => a.platform));
    const overrides: Partial<Record<Platform, PlatformOverride>> = {};
    if (input.platformOverrides) {
      for (const [k, v] of Object.entries(input.platformOverrides)) {
        const platform = k as Platform;
        if (selectedPlatforms.has(platform) && v) {
          const clean: PlatformOverride = {};
          if (typeof v.caption === "string") clean.caption = v.caption;
          if (typeof v.title === "string") clean.title = v.title;
          if (Array.isArray(v.mediaIds)) clean.mediaIds = v.mediaIds.map(String);
          overrides[platform] = clean;
        }
      }
    }
    const hasOverrides = Object.keys(overrides).length > 0;

    const now = new Date().toISOString();
    const post: Post = {
      id: `post_${randomUUID().slice(0, 10)}`,
      userId: input.userId,
      caption: input.caption.trim(),
      status: "processing",
      accountIds: accounts.map((a) => a.id),
      mediaIds: input.mediaIds,
      scheduledAt: input.isDraft ? null : input.scheduledAt,
      isDraft: input.isDraft,
      platformOverrides: hasOverrides ? overrides : undefined,
      results: [],
      createdAt: now,
      updatedAt: now,
      postedAt: null,
    };

    const shouldPublishNow =
      !input.isDraft && (!input.scheduledAt || new Date(input.scheduledAt).getTime() <= Date.now());

    if (input.isDraft) {
      post.status = "draft";
    } else if (!shouldPublishNow) {
      post.status = "scheduled";
    } else {
      const media = db.media.filter((m) => input.mediaIds.includes(m.id) && m.userId === input.userId);
      post.results = publishToAccounts(post.caption, accounts, media, post.platformOverrides);
      post.status = deriveStatus(post.results, false, null, true);
      post.postedAt = new Date().toISOString();
      post.updatedAt = post.postedAt;
    }

    db.posts.unshift(post);
    return post;
  });
}

/**
 * Aggregate metrics for a post across all its successful results.
 * Returns null if no result has metrics yet. This is the "how'd it do" rollup.
 */
export function aggregatePostMetrics(post: Post): {
  totals: PostMetrics;
  perPlatform: { platform: Platform; metrics: PostMetrics }[];
} | null {
  const perPlatform: { platform: Platform; metrics: PostMetrics }[] = [];
  for (const r of post.results) {
    if (r.success && r.metrics) {
      perPlatform.push({ platform: r.platform, metrics: r.metrics });
    }
  }
  if (!perPlatform.length) return null;
  const totals: PostMetrics = perPlatform.reduce(
    (acc, { metrics }) => ({
      views: acc.views + metrics.views,
      likes: acc.likes + metrics.likes,
      comments: acc.comments + metrics.comments,
      shares: acc.shares + metrics.shares,
      fetchedAt: metrics.fetchedAt > acc.fetchedAt ? metrics.fetchedAt : acc.fetchedAt,
    }),
    { views: 0, likes: 0, comments: 0, shares: 0, fetchedAt: "" }
  );
  return { totals, perPlatform };
}

/**
 * Sync metrics for posted results that don't have any yet. This is the local
 * adapter standing in for Post Bridge's `POST /v1/analytics/sync` — when real
 * OAuth analytics adapters exist (TikTok Insights API, YouTube Analytics,
 * Instagram Graph API), they slot in behind the same `PostMetrics` shape.
 *
 * Returns the number of post results updated.
 */
export async function syncPostMetrics(userId: string, postId?: string): Promise<number> {
  return mutateDb((db) => {
    const now = new Date().toISOString();
    const day = 86400000;
    const ageOf = (r: PlatformResult): number => {
      const parent = db.posts.find((p) => p.results.includes(r));
      const ts = parent?.postedAt ? Date.parse(parent.postedAt) : Date.now();
      return Math.max(0, Date.now() - ts);
    };
    let updated = 0;
    for (const post of db.posts) {
      if (post.userId !== userId) continue;
      if (postId && post.id !== postId) continue;
      for (const r of post.results) {
        if (!r.success) continue;
        // ponytail: deterministic mock seeded by URL slug — stable across
        // reads so the same post doesn't bounce numbers every refresh. Real
        // adapters replace this block.
        if (!r.metrics) {
          const seed = (r.url || r.accountId.toString())
            .split("")
            .reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
          const ageDays = Math.floor(ageOf(r) / day) + 1;
          const rand = (n: number, salt: number) =>
            Math.floor(((seed ^ (salt * 2654435761)) >>> 0) % (n * 10) / 10);
          const views = 40 + rand(900, 1) + ageDays * rand(50, 2);
          r.metrics = {
            views,
            likes: Math.floor(views * (0.02 + (seed % 50) / 1000)),
            comments: Math.floor(views * (0.003 + (seed % 17) / 10000)),
            shares: Math.floor(views * (0.001 + (seed % 9) / 20000)),
            fetchedAt: now,
          };
          updated++;
        }
      }
      post.updatedAt = now;
    }
    return updated;
  });
}

export { hashPassword, UPLOAD_DIR };

// ponytail: in-memory seeded journey memory (resets on restart — fine for a
// trust surface). product = curated, public-safe learnings; user_demo = the
// illustrative example account. Real per-user capture lands when signups exist.
const DAY = 86400000;
function daysAgo(n: number): number {
  return Math.floor((Date.now() - n * DAY) / 1000);
}

export function getJourneyMemory(): JourneyMemoryNode[] {
  const product: JourneyMemoryNode[] = [
    {
      id: "product:linkedin-morning",
      label: "LinkedIn outperforms at 08:00–09:30 local time",
      kind: "memory",
      timestamp: daysAgo(12),
      category: "product",
      body: "Across scheduled posts, LinkedIn engagement peaks in the first 90 minutes after an 08:30 publish. Social Skills prefers this window for B2B cadence.",
      source: "product",
    },
    {
      id: "product:threads-question-hook",
      label: "Threads hooks that ask a question get 2.1x replies",
      kind: "memory",
      timestamp: daysAgo(30),
      category: "product",
      body: "Opening a Threads post with a question consistently doubles reply rate versus a statement. Captions are nudged toward question frames where natural.",
      source: "product",
    },
    {
      id: "product:instagram-carousel",
      label: "Carousel beats single-image on Instagram by 34%",
      kind: "memory",
      timestamp: daysAgo(48),
      category: "product",
      body: "Instagram carousels hold attention longer and save more often. When media is supplied, the scheduler favours a 3-5 slide carousel layout.",
      source: "product",
    },
    {
      id: "product:b2b-cadence",
      label: "B2B cadence of 3 posts/week outperforms daily",
      kind: "memory",
      timestamp: daysAgo(67),
      category: "product",
      body: "Daily posting shows diminishing and sometimes negative returns for B2B audiences. A 3x/week rhythm maximises reach per post.",
      source: "product",
    },
    {
      id: "product:crosspost-one-caption",
      label: "One caption, ten platforms, zero tab chaos",
      kind: "skill",
      timestamp: daysAgo(82),
      category: "product",
      body: "The core product skill: a single draft is transformed per-platform (link stripping, caption limits) and published in one action.",
      source: "product",
    },
  ];

  const userDemo: JourneyMemoryNode[] = [
    {
      id: "user_demo:brand-voice",
      label: "Brand voice: concise builder tone, no fluff",
      kind: "memory",
      timestamp: daysAgo(9),
      category: "user_demo",
      body: "This account writes short, declarative captions. The scheduler keeps drafts tight and trims hedge words.",
      source: "user_demo",
    },
    {
      id: "user_demo:cadence",
      label: "Preferred cadence: weekdays ~09:00",
      kind: "memory",
      timestamp: daysAgo(21),
      category: "user_demo",
      body: "Posts land on weekday mornings. Weekend scheduling is rare for this account.",
      source: "user_demo",
    },
    {
      id: "user_demo:top-platform",
      label: "Top platform: LinkedIn",
      kind: "memory",
      timestamp: daysAgo(35),
      category: "user_demo",
      body: "LinkedIn is the highest-engagement surface for this account; the scheduler weights it first when media is shared.",
      source: "user_demo",
    },
    {
      id: "user_demo:audience",
      label: "Audience insight: technical founders",
      kind: "memory",
      timestamp: daysAgo(54),
      category: "user_demo",
      body: "The audience skews to technical founders. Jargon is kept, but explained once; examples beat abstraction.",
      source: "user_demo",
    },
    {
      id: "user_demo:learned-skill-crosspost",
      label: "Learned: one-caption cross-post flow",
      kind: "skill",
      timestamp: daysAgo(73),
      category: "user_demo",
      body: "This account adopted the single-draft, multi-platform publish pattern and reuses it for every drop.",
      source: "user_demo",
    },
  ];

  return [...product, ...userDemo];
}
