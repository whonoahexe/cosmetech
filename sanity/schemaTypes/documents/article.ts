import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
    },
  },
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "imageMode",
      title: "Cover image source",
      type: "string",
      options: {
        list: [
          { title: "AI Generated", value: "generated" },
          { title: "Custom Upload", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "custom",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.imageMode !== "custom",
    }),
    defineField({
      name: "publishDate",
      title: "Publish date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contentKinds",
      title: "Content types",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "Article", value: "article" },
              { title: "News", value: "news" },
              { title: "Press Release", value: "pressRelease" },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      validation: (rule) => rule.required().min(1).max(8),
    }),
    defineField({
      name: "isSponsored",
      title: "Sponsored",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sponsoredMeta",
      title: "Sponsored meta",
      type: "sponsoredMeta",
      hidden: ({ parent }) => !parent?.isSponsored,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image" })],
    }),
    defineField({
      name: "relatedArticles",
      title: "Related articles",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
