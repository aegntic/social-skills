"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import type { Platform } from "@/lib/types";

type Entry = { platform: Platform; username: string; displayName: string };

export function OnboardingForm({ name }: { name: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<Platform>>(new Set());
  const [entries, setEntries] = useState<Record<Platform, Entry>>({} as Record<Platform, Entry>);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
  const validCount = selectedList.filter((p) => {
    const e = entries[p.id];
    return e && e.username.trim();
  }).length;

  async function submit() {
    setBusy(true);
    setError("");
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
      if (!res.ok) throw new Error(data.error || "Failed to save accounts");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function skip() {
    setBusy(true);
    router.push("/dashboard");
  }

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
        </div>
      </header>

      <div className="container-page py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ink md:text-3xl">
              Welcome, {name.split(" ")[0] || "creator"}
            </h1>
            <p className="prose-mute mt-2 text-sm md:text-base">
              Pick the platforms you publish to and enter your handle for each. You can change these later.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              1. Select your platforms
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {PLATFORMS.map((p) => {
                const active = selected.has(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.id)}
                    className={`platform-chip ${active ? "active" : ""}`}
                    aria-pressed={active}
                  >
                    <div className="flex flex-col items-center gap-2 py-2">
                      <PlatformColorLogo id={p.id} className="h-10 w-10" />
                      <span className="text-sm font-semibold text-ink">{p.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {selectedList.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                2. Enter your handles
              </h2>
              <div className="grid gap-3">
                {selectedList.map((p) => {
                  const e = entries[p.id] || { platform: p.id, username: "", displayName: "" };
                  return (
                    <div key={p.id} className="card p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <PlatformColorLogo id={p.id} className="h-9 w-9" />
                        <span className="font-semibold text-ink">{p.label}</span>
                        <button
                          type="button"
                          className="ml-auto text-xs text-red-600"
                          onClick={() => toggle(p.id)}
                        >
                          remove
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block text-sm font-medium">
                          <span className="text-muted">Username / handle</span>
                          <div className="mt-1 flex items-center rounded-lg border border-line bg-white">
                            <span className="pl-3 text-muted">@</span>
                            <input
                              className="input border-0 bg-transparent pl-0"
                              placeholder="yourhandle"
                              value={e.username}
                              onChange={(ev) => updateField(p.id, "username", ev.target.value)}
                              autoCapitalize="none"
                              autoCorrect="off"
                            />
                          </div>
                        </label>
                        <label className="block text-sm font-medium">
                          <span className="text-muted">Display name (optional)</span>
                          <input
                            className="input mt-1"
                            placeholder="Your Brand"
                            value={e.displayName}
                            onChange={(ev) => updateField(p.id, "displayName", ev.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-primary"
              disabled={busy || validCount === 0}
              onClick={submit}
            >
              {busy
                ? "Saving…"
                : validCount === 0
                  ? "Enter a handle to continue"
                  : `Connect ${validCount} account${validCount === 1 ? "" : "s"}`}
            </button>
            <button type="button" className="btn btn-ghost" disabled={busy} onClick={skip}>
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
