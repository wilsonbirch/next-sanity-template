"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type NavLink = { label: string; href: string };
type Cta = { label: string; href: string } | null;

export function MobileNav({
  links,
  cta,
}: {
  links: ReadonlyArray<NavLink>;
  cta: Cta;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          pointerEvents: open ? "auto" : "none",
        }}
        className="lg:hidden"
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            opacity: open ? 1 : 0,
            transition: "opacity 300ms",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "22rem",
            boxShadow: "-8px 0 32px rgba(0,0,0,0.25)",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 300ms",
          }}
        >
          <div
            style={{ backgroundColor: "var(--color-bg)" }}
            className="flex items-center justify-between border-b border-[color:var(--color-rule)] px-6 py-4"
          >
            <span className="font-display text-lg">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
          <nav
            style={{ backgroundColor: "var(--color-bg)", flex: "1 1 auto" }}
            className="flex flex-col gap-1 px-4 py-6 text-lg"
          >
            {links.map((link) => {
              const active =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "rounded-md px-4 py-3 font-display transition",
                    active
                      ? "bg-[color:var(--color-rule)]/60 text-[color:var(--color-brand)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-rule)]/40",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          {cta && (
            <div
              style={{ backgroundColor: "var(--color-bg)" }}
              className="mt-auto border-t border-[color:var(--color-rule)] px-6 py-6"
            >
              <Link
                href={cta.href}
                onClick={close}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[color:var(--color-brand)] px-6 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)]"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
