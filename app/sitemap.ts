import type { MetadataRoute } from "next";

import { allPageSlugsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let slugs: string[] = [];
  try {
    slugs = await sanityFetch<string[]>({
      query: allPageSlugsQuery,
      tags: ["page"],
    });
  } catch (error) {
    console.warn("[sitemap] Failed to fetch page slugs:", error);
  }

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
