import { defineArrayMember, defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
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
      name: "appliesTo",
      title: "Applies to",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: ["article", "news", "pressRelease", "event", "category", "advertisement"],
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
});
