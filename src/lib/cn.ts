/** Tiny className joiner — dependency-free clsx subset. */
export function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}
