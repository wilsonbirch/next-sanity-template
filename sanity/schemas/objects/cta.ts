import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Internal path (e.g. /contact) or full URL.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: [
          { title: "Primary (filled)", value: "primary" },
          { title: "Secondary (outline)", value: "secondary" },
          { title: "Link (text only)", value: "link" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
});
