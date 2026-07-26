import Link from "next/link";

function LogoMark() {
  return (
    <span
      className="display inline-flex items-center justify-center rounded-md bg-ink px-2 py-0.5 text-sm font-bold tracking-tight"
      style={{ fontVariationSettings: '"opsz" 14, "SOFT" 0, "WONK" 0' }}
    >
      <span style={{ color: "var(--background)" }}>S</span>
      <span style={{ color: "var(--primary)" }}>s</span>
    </span>
  );
}

export function SiteHeader({ authed }: { authed?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-ink">
          <LogoMark />
          <span className="display text-lg leading-none" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20' }}>
            Social Skills
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          <Link href="/#features" className="transition-colors hover:text-ink">
            Features
          </Link>
          <Link href="/#how" className="transition-colors hover:text-ink">
            How
          </Link>
          <Link href="/#pricing" className="transition-colors hover:text-ink">
            Pricing
          </Link>
          <Link href="/journey" className="transition-colors hover:text-ink">
            Journey
          </Link>
          <Link href="/compare" className="transition-colors hover:text-ink">
            Compare
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {authed ? (
            <Link href="/dashboard" className="btn btn-primary">
              Open desk
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-link hidden sm:inline-flex">
                Log in
              </Link>
              <Link href="/signup" className="btn btn-primary">
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <LogoMark />
              <span
                className="display text-xl font-bold text-ink"
                style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20' }}
              >
                Social Skills
              </span>
            </div>
            <p className="prose-mute max-w-sm text-sm">
              The cross-post desk for creators who ship. One caption, ten networks, and a memory layer
              that actually remembers your voice.
            </p>
            <p className="mt-4 text-sm text-muted">hello@socialskills.app</p>
          </div>
          <div>
            <div className="mb-4 section-label">Product</div>
            <div className="flex flex-col gap-2.5 text-sm text-muted">
              <Link href="/signup" className="transition-colors hover:text-ink">Start free</Link>
              <Link href="/dashboard" className="transition-colors hover:text-ink">Compose desk</Link>
              <Link href="/journey" className="transition-colors hover:text-ink">Journey</Link>
              <Link href="/#pricing" className="transition-colors hover:text-ink">Pricing</Link>
            </div>
          </div>
          <div>
            <div className="mb-4 section-label">Comparisons</div>
            <div className="flex flex-col gap-2.5 text-sm text-muted">
              <Link href="/compare/post-bridge" className="transition-colors hover:text-ink">vs Post Bridge</Link>
              <Link href="/compare/buffer" className="transition-colors hover:text-ink">vs Buffer</Link>
              <Link href="/compare/postiz" className="transition-colors hover:text-ink">vs Postiz</Link>
              <Link href="/compare" className="transition-colors hover:text-ink">All comparisons</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex items-center justify-between py-5 text-xs text-muted">
          <span>(c) {new Date().getFullYear()} Social Skills</span>
          <span className="display italic" style={{ fontVariationSettings: '"opsz" 14, "SOFT" 50, "WONK" 1' }}>
            ship once, show up everywhere
          </span>
        </div>
      </div>
    </footer>
  );
}
