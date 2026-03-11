import { defineField, defineType } from "sanity";

export const agendaItemType = defineType({
  name: "agendaItem",
  title: "Agenda Item",
  type: "object",
  fields: [
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});