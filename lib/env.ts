/**
 * Centralised env access. Throws loudly if a required variable is missing —
 * better to fail at boot than to silently render broken pages.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `See .env.example and copy it to .env.local.`,
    );
  }
  return value;
}

const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);
const dataset = required(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const env = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  NEXT_PUBLIC_SANITY_API_VERSION:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01",
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN ?? "",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
