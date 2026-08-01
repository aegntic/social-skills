/**
 * Brand marks for Social Skills.
 *
 * The current production wordmark is "S/" in wutang-metallic — text only.
 * Variants below are alternatives to compare. Swap by changing the export
 * in `defaultMark`.
 *
 * Design notes:
 *  - "S/" reads as "Social /" or a directory slash — keeps the bridge/desk metaphor.
 *  - The network mark (ae-monogram) lives at the parent-network level; using it
 *    here would muddle hierarchy. Better: a small mark + the wordmark.
 *  - All variants honor the light/clay theme — use currentColor for ink.
 */

import type { SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
};

/* ──────────────────────────────────────────────────────────────────
 * Variant A — "S/" wordmark (current production)
 * Honest text mark, no SVG. Sits where the current span sits.
 * ────────────────────────────────────────────────────────────────── */
export function MarkText({ className = "" }: { className?: string }) {
  return (
    <span className={`font-black text-wutang-metallic ${className}`} aria-label="Social Skills">
      S/
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Variant B — Drawn "S/" as SVG.
 * Same reading, but the slash becomes a real diagonal stroke with
 * weight and the "S" gets two horizontal cuts to read as
 * "social /" rather than just a letter. Sharp, confident, minimal.
 * ────────────────────────────────────────────────────────────────── */
export function MarkDrawn(props: MarkProps) {
  return (
    <svg viewBox="0 0 64 32" role="img" aria-label="Social Skills" {...props}>
      <g fill="currentColor">
        {/* S — single continuous stroke with two cuts */}
        <path d="M3 9.2c0-3.4 2.7-6 7.2-6 4.2 0 6.8 2.2 7.4 5.6h-4.2c-.4-1.4-1.5-2.2-3.2-2.2-1.8 0-2.9.9-2.9 2.3 0 1.4 1 1.9 3.3 2.3l2.4.5c3.6.7 5.3 2.4 5.3 5.4 0 3.6-3 6.1-7.5 6.1-4.6 0-7.4-2.4-7.8-5.9h4.2c.4 1.5 1.6 2.4 3.6 2.4 2 0 3.1-.9 3.1-2.4 0-1.3-.9-1.9-3.1-2.3l-2.4-.5c-3.5-.7-5.4-2.3-5.4-5.3z" />
        {/* / — diagonal slash, full-bleed, sharp */}
        <path d="M28 30 L36 2 L40 2 L32 30 Z" />
        {/* Secondary "S" stroke to reinforce the "S/" reading without overcomplicating */}
        <rect x="44" y="2" width="17" height="3" />
        <rect x="44" y="14.5" width="13" height="3" />
        <rect x="44" y="27" width="17" height="3" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Variant C — "Network node".
 * A small cluster of nodes reads as "one of several" without naming
 * the parent. The center node carries the SS wordmark; the surrounding
 * nodes are quieter (lower opacity, smaller).
 * ────────────────────────────────────────────────────────────────── */
export function MarkNetwork(props: MarkProps) {
  return (
    <svg viewBox="0 0 64 32" role="img" aria-label="Social Skills" {...props}>
      {/* connecting hairlines */}
      <line x1="6" y1="22" x2="32" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <line x1="32" y1="16" x2="58" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <line x1="32" y1="16" x2="50" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      {/* surrounding nodes */}
      <circle cx="6" cy="22" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="50" cy="26" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="58" cy="6" r="1.8" fill="currentColor" opacity="0.4" />
      {/* center node — "SS" wordmark in a small disk */}
      <circle cx="32" cy="16" r="9" fill="currentColor" />
      <style>{`
        .ss-mark-text { fill: rgb(var(--c-base, 201 199 196)); }
        .dark .ss-mark-text { fill: rgb(var(--c-base, 122 126 132)); }
      `}</style>
      <text
        className="ss-mark-text"
        x="32"
        y="16"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Nunito', sans-serif"
        fontSize="9"
        fontWeight="900"
        letterSpacing="-0.4"
      >
        SS
      </text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Variant D — "Sigil".
 * A custom glyph: an S-shape made of two interlocking circles
 * with a horizontal cut, evoking both an "S" and a publish/forward
 * motion. No letters, no reading — pure mark. Most "designed."
 * ────────────────────────────────────────────────────────────────── */
export function MarkSigil(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label="Social Skills" {...props}>
      <g fill="currentColor" fillRule="evenodd">
        <path d="M16 4c-6.6 0-12 5.4-12 12 0 5.5 3.7 10.1 8.7 11.6L11 24.2c-3.6-1.3-6.2-4.7-6.2-8.7 0-5.1 4.1-9.2 9.2-9.2 3.3 0 6.2 1.7 7.8 4.3h-3.5c-1.1-1-2.6-1.6-4.3-1.6z" />
        <path d="M16 28c6.6 0 12-5.4 12-12 0-5.5-3.7-10.1-8.7-11.6L21 7.8c3.6 1.3 6.2 4.7 6.2 8.7 0 5.1-4.1 9.2-9.2 9.2-3.3 0-6.2-1.7-7.8-4.3h3.5c1.1 1 2.6 1.6 4.3 1.6z" opacity="0.45" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Default export — flip this when you decide.
 * Currently Variant A (the existing text mark).
 * ────────────────────────────────────────────────────────────────── */
export const defaultMark = MarkNetwork;
export { defaultMark as BrandMark };
