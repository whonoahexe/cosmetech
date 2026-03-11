import { defineArrayMember, defineField, defineType } from "sanity";

export const privacyPolicyPageType = defineType({
  name: "privacyPolicyPage",
  title: "Privacy Policy Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      initialValue: "Privacy Policy",
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
