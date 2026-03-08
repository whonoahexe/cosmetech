import { defineArrayMember, defineField, defineType } from "sanity";

export const heroSlideType = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content reference",
      type: "reference",
      to: [{ type: "article" }, { type: "event" }, { type: "advertisement" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overrideTitle",
      title: "Override title",
      type: "string",
    }),
    defineField({
      name: "overrideExcerpt",
      title: "Override excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "overrideImage",
      title: "Override image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "tags",
      title: "Visible tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
  ],
});
