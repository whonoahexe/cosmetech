import { defineArrayMember, defineField, defineType } from "sanity";

export const feedSectionType = defineType({
  name: "feedSection",
  title: "Feed Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: {
        list: ["latest", "popular", "sponsored", "manual"],
        layout: "radio",
      },
      initialValue: "latest",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "limit",
      title: "Item limit",
      type: "number",
      initialValue: 6,
      validation: (rule) => rule.min(1).max(24),
    }),
    defineField({
      name: "contentTypes",
      title: "Content types",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: ["article", "event", "advertisement"],
          },
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Category filters",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "topics",
      title: "Topic filters",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    }),
    defineField({
      name: "manualItems",
      title: "Manual items",
      type: "array",
      hidden: ({ parent }) => parent?.mode !== "manual",
      of: [
        defineArrayMember({
          name: "manualArticle",
          type: "reference",
          to: [{ type: "article" }],
        }),
        defineArrayMember({
          name: "manualEvent",
          type: "reference",
          to: [{ type: "event" }],
        }),
        defineArrayMember({
          name: "manualAdvertisement",
          type: "reference",
          to: [{ type: "advertisement" }],
        }),
      ],
    }),
  ],
});
