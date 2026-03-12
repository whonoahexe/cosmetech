import { defineArrayMember, defineField, defineType } from "sanity";

export const termsPageType = defineType({
  name: "termsPage",
  title: "Terms & Conditions Page",
  preview: {
    select: {},
    prepare: () => ({ title: "Terms & Conditions Page" }),
  },
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      initialValue: "Terms & Conditions",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
