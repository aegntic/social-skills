"use client";

import { useEffect, useMemo, useState } from "react";
import type { MediaAsset, PlatformResult, Post, SocialAccount } from "@/lib/types";
import { PLATFORMS, platformMeta } from "@/lib/platforms";

type Me = {
  user: { id: string; email: string; name: string };
  accounts: SocialAccount[];
  posts: Post[];
  media: MediaAsset[];
};

function statusBadge(status: Post["status"]) {
  const map: Record<Post["status"], string> = {
    draft: "badge-muted",
    scheduled: "badge-warn",
    processing: "badge-warn",
    posted: "badge-ok",
    failed: "badge-bad",
    partial: "badge-warn",
  };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}

function defaultScheduleLocal() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function DashboardApp() {
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [caption, setCaption] = useState("Shipped today: one caption, every network. No more tab hopping.");
  const [selected, setSelected] = useState<number[]>([]);
  const [mediaIds, setMediaIds] = useState<string[]>([]);
  const [scheduleMode, setScheduleMode] = useState<"now" | "schedule" | "draft">("now");
  const [scheduledAt, setScheduledAt] = useState(defaultScheduleLocal);
  const [lastResults, setLastResults] = useState<PlatformResult[] | null>(null);
  const [lastPostId, setLastPostId] = useState<string | null>(null);
  const [tab, setTab] = useState<"compose" | "posts" | "accounts">("compose");
  const [showTips, setShowTips] = useState(false);

  async function refresh() {
    const res = await fetch("/api/me");
    if (!res.ok) {
      window.location.href = "/login";
      return;
    }
    const data = (await res.json()) as Me;
    setMe(data);
    setSelected((prev) => {
      if (prev.length) return prev;
      return data.accounts.filter((a) => a.connected).slice(0, 4).map((a) => a.id);
    });
    setLoading(false);
  }

  useEffect(() => {
    refresh().catch(() => setError("Failed to load"));
    try {
      setShowTips(localStorage.getItem("ss_tips_done") !== "1");
    } catch {
      setShowTips(true);
    }
  }, []);

  const accountsById = useMemo(() => {
    const m = new Map<number, SocialAccount>();
    me?.accounts.forEach((a) => m.set(a.id, a));
    return m;
  }, [me]);

  const selectedAccounts = useMemo(
    () => (me?.accounts || []).filter((a) => selected.includes(a.id)),
    [me, selected]
  );

  const mediaRequiredMissing = useMemo(() => {
    if (mediaIds.length) return [] as string[];
    return selectedAccounts
      .filter((a) => platformMeta(a.platform).needsMedia)
      .map((a) => platformMeta(a.platform).label);
  }, [selectedAccounts, mediaIds]);

  function toggleAccount(id: number) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function selectAll() {
    if (!me) return;
    setSelected(me.accounts.filter((a) => a.connected).map((a) => a.id));
  }

  function selectCore() {
    if (!me) return;
    const core = new Set(["twitter", "instagram", "tiktok", "linkedin"]);
    setSelected(me.accounts.filter((a) => core.has(a.platform)).map((a) => a.id));
  }

  async function onUpload(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setMediaIds((ids) => [...ids, data.media.id]);
      setSuccess(`Uploaded ${data.media.name}`);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function improveCaption() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption, tone: "punchy" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Rewrite failed");
      setCaption(data.caption);
      setSuccess(data.source === "model" ? "Caption improved with AI" : "Caption tightened");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rewrite failed");
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    setBusy(true);
    setError("");
    setSuccess("");
    setLastResults(null);
    try {
      if (!selected.length) throw new Error("Pick at least one account");
      if (scheduleMode === "now" && mediaRequiredMissing.length && !mediaIds.length) {
        // still allow — server returns partial; warn clearly
        setSuccess(`Heads up: ${mediaRequiredMissing.join(", ")} need media — they'll fail until you upload.`);
      }
      const body: Record<string, unknown> = {
        caption,
        accountIds: selected,
        mediaIds,
        isDraft: scheduleMode === "draft",
      };
      if (scheduleMode === "schedule") {
        if (!scheduledAt) throw new Error("Pick a schedule time");
        body.scheduledAt = new Date(scheduledAt).toISOString();
      }
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Post failed");
      const post = data.post as Post;
      setLastResults(post.results || []);
      setLastPostId(post.id);
      setMediaIds([]);
      await refresh();

      if (post.status === "draft") {
        setSuccess("Draft saved. Promote it anytime from Posts.");
        setTab("posts");
      } else if (post.status === "scheduled") {
        setSuccess(`Queued for ${new Date(post.scheduledAt!).toLocaleString()}`);
        setTab("posts");
      } else {
        const ok = (post.results || []).filter((r) => r.success).length;
        const total = (post.results || []).length;
        setSuccess(`Published to ${ok}/${total} accounts`);
        // stay on compose with results panel visible via lastResults; also switch for clarity
        setTab("posts");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Post failed");
    } finally {
      setBusy(false);
    }
  }

  async function removePost(id: string) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/posts?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Delete failed");
      return;
    }
    setSuccess("Post deleted");
    await refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  function dismissTips() {
    try {
      localStorage.setItem("ss_tips_done", "1");
    } catch {
      /* ignore */
    }
    setShowTips(false);
  }

  if (loading || !me) {
    return (
      <div className="container-page py-20 text-center text-muted">
        Warming up your Social Skills desk…
      </div>
    );
  }

  const mediaMap = new Map(me.media.map((m) => [m.id, m]));
  const postedCount = me.posts.filter((p) => p.status === "posted" || p.status === "partial").length;
  const scheduledCount = me.posts.filter((p) => p.status === "scheduled").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-ink">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xs font-black text-white">
              Ss
            </span>
            Social Skills
          </a>
          <div className="flex items-center gap-3 text-sm">
            <div className="hidden text-right sm:block">
              <div className="font-semibold text-ink">{me.user.name}</div>
              <div className="text-xs text-muted">
                {postedCount} live · {scheduledCount} queued
              </div>
            </div>
            <button className="btn btn-ghost" onClick={logout} type="button">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink md:text-3xl">Publishing desk</h1>
            <p className="prose-mute mt-1 text-sm">Caption → accounts → go. That&apos;s the whole skill.</p>
          </div>
          <div className="flex gap-2 rounded-xl border border-line bg-white p-1">
            {(["compose", "posts", "accounts"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-primary text-white" : "text-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {showTips && (
          <div className="card mb-4 border-primary/30 bg-primary-soft/40 p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-ink">First 60 seconds</div>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
                  <li>Keep the core 4 accounts (or hit Select all)</li>
                  <li>Tweak the caption — or tap Improve caption</li>
                  <li>Upload a clip if IG / TikTok / YouTube are selected</li>
                  <li>Post now and read the per-platform results</li>
                </ol>
              </div>
              <button type="button" className="btn btn-ghost" onClick={dismissTips}>
                Got it
              </button>
            </div>
          </div>
        )}

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" role="status">
            {success}
            {lastPostId && tab === "compose" ? (
              <button type="button" className="ml-2 font-semibold underline" onClick={() => setTab("posts")}>
                View posts
              </button>
            ) : null}
          </div>
        ) : null}

        {tab === "compose" && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <section className="card p-5 md:p-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-ink">Compose</h2>
                <button type="button" className="btn btn-ghost" disabled={busy || !caption.trim()} onClick={improveCaption}>
                  Improve caption
                </button>
              </div>
              <textarea
                className="textarea mb-2"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your caption…"
                maxLength={5000}
              />
              <div className="mb-4 flex justify-between text-xs text-muted">
                <span>{caption.length} chars</span>
                <span>{selected.length} accounts selected</span>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <label className="btn btn-ghost cursor-pointer">
                  {busy ? "Uploading…" : "Upload media"}
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/quicktime,.pdf"
                    className="hidden"
                    disabled={busy}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onUpload(f);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>
                {mediaIds.length === 0 ? (
                  <span className="text-xs text-muted">PNG/JPG/MP4 · required for IG, TikTok, YT, Pinterest</span>
                ) : (
                  mediaIds.map((id) => {
                    const m = mediaMap.get(id);
                    return (
                      <span key={id} className="badge">
                        {m?.name || id}
                        <button type="button" className="ml-1" aria-label="Remove media" onClick={() => setMediaIds((x) => x.filter((i) => i !== id))}>
                          ×
                        </button>
                      </span>
                    );
                  })
                )}
              </div>

              {mediaRequiredMissing.length > 0 && (
                <div className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  {mediaRequiredMissing.join(", ")} need media for a clean publish.
                </div>
              )}

              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                {(
                  [
                    ["now", "Post now", "Publish immediately"],
                    ["schedule", "Schedule", "Pick a time"],
                    ["draft", "Save draft", "Review later"],
                  ] as const
                ).map(([id, label, sub]) => (
                  <button
                    key={id}
                    type="button"
                    className={`platform-chip ${scheduleMode === id ? "active" : ""}`}
                    onClick={() => {
                      setScheduleMode(id);
                      if (id === "schedule" && !scheduledAt) setScheduledAt(defaultScheduleLocal());
                    }}
                  >
                    <div className="font-semibold text-ink">{label}</div>
                    <div className="text-xs text-muted">{sub}</div>
                  </button>
                ))}
              </div>

              {scheduleMode === "schedule" && (
                <label className="mb-4 block text-sm font-medium text-ink">
                  Go live at
                  <input
                    type="datetime-local"
                    className="input mt-1"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                </label>
              )}

              <button type="button" className="btn btn-primary w-full" disabled={busy || !selected.length} onClick={submit}>
                {busy
                  ? "Working…"
                  : scheduleMode === "now"
                    ? `Publish to ${selected.length} account${selected.length === 1 ? "" : "s"}`
                    : scheduleMode === "schedule"
                      ? "Add to queue"
                      : "Save draft"}
              </button>
              <p className="mt-3 text-xs text-muted">
                Local publisher validates each network (media rules, caption limits, X link stripping). Live OAuth publishers plug in when you connect real API keys.
              </p>
            </section>

            <section className="card p-5 md:p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-ink">Accounts</h2>
                <div className="flex gap-2 text-xs">
                  <button type="button" className="badge badge-muted" onClick={selectCore}>
                    Core 4
                  </button>
                  <button type="button" className="badge badge-muted" onClick={selectAll}>
                    All
                  </button>
                  <button type="button" className="badge badge-muted" onClick={() => setSelected([])}>
                    None
                  </button>
                </div>
              </div>
              <div className="grid max-h-[28rem] gap-2 overflow-y-auto pr-1">
                {me.accounts.map((a) => {
                  const meta = platformMeta(a.platform);
                  const active = selected.includes(a.id);
                  return (
                    <button key={a.id} type="button" className={`platform-chip ${active ? "active" : ""}`} onClick={() => toggleAccount(a.id)}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: a.avatarColor }}>
                          {meta.short}
                        </span>
                        <div className="min-w-0 text-left">
                          <div className="truncate font-semibold text-ink">@{a.username}</div>
                          <div className="text-xs text-muted">
                            {meta.label}
                            {meta.needsMedia ? " · media" : ""}
                            {meta.stripsLinks ? " · strips links" : ""}
                          </div>
                        </div>
                        <span className={`ml-auto text-xs font-semibold ${active ? "text-primary-dark" : "text-muted"}`}>
                          {active ? "on" : "off"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {tab === "posts" && (
          <section className="grid gap-4">
            {lastResults && lastResults.length > 0 && (
              <div className="card border-primary/20 p-5">
                <h3 className="mb-1 font-semibold text-ink">Latest run</h3>
                <p className="mb-3 text-sm text-muted">
                  {lastResults.filter((r) => r.success).length}/{lastResults.length} succeeded
                </p>
                <div className="grid gap-2">
                  {lastResults.map((r) => (
                    <div key={`${r.accountId}-${r.platform}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-sm">
                      <span>
                        {platformMeta(r.platform).label} · @{r.username}
                      </span>
                      {r.success ? (
                        <a className="badge badge-ok" href={r.url} target="_blank" rel="noreferrer">
                          success
                        </a>
                      ) : (
                        <span className="badge badge-bad">{r.error}</span>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn-primary mt-4" onClick={() => setTab("compose")}>
                  Compose another
                </button>
              </div>
            )}

            {me.posts.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-muted">No posts yet.</p>
                <button type="button" className="btn btn-primary mt-4" onClick={() => setTab("compose")}>
                  Write your first post
                </button>
              </div>
            ) : (
              me.posts.map((p) => (
                <article key={p.id} className="card p-5">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {statusBadge(p.status)}
                      <span className="text-xs text-muted">{new Date(p.createdAt).toLocaleString()}</span>
                    </div>
                    {(p.status === "draft" || p.status === "scheduled") && (
                      <button type="button" className="text-sm text-red-600" onClick={() => removePost(p.id)}>
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="mb-3 whitespace-pre-wrap text-ink">{p.caption || <em className="text-muted">Media-only post</em>}</p>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {p.accountIds.map((id) => {
                      const a = accountsById.get(id);
                      if (!a) return null;
                      return (
                        <span key={id} className="badge badge-muted">
                          {platformMeta(a.platform).short} @{a.username}
                        </span>
                      );
                    })}
                  </div>
                  {p.scheduledAt && p.status === "scheduled" && (
                    <p className="text-sm text-muted">Scheduled for {new Date(p.scheduledAt).toLocaleString()}</p>
                  )}
                  {p.results?.length > 0 && (
                    <div className="mt-3 grid gap-1 border-t border-line pt-3 text-sm">
                      {p.results.map((r) => (
                        <div key={`${p.id}-${r.accountId}`} className="flex justify-between gap-2">
                          <span>
                            {platformMeta(r.platform).label}: {r.success ? "ok" : r.error}
                          </span>
                          {r.url && (
                            <a href={r.url} className="text-primary-dark underline" target="_blank" rel="noreferrer">
                              view
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </section>
        )}

        {tab === "accounts" && (
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {me.accounts.map((a) => {
              const meta = PLATFORMS.find((p) => p.id === a.platform)!;
              return (
                <div key={a.id} className="card p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: a.avatarColor }}>
                      {meta.short}
                    </span>
                    <div>
                      <div className="font-semibold">{a.displayName}</div>
                      <div className="text-sm text-muted">@{a.username}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{meta.label}</span>
                    <span className="badge badge-ok">connected</span>
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    Max {meta.maxCaption} chars
                    {meta.needsMedia ? " · media required" : ""}
                    {meta.stripsLinks ? " · links stripped on X" : ""}
                  </p>
                </div>
              );
            })}
            <div className="card border-dashed p-5 text-sm text-muted">
              <div className="font-semibold text-ink">Connect more later</div>
              <p className="mt-2">Demo accounts are pre-linked so you can feel the full desk today. Real OAuth connect is the next launch step.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
