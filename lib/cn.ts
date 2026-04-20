import clsx, { type ClassValue } from "clsx";

/**
 * Tiny class-name composer. Wraps clsx so we have one import path
 * and can swap implementations later (e.g. tailwind-merge) without
 * touching call sites.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
