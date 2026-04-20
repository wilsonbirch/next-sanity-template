import type { SchemaTypeDefinition } from "sanity";

import { cta } from "./objects/cta";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";

import { page } from "./documents/page";

import { homePage } from "./singletons/homePage";
import { siteSettings } from "./singletons/siteSettings";

export const SINGLETON_TYPES = ["siteSettings", "homePage"] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  cta,
  imageWithAlt,
  seo,
  page,
  siteSettings,
  homePage,
];
