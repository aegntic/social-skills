"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState(mode === "login" ? "demo@socialskills.app" : "");
  const [password, setPassword] = useState(mode === "login" ? "demo1234" : "");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to authenticate");
      router.push(mode === "signup" ? "/onboarding" : "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  const copyDemoCreds = () => {
    setEmail("demo@socialskills.app");
    setPassword("demo1234");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto my-12 px-4">
      <form onSubmit={onSubmit} className="plush-card p-8 sm:p-10 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-center mb-3">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-slate-200 font-bold text-center">
            {mode === "login"
              ? "Use the demo account or your own."
              : "Takes under a minute. Connect accounts next."}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-800 dark:text-rose-200 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <div className="space-y-4 text-left">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          className="btn-wutang w-full py-3.5 text-sm font-black"
          disabled={busy}
          type="submit"
        >
          {busy ? "Authenticating..." : mode === "login" ? "Log in \u2192" : "Create account \u2192"}
        </button>

        {mode === "login" && (
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-center space-y-2">
            <div className="text-[11px] font-extrabold text-wutang-metallic uppercase tracking-wider">
              1-Click Demo Credentials
            </div>
            <div className="text-xs text-white font-mono">demo@socialskills.app / demo1234</div>
            <button
              type="button"
              onClick={copyDemoCreds}
              className="btn-dark text-[10px] px-3 py-1 font-bold"
            >
              {copied ? "Filled Credentials!" : "Fill Demo Credentials"}
            </button>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-200 font-bold text-center">
            {mode === "login" ? (
              <>
                No account?{" "}
                <Link className="font-extrabold text-wutang-metallic hover:underline" href="/signup">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Have an account?{" "}
                <Link className="font-extrabold text-wutang-metallic hover:underline" href="/login">
                  Log in
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
