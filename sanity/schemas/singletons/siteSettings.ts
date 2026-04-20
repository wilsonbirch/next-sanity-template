import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (Rule) => Rule.required() },
            { name: "href", title: "Link", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: "headerCta",
      title: "Header CTA",
      type: "cta",
    }),
    defineField({
      name: "phone",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "address",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      fields: [
        { name: "facebook", type: "url" },
        { name: "instagram", type: "url" },
        { name: "twitter", type: "url" },
        { name: "linkedin", type: "url" },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
