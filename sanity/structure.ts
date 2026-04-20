import type { StructureResolver } from "sanity/structure";

import { SINGLETON_TYPES } from "./schemas";

const SINGLETON_TITLES: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETON_TYPES.map((type) =>
        S.listItem()
          .title(SINGLETON_TITLES[type] ?? type)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
    ]);
