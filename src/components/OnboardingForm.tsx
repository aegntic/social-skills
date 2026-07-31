"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import type { Platform } from "@/lib/types";

// Mirrors of src/lib/publishers/index.ts sets — duplicated client-side to keep
// server publisher code out of the browser bundle. Only WIRED platforms can be
// connected; others are shown as "coming soon".
const WIRED_PLATFORMS = new Set<Platform>(["bluesky"]);
const NEEDS_CREDENTIALS = new Set<Platform>(["bluesky"]);

type Entry = { platform: Platform; username: string; displayName: string; credentials: string };

export function OnboardingForm({ name }: { name: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<Platform>>(new Set(["bluesky"]));
  const [entries, setEntries] = useState<Record<Platform, Entry>>({
    bluesky: { platform: "bluesky", username: "", displayName: "", credentials: "" },
  } as Record<Platform, Entry>);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function toggle(platform: Platform) {
    if (!WIRED_PLATFORMS.has(platform)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(platform)) {
        next.delete(platform);
      } else {
        next.add(platform);
        if (!entries[platform]) {
          setEntries((e) => ({
            ...e,
            [platform]: { platform, username: "", displayName: "", credentials: "" },
          }));
        }
      }
      return next;
    });
  }

  function updateField(platform: Platform, field: "username" | "displayName" | "credentials", value: string) {
    setEntries((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], [field]: value },
    }));
  }

  const connectable = PLATFORMS.filter((p) => WIRED_PLATFORMS.has(p.id));
  const upcoming = PLATFORMS.filter((p) => !WIRED_PLATFORMS.has(p.id));
  const selectedList = PLATFORMS.filter((p) => selected.has(p.id));
  const validCount = selectedList.filter((p) => {
    const e = entries[p.id];
    if (!e?.username.trim()) return false;
    if (NEEDS_CREDENTIALS.has(p.id) && !e.credentials.trim()) return false;
    return true;
  }).length;

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const valid = selectedList
        .map((p) => entries[p.id])
        .filter((e) => e && e.username.trim() && !(NEEDS_CREDENTIALS.has(e.platform) && !e.credentials.trim()));
      if (!valid.length) {
        throw new Error("Enter your handle and app password for at least one platform");
      }
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accounts: valid.map((e) => ({
            platform: e.platform,
            username: e.username.trim(),
            displayName: e.displayName.trim() || undefined,
            credentials: NEEDS_CREDENTIALS.has(e.platform) ? e.credentials.trim() || undefined : undefined,
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
    <div style={{ background: "var(--bg-page-gradient)", color: "rgb(var(--c-ink))", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <SiteHeader authed={false} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Onboarding Stepper Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-400/15 text-cyan-800 dark:text-acc-cyan border border-cyan-400/40">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Step 2 of 3 &bull; Connect Accounts
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-ink">
            Welcome, {name.split(" ")[0] || "creator"}! 👋
          </h1>
          <p className="text-ink text-sm max-w-lg mx-auto font-bold leading-relaxed">
            Connect a platform by logging into your own account. Publishing only ever uses your stored credentials — no app-level posting. You can connect more from your desk later.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-acc-rose font-extrabold text-xs text-center" role="alert">
            ❌ {error}
          </div>
        )}

        {/* Step 1: Select Platforms */}
        <div className="plush-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-wutang-metallic">
              1. SELECT YOUR PLATFORMS
            </h2>
            <span className="text-xs font-extrabold text-slate-400">{selected.size} selected</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
            {connectable.map((p) => {
              const active = selected.has(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggle(p.id)}
                  className="relative group p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 text-center"
                  style={{
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: active ? "var(--azure-neon)" : "rgba(255, 255, 255, 0.08)",
                    background: active ? "rgba(0, 240, 255, 0.12)" : "rgb(var(--c-fill-3))",
                    transform: active ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <PlatformColorLogo id={p.id} className="h-10 w-10 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black text-white">{p.label}</span>
                  {active && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black shadow-md">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
            {upcoming.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl opacity-40 flex flex-col items-center gap-2 text-center"
                title={`${p.label} — publishing not yet wired`}
                style={{ borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(255, 255, 255, 0.06)", background: "rgb(var(--c-fill-3))" }}
              >
                <PlatformColorLogo id={p.id} className="h-10 w-10" />
                <span className="text-xs font-black text-white">{p.label}</span>
                <span className="text-[10px] text-slate-400">soon</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Enter Handles */}
        {selectedList.length > 0 && (
          <div className="plush-card p-6 md:p-8 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-azure-neon">
              2. ENTER YOUR HANDLE
            </h2>

            <div className="space-y-4">
              {selectedList.map((p) => {
                const e = entries[p.id] || { platform: p.id, username: "", displayName: "", credentials: "" };
                const needsCred = NEEDS_CREDENTIALS.has(p.id);
                return (
                  <div key={p.id} className="p-5 rounded-2xl bg-[rgb(var(--c-fill-2))] border border-slate-700/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PlatformColorLogo id={p.id} className="h-8 w-8" />
                        <span className="font-extrabold text-white text-sm">{p.label}</span>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-bold text-acc-rose hover:text-acc-rose transition-colors px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20"
                        onClick={() => toggle(p.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Username / handle
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm">@</span>
                          <input
                            type="text"
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
                            placeholder="yourhandle"
                            value={e.username}
                            onChange={(ev) => updateField(p.id, "username", ev.target.value)}
                            autoCapitalize="none"
                            autoCorrect="off"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Display name <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
                          placeholder="Your Brand Name"
                          value={e.displayName}
                          onChange={(ev) => updateField(p.id, "displayName", ev.target.value)}
                        />
                      </div>
                    </div>

                    {needsCred && (
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">App password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
                          placeholder="App password"
                          value={e.credentials}
                          onChange={(ev) => updateField(p.id, "credentials", ev.target.value)}
                          autoCapitalize="none"
                          autoCorrect="off"
                          autoComplete="off"
                        />
                        <a
                          href="https://bsky.app/settings/app-passwords"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1.5 text-[11px] text-acc-cyan hover:underline"
                        >
                          Create a Bluesky app password →
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            className="btn-wutang px-8 py-3.5 text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={busy || validCount === 0}
            onClick={submit}
          >
            {busy
              ? "Saving Accounts..."
              : validCount === 0
                ? "Enter your handle to continue"
                : `Connect ${validCount} Account${validCount === 1 ? "" : "s"} &rarr;`}
          </button>

          <button
            type="button"
            className="btn-dark px-6 py-3.5 text-xs font-bold text-slate-300 hover:text-white"
            disabled={busy}
            onClick={skip}
          >
            Skip for now &rarr;
          </button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
