import { defineArrayMember, defineField, defineType } from "sanity";

export const eventsPageType = defineType({
  name: "eventsPage",
  title: "Events Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Events",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "filterTags",
      title: "Filter tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "ongoingSection",
      title: "Ongoing section",
      type: "feedSection",
    }),
    defineField({
      name: "pastSection",
      title: "Past section",
      type: "feedSection",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
