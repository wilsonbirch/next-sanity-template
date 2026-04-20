/**
 * Shared validation schema — imported by both the client form
 * (for inline error display) and the API route (for trusted
 * server-side validation).
 */

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "A short message helps us reply")
    .max(4000, "Keep it under 4000 characters"),
  // Honeypot — real users leave this empty.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };
