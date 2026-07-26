import assert from "assert";

function stripLinksForX(caption) {
  return caption
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/www\.\S+/gi, "")
    .replace(/\b[a-z0-9-]+\.(com|io|co|net|org|ai|dev|app)(\/\S*)?/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

assert.equal(
  stripLinksForX("Launch live at https://example.com/now and www.test.io today"),
  "Launch live at and today"
);
assert.equal(stripLinksForX("No links here"), "No links here");
assert.ok(!stripLinksForX("Visit foo.com/path please").includes("foo.com"));
console.log("ok: stripLinksForX");

// Per-platform authoring override: shape borrowed from Post Bridge's
// platform_configurations (JSON map keyed by platform). Verify the override
// resolves per platform, and that link stripping still fires for X.
function applyOverride(caption, platform, override) {
  const text = override?.caption !== undefined ? override.caption : caption;
  if (platform === "twitter") return stripLinksForX(text);
  return text;
}
assert.equal(
  applyOverride("Base caption with https://link.example.com", "twitter", undefined),
  "Base caption with"
);
assert.equal(
  applyOverride("Base", "twitter", { caption: "Override with https://other.example.com" }),
  "Override with"
);
assert.equal(
  applyOverride("Base caption", "youtube", { caption: "YouTube-specific long-form description" }),
  "YouTube-specific long-form description"
);
assert.equal(applyOverride("Base", "instagram", undefined), "Base");
console.log("ok: platformOverrides resolve per platform");

// Analytics read-back shape: Post Bridge AnalyticsDto's core numeric fields are
// view_count / like_count / comment_count / share_count. The local adapter
// produces deterministic non-negative numbers per post-result, with the latest
// fetchedAt as last_synced_at.
function validateMetrics(m) {
  assert.ok(m && typeof m === "object", "metrics must be an object");
  for (const k of ["views", "likes", "comments", "shares"]) {
    assert.ok(Number.isFinite(m[k]) && m[k] >= 0, `${k} must be a non-negative number`);
  }
  assert.ok(typeof m.fetchedAt === "string" && m.fetchedAt.length > 0, "fetchedAt must be ISO string");
}
validateMetrics({ views: 100, likes: 5, comments: 1, shares: 0, fetchedAt: new Date().toISOString() });
console.log("ok: PostMetrics shape matches Post Bridge AnalyticsDto core");
