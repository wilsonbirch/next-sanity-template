import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "The H1 shown above the form.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Short paragraph displayed under the heading.",
    }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "string",
      description: "Shown after the form is submitted successfully.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
