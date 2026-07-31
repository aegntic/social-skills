import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

/**
 * Symmetric AES-256-GCM helpers for encrypting per-user platform credentials
 * at rest in `data/db.json`. The key is `SS_MASTER_KEY` (64-char hex → 32
 * bytes). Ciphertext serializes as `base64.iv.tag.ct` so the blob stays a
 * single JSON-safe string.
 *
 * Fail-fast: if `SS_MASTER_KEY` is unset at encrypt time we throw — storing
 * plaintext credentials is never acceptable. Decrypt also throws on a missing
 * key or tampered ciphertext (GCM tag check fails).
 *
 * Losing `SS_MASTER_KEY` makes stored credentials unrecoverable by design.
 */

const IV_BYTES = 12; // 96-bit nonce recommended for GCM

function masterKey(): Buffer {
  const raw = process.env.SS_MASTER_KEY;
  if (!raw) {
    throw new Error(
      "SS_MASTER_KEY is not set — generate one with `openssl rand -hex 32` and export it before connecting accounts."
    );
  }
  if (!/^[0-9a-fA-F]{64}$/.test(raw)) {
    throw new Error("SS_MASTER_KEY must be 64 hex chars (32 bytes). Regenerate with `openssl rand -hex 32`.");
  }
  return Buffer.from(raw, "hex");
}

export function encrypt(plain: string): string {
  if (!plain) throw new Error("encrypt() received empty plaintext");
  const key = masterKey();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [ct.toString("base64"), iv.toString("base64"), tag.toString("base64")].join(".");
}

export function decrypt(blob: string): string {
  const parts = blob.split(".");
  if (parts.length !== 3) throw new Error("Malformed credential blob");
  const [ctB64, ivB64, tagB64] = parts;
  const key = masterKey();
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const plain = Buffer.concat([decipher.update(Buffer.from(ctB64, "base64")), decipher.final()]);
  return plain.toString("utf8");
}
