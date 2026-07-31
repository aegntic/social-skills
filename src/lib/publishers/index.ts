/**
 * Platform publisher dispatch. One file per platform under this folder; this
 * module routes by platform id. Adding a platform = write `<id>.ts`, then add
 * one entry to each map below.
 *
 * Un-wired platforms do NOT fake success. They return an honest "not yet
 * wired" error so `deriveStatus` marks the post `partial`/`failed` and the
 * user sees the truth.
 */

import type { Platform, PostMetrics } from "../types";
import { platformMeta } from "../platforms";
import { blueskyFetchMetrics, blueskyPublish } from "./bluesky";

/** Platforms whose publish path is real in this repo. */
export const WIRED_PLATFORMS: ReadonlySet<Platform> = new Set<Platform>(["bluesky"]);

/**
 * Platforms that require a stored credential (encrypted at rest on the
 * SocialAccount). Mirrors the AccountManager UI gate.
 */
export const NEEDS_CREDENTIALS: ReadonlySet<Platform> = new Set<Platform>(["bluesky"]);

export type PublishPayload = {
  text: string;
  title?: string;
  /** Account handle / username — Bluesky uses it as the session identifier. */
  identifier?: string;
  /** Decrypted credential plaintext (e.g. Bluesky app password). */
  credentials?: string;
  images?: { bytes: Buffer; mimeType: string; alt?: string }[];
};

export type PublishOutcome = {
  success: boolean;
  url?: string;
  error?: string;
  publishedCaption?: string;
  publishedTitle?: string;
  metricsRef?: string;
};

function notWired(platform: Platform): PublishOutcome {
  return {
    success: false,
    error: `Direct publish to ${platformMeta(platform).label} not yet wired — skipped`,
  };
}

export async function publishToPlatform(platform: Platform, payload: PublishPayload): Promise<PublishOutcome> {
  try {
    if (platform === "bluesky") {
      if (!payload.credentials) {
        return { success: false, error: "Bluesky needs an app password on the account" };
      }
      if (!payload.identifier) {
        return { success: false, error: "Bluesky needs a handle on the account" };
      }
      const result = await blueskyPublish({
        identifier: payload.identifier,
        appPassword: payload.credentials,
        text: payload.text,
        images: payload.images,
      });
      return {
        success: true,
        url: result.url,
        publishedCaption: payload.text,
        metricsRef: result.uri,
      };
    }
    return notWired(platform);
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Publish failed" };
  }
}

export async function fetchMetrics(
  platform: Platform,
  metricsRef: string,
  identifier?: string,
  credentials?: string
): Promise<PostMetrics | null> {
  if (platform === "bluesky") {
    if (!credentials || !identifier) return null;
    return blueskyFetchMetrics({ identifier, appPassword: credentials, uri: metricsRef });
  }
  return null;
}
