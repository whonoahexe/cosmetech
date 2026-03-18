import { defineArrayMember, defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroArticle",
      title: "Hero article",
      type: "reference",
      to: [{ type: "article" }],
      options: {
        filter: ({ document }) => ({
          filter: "references($catId)",
          params: { catId: document._id },
        }),
      },
    }),
    defineField({
      name: "highlightedArticles",
      title: "Highlighted articles / ads",
      description: "Articles and advertisements to feature in this category section.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }, { type: "advertisement" }],
        }),
      ],
      validation: (rule) => rule.max(8),
    }),
  ],
});
