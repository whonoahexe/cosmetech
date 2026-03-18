import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  preview: {
    select: {},
    prepare: () => ({ title: "Homepage" }),
  },
  fields: [
    defineField({
      name: "carouselItems",
      title: "Carousel items",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }, { type: "event" }, { type: "advertisement" }],
        }),
      ],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "latestAdSlots",
      title: "Latest section advertisement swaps",
      type: "array",
      of: [defineArrayMember({ type: "advertisementSlot" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "popularAdSlots",
      title: "Popular section advertisement swaps",
      type: "array",
      of: [defineArrayMember({ type: "advertisementSlot" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "latestStripItems",
      title: "Ad strip (after Latest section)",
      description: "Sponsored articles and advertisements shown in the strip below the Latest/Popular section.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }, { type: "advertisement" }],
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "sponsoredItems",
      title: "Sponsored items",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }, { type: "event" }, { type: "advertisement" }],
        }),
      ],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "highlightedCategories",
      title: "Highlighted categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "highlightedEvents",
      title: "Highlighted events",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "event" }, { type: "advertisement" }],
        }),
      ],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
