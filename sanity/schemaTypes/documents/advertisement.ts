import { defineField, defineType } from "sanity";

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
      name: "renderAs",
      title: "Render as",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Event", value: "event" },
          { title: "News", value: "news" },
          { title: "Press Release", value: "pressRelease" },
        ],
      },
      initialValue: "article",
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
