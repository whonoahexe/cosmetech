import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
      media: "image",
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
      name: "startDate",
      title: "Start date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
    }),
    defineField({
      name: "eventTags",
      title: "Event tags",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "Conference", value: "conference" },
              { title: "Workshop", value: "workshop" },
              { title: "Webinar", value: "webinar" },
              { title: "Expo", value: "expo" },
            ],
          },
        }),
      ],
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
      name: "organizer",
      title: "Organizer",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image" })],
    }),
    defineField({
      name: "agenda",
      title: "Agenda",
      type: "array",
      of: [defineArrayMember({ type: "agendaItem" })],
    }),
    defineField({
      name: "relatedEvents",
      title: "Related events",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "event" }] })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
