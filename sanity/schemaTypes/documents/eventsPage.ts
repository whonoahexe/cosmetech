import { defineField, defineType } from "sanity";

export const eventsPageType = defineType({
  name: "eventsPage",
  title: "Events Page",
  type: "document",
  preview: {
    select: {},
    prepare: () => ({ title: "Events Page" }),
  },
  fields: [
    defineField({
      name: "pageDescription",
      title: "Page description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
