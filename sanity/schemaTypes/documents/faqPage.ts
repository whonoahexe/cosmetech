import { defineArrayMember, defineField, defineType } from "sanity";

export const faqPageType = defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      initialValue: "Frequently asked questions",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [defineArrayMember({ type: "faqSection" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
