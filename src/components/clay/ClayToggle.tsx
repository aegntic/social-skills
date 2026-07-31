"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Clay toggle: a knob slides across a clay well. The clay track stays sunk-in. */
export function ClayToggle({
  defaultOn = false,
  className,
}: {
  defaultOn?: boolean;
  className?: string;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "clay-inset relative flex h-10 w-20 items-center rounded-full px-1 clay-pressable",
        className,
      )}
    >
      <span
        className={cn(
          "block h-8 w-8 rounded-full clay transition-transform duration-300",
          on ? "translate-x-10" : "translate-x-0",
        )}
      />
    </button>
  );
}
