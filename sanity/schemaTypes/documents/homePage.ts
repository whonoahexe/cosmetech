import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroCarousel",
      title: "Hero carousel",
      type: "array",
      of: [defineArrayMember({ type: "heroSlide" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "latestSection",
      title: "Latest section",
      type: "feedSection",
    }),
    defineField({
      name: "highlightedCategories",
      title: "Highlighted categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "upcomingEventsSection",
      title: "Upcoming events section",
      type: "feedSection",
    }),
    defineField({
      name: "subnavCategories",
      title: "Sub-navigation categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
