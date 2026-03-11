import { defineField, defineType } from "sanity";

export const advertisementSlotType = defineType({
  name: "advertisementSlot",
  title: "Advertisement Slot",
  type: "object",
  fields: [
    defineField({
      name: "slot",
      title: "Slot",
      type: "number",
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: "advertisement",
      title: "Advertisement",
      type: "reference",
      to: [{ type: "advertisement" }],
      validation: (rule) => rule.required(),
    }),
  ],
});