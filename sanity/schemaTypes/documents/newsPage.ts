import { defineArrayMember, defineField, defineType } from "sanity";

export const newsPageType = defineType({
  name: "newsPage",
  title: "News Page",
  type: "document",
  preview: {
    select: {},
    prepare: () => ({ title: "News Page" }),
  },
  fields: [
    defineField({
      name: "pageDescription",
      title: "Page description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featuredBanner",
      title: "Featured banner",
      type: "reference",
      to: [{ type: "article" }, { type: "advertisement" }],
    }),
    defineField({
      name: "highlightedStories",
      title: "Highlighted stories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }, { type: "advertisement" }],
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
