"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Clay pill nav. Active item is sunk into the clay; others sit flush. */
export function ClayNav({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const [active, setActive] = useState(items[0] ?? "");
  return (
    <nav className={cn("clay inline-flex gap-1 rounded-full p-1.5", className)}>
      {items.map((it) => (
        <button
          key={it}
          onClick={() => setActive(it)}
          className={cn(
            "clay-pressable rounded-full px-4 py-2 text-sm font-semibold",
            active === it ? "clay-inset text-clay-ink" : "text-clay-muted",
          )}
        >
          {it}
        </button>
      ))}
    </nav>
  );
}
