import { defineField, defineType } from "sanity";

export const contactMethodType = defineType({
  name: "contactMethod",
  title: "Contact Method",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: ["email", "phone", "link", "form", "other"],
      },
      initialValue: "other",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "For example: mailto:, tel:, or a full URL.",
    }),
  ],
});
