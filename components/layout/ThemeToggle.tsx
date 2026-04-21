"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const STORE_EVENT = "themechange";

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

function readTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(STORE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STORE_EVENT, onChange);
  };
}

const getServerSnapshot = (): Theme => "system";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  function cycle() {
    const next: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    if (next === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next);
    window.dispatchEvent(new Event(STORE_EVENT));
  }

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const label =
    theme === "light"
      ? "Switch to dark theme"
      : theme === "dark"
        ? "Switch to system theme"
        : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40",
        className,
      )}
    >
      <Icon aria-hidden className="h-5 w-5" suppressHydrationWarning />
    </button>
  );
}
