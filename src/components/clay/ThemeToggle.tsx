"use client";

/** Clay theme toggle. No-FOUC init runs in layout <head>; this flips + persists.
 *  Icon is pure CSS (driven by the .dark class on <html>) — no state, no effect,
 *  no hydration mismatch. */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("ss-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle light / dark clay"
      className={`clay clay-pressable flex h-10 w-10 items-center justify-center rounded-clay-sm text-lg text-clay-ink ${className ?? ""}`}
    >
      <span aria-hidden className="dark:hidden">☾</span>
      <span aria-hidden className="hidden dark:inline">☀</span>
    </button>
  );
}
