import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "cosmetechTitle",
      title: "Cosmetech section title",
      type: "string",
      initialValue: "About Cosmetech",
    }),
    defineField({
      name: "cosmetechBody",
      title: "Cosmetech body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "quickLinks",
      title: "Quick links",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
    }),
    defineField({
      name: "fourthWaveTitle",
      title: "FourthWave section title",
      type: "string",
      initialValue: "About FourthWave",
    }),
    defineField({
      name: "fourthWaveBody",
      title: "FourthWave body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "fourthWaveLink",
      title: "FourthWave link",
      type: "ctaLink",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
