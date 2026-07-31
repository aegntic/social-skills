/**
 * Real Bluesky (AT Protocol) publisher.
 *
 * Auth model: app password (user generates at bsky.app/settings/app-passwords).
 * No OAuth roundtrip — we exchange handle+app-password for an accessJwt via
 * `com.atproto.server.createSession`, then call the XRPC endpoints on the
 * public PDS host `https://bsky.social`.
 *
 * Flow: createSession → uploadBlob (per image) → createRecord (app.bsky.feed.post).
 * Metrics: app.bsky.feed.getPosts exposes likeCount / repostCount / replyCount.
 * Bluesky has NO public impression/view count → metrics.views is always 0.
 *
 * Images only — atproto has no public video upload endpoint today.
 */

import type { PostMetrics } from "../types";

const PDS = "https://bsky.social";
const MAX_IMAGES = 4;

type ImageInput = { bytes: Buffer; mimeType: string; alt?: string };

type BlobRef = {
  $type: "blob";
  ref: { $link: string };
  mimeType: string;
  size: number;
};

type Session = { accessJwt: string; did: string; handle: string };

type SessionResponse = { accessJwt: string; did: string; handle: string };
type UploadBlobResponse = { blob: BlobRef };
type CreateRecordResponse = { uri: string; cid: string };
type GetPostsResponse = {
  posts: Array<{ likeCount?: number; repostCount?: number; replyCount?: number }>;
};

/** Generic XRPC caller. Auth optional. Throws on non-2xx with the platform's error message. */
async function xrpc<T>(path: string, init: RequestInit, accessToken?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (!headers.has("Content-Type") && init.body && typeof init.body === "string") {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`${PDS}/xrpc/${path}`, { ...init, headers });
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      const j = JSON.parse(text) as { message?: string; error?: string };
      detail = j.message || j.error || text;
    } catch {
      /* keep raw text */
    }
    throw new Error(`Bluesky ${path} ${res.status}: ${detail}`);
  }
  return (text ? JSON.parse(text) : null) as T;
}

async function blueskySession(identifier: string, appPassword: string): Promise<Session> {
  const body = await xrpc<SessionResponse>("com.atproto.server.createSession", {
    method: "POST",
    body: JSON.stringify({ identifier, password: appPassword }),
  });
  return { accessJwt: body.accessJwt, did: body.did, handle: body.handle };
}

async function uploadImage(accessToken: string, img: ImageInput): Promise<BlobRef> {
  const out = await xrpc<UploadBlobResponse>(
    "com.atproto.repo.uploadBlob",
    {
      method: "POST",
      headers: { "Content-Type": img.mimeType },
      body: new Uint8Array(img.bytes),
    },
    accessToken
  );
  return out.blob;
}

export type BlueskyPublishInput = {
  identifier: string;
  appPassword: string;
  text: string;
  images?: ImageInput[];
};

export type BlueskyPublishResult = {
  /** Full at:// URI — stored as PlatformResult.metricsRef for later sync. */
  uri: string;
  cid: string;
  /** Human-facing web URL. */
  url: string;
};

export async function blueskyPublish(input: BlueskyPublishInput): Promise<BlueskyPublishResult> {
  const session = await blueskySession(input.identifier, input.appPassword);

  const images = (input.images ?? []).slice(0, MAX_IMAGES);
  const embed = images.length
    ? {
        $type: "app.bsky.embed.images",
        images: await Promise.all(
          images.map((img) => uploadImage(session.accessJwt, img).then((blob) => ({ alt: img.alt ?? "", image: blob })))
        ),
      }
    : undefined;

  const record: Record<string, unknown> = {
    $type: "app.bsky.feed.post",
    text: input.text,
    createdAt: new Date().toISOString(),
    langs: ["en"],
  };
  if (embed) record.embed = embed;

  const created = await xrpc<CreateRecordResponse>(
    "com.atproto.repo.createRecord",
    {
      method: "POST",
      body: JSON.stringify({
        repo: session.did,
        collection: "app.bsky.feed.post",
        record,
      }),
    },
    session.accessJwt
  );

  // uri looks like: at://did:plc:.../app.bsky.feed.post/<rkey>
  const rkey = String(created.uri).split("/").pop();
  const url = `https://bsky.app/profile/${session.did}/post/${rkey}`;

  return { uri: created.uri, cid: created.cid, url };
}

export type BlueskyMetricsInput = {
  identifier: string;
  appPassword: string;
  uri: string;
};

/**
 * Returns real like/repost/reply counts. Bluesky exposes no impression count,
 * so `views` is always 0 here — see plan's known-limits section.
 */
export async function blueskyFetchMetrics(input: BlueskyMetricsInput): Promise<PostMetrics | null> {
  const session = await blueskySession(input.identifier, input.appPassword);
  const out = await xrpc<GetPostsResponse>(
    `app.bsky.feed.getPosts?uris=${encodeURIComponent(input.uri)}`,
    { method: "GET" },
    session.accessJwt
  );
  const post = out.posts?.[0];
  if (!post) return null;
  return {
    views: 0,
    likes: post.likeCount ?? 0,
    comments: post.replyCount ?? 0,
    shares: post.repostCount ?? 0,
    fetchedAt: new Date().toISOString(),
  };
}
