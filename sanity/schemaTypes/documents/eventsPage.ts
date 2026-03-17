import { defineArrayMember, defineField, defineType } from "sanity";

export const eventsPageType = defineType({
  name: "eventsPage",
  title: "Events Page",
  type: "document",
  preview: {
    select: {},
    prepare: () => ({ title: "Events Page" }),
  },
  fields: [
    defineField({
      name: "pageDescription",
      title: "Page description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ongoingAdSlots",
      title: "Ongoing section advertisement swaps",
      type: "array",
      of: [defineArrayMember({ type: "advertisementSlot" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "pastAdSlots",
      title: "Past events section advertisement swaps",
      type: "array",
      of: [defineArrayMember({ type: "advertisementSlot" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
