/**
 * Embedded Sanity Studio route. Sanity needs full client-side rendering and
 * its own metadata viewport, so we opt out of Next's automatic behaviours.
 */

"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
