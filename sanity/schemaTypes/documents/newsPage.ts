import { defineField, defineType } from "sanity";

export const newsPageType = defineType({
  name: "newsPage",
  title: "News Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "News / Updates",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featuredStories",
      title: "Featured stories",
      type: "feedSection",
    }),
    defineField({
      name: "latestNews",
      title: "Latest news",
      type: "feedSection",
    }),
    defineField({
      name: "pressReleaseSection",
      title: "Press release section",
      type: "feedSection",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
