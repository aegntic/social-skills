/**
 * aegntic.ai network attribution mark. Swaps between light/dark variants
 * based on the page's theme (`.dark` on <html>, same scheme as ThemeToggle).
 *
 * Optimized for the footer copyright row: small, link to the parent network.
 */
import Image from "next/image";

export function AegnticAttribution({ size = 20 }: { size?: number }) {
  return (
    <a
      href="https://aegntic.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
      aria-label="A network of aegntic.ai"
    >
      {/* Light-mode mark — visible when html is light. */}
      <Image
        src="https://pub-73b57d466bb14bebbe82a4c00eaed502.r2.dev/socialskills/ae-logo-light.png"
        width={size}
        height={size}
        alt=""
        unoptimized
        className="block dark:hidden"
      />
      {/* Dark-mode mark — visible when html has .dark. */}
      <Image
        src="https://pub-73b57d466bb14bebbe82a4c00eaed502.r2.dev/socialskills/ae-logo-dark.png"
        width={size}
        height={size}
        alt=""
        unoptimized
        className="hidden dark:block"
      />
      <span className="text-slate-400 text-xs font-bold">a network of aegntic.ai</span>
    </a>
  );
}
