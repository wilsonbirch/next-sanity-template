import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Overrides the page title in the browser tab and search results (max ~60 chars).",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Shown in search results and link previews (max ~160 chars).",
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
