import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Social image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
