import { PlatformIcon } from "@/components/PlatformIcons";
import { PLATFORMS } from "@/lib/platforms";

const ACTIVE = ["twitter", "instagram", "linkedin", "threads", "bluesky"] as const;

export function ComposeDeskMockup() {
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, var(--electric), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl border bg-white shadow-2xl"
        style={{ borderColor: "oklch(90% 0.005 240)" }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 border-b px-4 py-3"
          style={{ borderColor: "oklch(90% 0.005 240)" }}
        >
          <span className="h-3 w-3 rounded-full" style={{ background: "oklch(75% 0.02 20)" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "oklch(78% 0.03 65)" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "oklch(75% 0.02 155)" }} />
          <span className="ml-3 text-xs font-medium text-muted">
            compose &mdash; socialskills.app
          </span>
        </div>

        {/* Compose body */}
        <div className="space-y-5 p-5 md:p-6">
          {/* Text area mock */}
          <div className="relative">
            <div
              className="rounded-lg border p-4 text-sm leading-relaxed"
              style={{
                borderColor: "oklch(90% 0.005 240)",
                background: "oklch(98% 0.003 240)",
                minHeight: "100px",
              }}
            >
              <span className="text-ink">
                shipped a new per-platform transform engine
              </span>
              <span
                className="ml-0.5 inline-block h-4 w-0.5 align-middle"
                style={{
                  background: "var(--electric)",
                  animation: "caret-blink 1s step-end infinite",
                }}
              />
              <span className="block pt-2 text-muted">
                x strips links. ig validates media. threads gets a question hook.
              </span>
            </div>
            <span
              className="absolute bottom-3 right-3 text-xs tabular-nums"
              style={{ color: "var(--electric)" }}
            >
              142/280
            </span>
          </div>

          {/* Platform selector */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              destinations
            </p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.slice(0, 8).map((p) => {
                const isActive = ACTIVE.includes(p.id as (typeof ACTIVE)[number]);
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 transition-all"
                    style={{
                      borderColor: isActive ? "var(--electric)" : "oklch(90% 0.005 240)",
                      background: isActive ? "var(--electric-soft)" : "white",
                    }}
                  >
                    <PlatformIcon
                      id={p.id}
                      className="h-4 w-4"
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: isActive ? "var(--ink)" : "var(--muted)" }}
                    >
                      {p.short}
                    </span>
                    {isActive && (
                      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" style={{ color: "var(--electric)" }}>
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Per-platform transform preview */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              per-platform preview
            </p>
            <div className="space-y-2">
              {/* X — strips links */}
              <TransformRow
                icon="twitter"
                label="X"
                note="link stripped"
                text="shipped a new per-platform transform engine"
              />
              {/* Instagram — media required */}
              <TransformRow
                icon="instagram"
                label="Instagram"
                note="media required"
                text="shipped a new per-platform transform engine"
                badge
              />
              {/* Threads — hook added */}
              <TransformRow
                icon="threads"
                label="Threads"
                note="question hook"
                text="ever wonder why cross-posting feels so manual? we fixed it."
              />
            </div>
          </div>

          {/* Publish bar */}
          <div
            className="flex items-center justify-between border-t pt-4"
            style={{ borderColor: "oklch(90% 0.005 240)" }}
          >
            <span className="text-xs text-muted">
              <span
                className="inline-block h-2 w-2 rounded-full align-middle"
                style={{ background: "var(--ok)" }}
              />{" "}
              5 accounts ready
            </span>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              style={{ background: "var(--wutang)" }}
            >
              Publish to 5
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating memory layer badge */}
      <div
        className="absolute -bottom-5 -right-3 hidden rounded-xl border bg-white px-4 py-3 shadow-xl md:block"
        style={{ borderColor: "oklch(90% 0.005 240)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "var(--electric-soft)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" style={{ color: "var(--electric)" }}>
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-ink">Memory layer</p>
            <p className="text-[11px] text-muted">learning your voice</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransformRow({
  icon,
  label,
  note,
  text,
  badge,
}: {
  icon: Parameters<typeof PlatformIcon>[0]["id"];
  label: string;
  note: string;
  text: string;
  badge?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg border p-2.5"
      style={{
        borderColor: "oklch(90% 0.005 240)",
        background: "oklch(98% 0.002 240)",
      }}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        <PlatformIcon id={icon} className="h-4 w-4 text-ink" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <span className="text-xs font-semibold text-ink">{label}</span>
          {badge ? (
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                background: "oklch(90% 0.05 65)",
                color: "oklch(40% 0.12 65)",
              }}
            >
              {note}
            </span>
          ) : (
            <span className="text-[10px] font-medium" style={{ color: "var(--electric)" }}>
              {note}
            </span>
          )}
        </div>
        <p className="truncate text-xs text-muted">{text}</p>
      </div>
    </div>
  );
}
