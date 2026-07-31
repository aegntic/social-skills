import { cn } from "@/lib/cn";

/** A raised matte-clay surface. Use for any container that should read as clay. */
export function ClayCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("clay p-7 rounded-clay text-clay-ink", className)} {...props}>
      {children}
    </div>
  );
}
