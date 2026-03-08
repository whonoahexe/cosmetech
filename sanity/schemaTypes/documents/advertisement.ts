import { defineArrayMember, defineField, defineType } from "sanity";

export const advertisementType = defineType({
  name: "advertisement",
  title: "Advertisement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "destinationUrl",
      title: "Destination URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
    }),
    defineField({
      name: "advertiser",
      title: "Advertiser",
      type: "string",
    }),
    defineField({
      name: "activeFrom",
      title: "Active from",
      type: "datetime",
    }),
    defineField({
      name: "activeTo",
      title: "Active to",
      type: "datetime",
    }),
    defineField({
      name: "targetPages",
      title: "Target pages",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: ["homepage", "category", "article", "news", "events", "about", "contact"],
          },
        }),
      ],
    }),
    defineField({
      name: "targetCategories",
      title: "Target categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "targetTopics",
      title: "Target topics",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "topic" }] })],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "renderVariant",
      title: "Render variant",
      type: "string",
      options: {
        list: ["nativeCard", "banner"],
      },
      initialValue: "nativeCard",
    }),
    defineField({
      name: "sponsoredMeta",
      title: "Sponsored meta",
      type: "sponsoredMeta",
      initialValue: { label: "Sponsored" },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
