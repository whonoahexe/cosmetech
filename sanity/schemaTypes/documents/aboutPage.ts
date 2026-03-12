import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  preview: {
    select: {},
    prepare: () => ({ title: "About Page" }),
  },
  fields: [
    defineField({
      name: "cosmetechBody",
      title: "Cosmetech body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "fourthWaveBody",
      title: "FourthWave body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
