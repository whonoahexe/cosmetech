import { defineField, defineType } from "sanity";

export const contactMethodType = defineType({
  name: "contactMethod",
  title: "Contact Method",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: ["email", "phone"],
      },
      initialValue: "email",
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
