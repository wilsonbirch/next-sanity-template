import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { env } from "@/lib/env";
import { schemaTypes, SINGLETON_TYPES, type SingletonType } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  title: process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE ?? "CMS",
  schema: {
    types: schemaTypes,
    // Singletons can't be created or deleted from the studio UI.
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !SINGLETON_TYPES.includes(schemaType as SingletonType),
      ),
  },
  document: {
    actions: (input, { schemaType }) =>
      SINGLETON_TYPES.includes(schemaType as SingletonType)
        ? input.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION })],
});
