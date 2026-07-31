import { cn } from "@/lib/cn";

type Variant = "clay" | "gradient" | "ghost" | "dark" | "wutang" | "azure";

/** A clay button. Presses INTO the clay (inset shadow + settle) on :active.
 *  `wutang`/`azure` are the brand accent surfaces; `dark` is the inverted
 *  clay surface (dark in light mode, light in dark mode) where carved text reads. */
export function ClayButton({
  variant = "clay",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    clay: "clay text-clay-ink",
    gradient: "clay-gradient",
    ghost: "clay-inset text-clay-muted",
    dark: "clay-dark clay-text-carved",
    wutang: "btn-wutang",
    azure: "btn-azure",
  };
  return (
    <button
      className={cn(
        "clay-pressable inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-clay-sm select-none",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
