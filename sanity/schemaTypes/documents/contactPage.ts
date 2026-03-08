import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "generalTitle",
      title: "General contact title",
      type: "string",
      initialValue: "General Contact",
    }),
    defineField({
      name: "generalIntro",
      title: "General intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "generalContactMethods",
      title: "General contact methods",
      type: "array",
      of: [defineArrayMember({ type: "contactMethod" })],
    }),
    defineField({
      name: "editorialTitle",
      title: "Editorial title",
      type: "string",
      initialValue: "Editorial Contact",
    }),
    defineField({
      name: "editorialIntro",
      title: "Editorial intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "editorialContactMethods",
      title: "Editorial contact methods",
      type: "array",
      of: [defineArrayMember({ type: "contactMethod" })],
    }),
    defineField({
      name: "advertisingTitle",
      title: "Advertising title",
      type: "string",
      initialValue: "Why advertise with us?",
    }),
    defineField({
      name: "advertisingBody",
      title: "Advertising body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "advertisingContactMethods",
      title: "Advertising contact methods",
      type: "array",
      of: [defineArrayMember({ type: "contactMethod" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
