import type { StructureResolver } from "sanity/structure";

import { SINGLETON_TYPES } from "./schemas";

const SINGLETON_TITLES: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home",
  contactPage: "Contact",
};

// Generic `page` docs to pin alongside the singletons under "Pages".
// Editors still see the full collection further down under "All pages",
// so removing/renaming a pinned doc just hides it from the shortcut.
const PINNED_PAGES: { id: string; title: string }[] = [
  { id: "page-about", title: "About" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...SINGLETON_TYPES.filter((t) => t !== "siteSettings").map((type) =>
        S.listItem()
          .title(SINGLETON_TITLES[type] ?? type)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      ...PINNED_PAGES.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType("page").documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem("page").title("All pages"),
    ]);
