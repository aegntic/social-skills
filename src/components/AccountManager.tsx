"use client";

import { useState } from "react";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform, SocialAccount } from "@/lib/types";

type Props = {
  existing: SocialAccount[];
  onClose: () => void;
  onChanged: () => Promise<void>;
};

type Entry = { platform: Platform; username: string; displayName: string };

export function AccountManager({ existing, onClose, onChanged }: Props) {
  const existingPlatforms = new Set(existing.map((a) => a.platform));
  const available = PLATFORMS.filter((p) => !existingPlatforms.has(p.id));

  const [selected, setSelected] = useState<Set<Platform>>(new Set());
  const [entries, setEntries] = useState<Record<Platform, Entry>>({} as Record<Platform, Entry>);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function toggle(platform: Platform) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(platform)) {
        next.delete(platform);
      } else {
        next.add(platform);
        if (!entries[platform]) {
          setEntries((e) => ({
            ...e,
            [platform]: { platform, username: "", displayName: "" },
          }));
        }
      }
      return next;
    });
  }

  function updateField(platform: Platform, field: "username" | "displayName", value: string) {
    setEntries((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], [field]: value },
    }));
  }

  const selectedList = PLATFORMS.filter((p) => selected.has(p.id));
  const validCount = selectedList.filter((p) => entries[p.id]?.username.trim()).length;

  async function addAccounts() {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const valid = selectedList
        .map((p) => entries[p.id])
        .filter((e) => e && e.username.trim());
      if (!valid.length) {
        throw new Error("Enter a username for at least one platform");
      }
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accounts: valid.map((e) => ({
            platform: e.platform,
            username: e.username.trim(),
            displayName: e.displayName.trim() || undefined,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSuccess(`Connected ${data.accounts.length} account(s)`);
      setSelected(new Set());
      setEntries({} as Record<Platform, Entry>);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function removeAccount(id: number, label: string) {
    if (!confirm(`Remove ${label}? This detaches it from all posts.`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/accounts?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSuccess("Account removed");
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">Manage accounts</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
            {success}
          </div>
        )}

        {existing.length > 0 && (
          <section className="mb-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
              Connected ({existing.length})
            </h3>
            <div className="grid gap-2">
              {existing.map((a) => {
                const meta = PLATFORMS.find((p) => p.id === a.platform)!;
                return (
                  <div key={a.id} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2">
                    <PlatformColorLogo id={a.platform} className="h-8 w-8 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-ink">@{a.username}</div>
                      <div className="text-xs text-muted">{meta.label}</div>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-red-600 hover:underline"
                      disabled={busy}
                      onClick={() => removeAccount(a.id, `${meta.label} @${a.username}`)}
                    >
                      remove
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {available.length > 0 ? (
          <section>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
              Add a platform
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
              {available.map((p) => {
                const active = selected.has(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.id)}
                    className={`platform-chip ${active ? "active" : ""}`}
                    aria-pressed={active}
                  >
                    <div className="flex flex-col items-center gap-1 py-1">
                      <PlatformColorLogo id={p.id} className="h-8 w-8" />
                      <span className="text-xs font-semibold text-ink">{p.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedList.length > 0 && (
              <div className="grid gap-3">
                {selectedList.map((p) => {
                  const e = entries[p.id] || { platform: p.id, username: "", displayName: "" };
                  return (
                    <div key={p.id} className="rounded-lg border border-line p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <PlatformColorLogo id={p.id} className="h-7 w-7" />
                        <span className="text-sm font-semibold text-ink">{p.label}</span>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center rounded-lg border border-line bg-white">
                          <span className="pl-3 text-muted">@</span>
                          <input
                            className="input border-0 bg-transparent pl-0"
                            placeholder="username"
                            value={e.username}
                            onChange={(ev) => updateField(p.id, "username", ev.target.value)}
                            autoCapitalize="none"
                            autoCorrect="off"
                          />
                        </div>
                        <input
                          className="input"
                          placeholder="Display name (optional)"
                          value={e.displayName}
                          onChange={(ev) => updateField(p.id, "displayName", ev.target.value)}
                        />
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={busy || validCount === 0}
                  onClick={addAccounts}
                >
                  {busy ? "Saving…" : `Connect ${validCount} account${validCount === 1 ? "" : "s"}`}
                </button>
              </div>
            )}
          </section>
        ) : (
          <p className="text-sm text-muted">All platforms are connected.</p>
        )}

        <div className="mt-6 flex justify-end">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
