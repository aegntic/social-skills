"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState(mode === "login" ? "demo@socialskills.app" : "");
  const [password, setPassword] = useState(mode === "login" ? "demo1234" : "");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push(mode === "signup" ? "/onboarding" : "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto w-full max-w-md p-6 md:p-8">
      <h1 className="mb-1 text-2xl font-bold text-ink">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <p className="mb-6 text-sm text-muted">
        {mode === "login" ? "Use the demo account or your own." : "Takes under a minute. You'll connect your accounts next."}
      </p>
      {mode === "signup" && (
        <label className="mb-3 block text-sm font-medium">
          Name
          <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" />
        </label>
      )}
      <label className="mb-3 block text-sm font-medium">
        Email
        <input className="input mt-1" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="mb-4 block text-sm font-medium">
        Password
        <input className="input mt-1" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      <button className="btn btn-primary w-full" disabled={busy} type="submit">
        {busy ? "…" : mode === "login" ? "Log in" : "Sign up"}
      </button>
      <p className="mt-4 text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            No account? <Link className="font-semibold text-primary-dark" href="/signup">Sign up</Link>
          </>
        ) : (
          <>
            Have an account? <Link className="font-semibold text-primary-dark" href="/login">Log in</Link>
          </>
        )}
      </p>
      {mode === "login" && (
        <p className="mt-2 text-center text-xs text-muted">Demo: demo@socialskills.app / demo1234</p>
      )}
    </form>
  );
}
