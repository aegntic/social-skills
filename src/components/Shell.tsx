import Link from "next/link";

function LogoMark({ size = 8 }: { size?: number }) {
  return (
    <span
      className={`inline-flex h-${size} w-${size} items-center justify-center rounded-xl bg-primary text-sm font-black tracking-tight text-white shadow-sm`}
      style={{ width: size * 4, height: size * 4 }}
    >
      Ss
    </span>
  );
}

export function SiteHeader({ authed }: { authed?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-ink">
          <LogoMark />
          <span className="leading-none">
            Social Skills
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              cross-post desk
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          <Link href="/#features" className="hover:text-ink">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/compare" className="hover:text-ink">
            Compare
          </Link>
          <Link href="/journey" className="hover:text-ink">
            Journey
          </Link>
          <Link href="/#platforms" className="hover:text-ink">
            Platforms
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {authed ? (
            <Link href="/dashboard" className="btn btn-primary">
              Open desk
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost hidden sm:inline-flex">
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
    <footer className="mt-auto border-t border-line bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2 font-bold text-ink">
            <LogoMark />
            Social Skills
          </div>
          <p className="prose-mute max-w-md text-sm">
            The social skill that actually pays: post once, show up everywhere. Built for creators who would rather ship than babysit tabs.
          </p>
          <p className="mt-3 text-sm text-muted">
            hello@socialskills.app
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-ink">Product</div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/signup">Start free</Link>
            <Link href="/dashboard">Compose desk</Link>
            <Link href="/journey">Journey</Link>
            <Link href="/compare">Comparisons</Link>
            <Link href="/#pricing">Pricing</Link>
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-ink">Get found</div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/compare/post-bridge">Post Bridge alternative</Link>
            <Link href="/compare/buffer">Buffer alternative</Link>
            <Link href="/compare/postiz">Postiz alternative</Link>
            <Link href="/compare">All comparisons</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Social Skills · Cross-posting for people who ship
      </div>
    </footer>
  );
}
