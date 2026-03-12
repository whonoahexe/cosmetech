import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  preview: {
    select: {},
    prepare: () => ({ title: "Contact Page" }),
  },
  fields: [
    defineField({
      name: "generalContactEmail",
      title: "General contact email",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editorialContactEmail",
      title: "Editorial contact email",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "advertisingContacts",
      title: "Advertising contacts",
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
