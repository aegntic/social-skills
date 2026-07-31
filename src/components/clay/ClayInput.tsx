import { cn } from "@/lib/cn";

/** A sunk-in clay field — text sits in an impression in the clay. */
export function ClayInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "clay-inset w-full px-4 py-3 bg-transparent text-clay-ink placeholder:text-clay-muted",
        "focus:outline-none focus:ring-2 focus:ring-clay-cyan/40",
        className,
      )}
      {...props}
    />
  );
}
