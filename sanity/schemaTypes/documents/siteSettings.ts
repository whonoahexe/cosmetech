import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation links",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
});
