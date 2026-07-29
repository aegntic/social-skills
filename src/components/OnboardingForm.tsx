"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import type { Platform } from "@/lib/types";

type Entry = { platform: Platform; username: string; displayName: string };

export function OnboardingForm({ name }: { name: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<Platform>>(new Set(["tiktok"]));
  const [entries, setEntries] = useState<Record<Platform, Entry>>({
    tiktok: { platform: "tiktok", username: "afterslop", displayName: "Afterslop" },
  } as Record<Platform, Entry>);
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
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="min-h-screen flex flex-col">
      <SiteHeader authed={false} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Onboarding Stepper Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-400/15 text-cyan-900 border border-cyan-400/40">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Step 2 of 3 &bull; Connect Accounts
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Welcome, {name.split(" ")[0] || "creator"}! 👋
          </h1>
          <p className="text-slate-800 text-sm max-w-lg mx-auto font-bold leading-relaxed">
            Pick the platforms you publish to and enter your handle for each. You can change these anytime in your desk settings.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-300 font-extrabold text-xs text-center" role="alert">
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
            {PLATFORMS.map((p) => {
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
                    background: active ? "rgba(0, 240, 255, 0.12)" : "#020617",
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
          </div>
        </div>

        {/* Step 2: Enter Handles */}
        {selectedList.length > 0 && (
          <div className="plush-card p-6 md:p-8 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-azure-neon">
              2. ENTER YOUR HANDLES
            </h2>

            <div className="space-y-4">
              {selectedList.map((p) => {
                const e = entries[p.id] || { platform: p.id, username: "", displayName: "" };
                return (
                  <div key={p.id} className="p-5 rounded-2xl bg-[#161920] border border-slate-700/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PlatformColorLogo id={p.id} className="h-8 w-8" />
                        <span className="font-extrabold text-white text-sm">{p.label}</span>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20"
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
                ? "Enter a handle to continue"
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
