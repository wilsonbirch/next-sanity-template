import Link from "next/link";

import { cn } from "@/lib/cn";

export function Logo({
  businessName,
  className,
}: {
  businessName: string;
  className?: string;
}) {
  // Two-line wordmark — the existing Weebly site uses an all-caps treatment;
  // we keep that signal but in a more contemporary serif/sans split.
  const [first, ...rest] = businessName.split(" ");
  const tail = rest.join(" ");

  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn(
        "group inline-flex flex-col leading-none tracking-tight transition",
        className,
      )}
    >
      <span className="font-display text-xl text-[color:var(--color-ink)] sm:text-2xl">
        {first}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[color:var(--color-brand-soft)] sm:text-[11px]">
        {tail}
      </span>
    </Link>
  );
}
