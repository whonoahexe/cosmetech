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
      title: "Swap with",
      type: "reference",
      to: [{ type: "advertisement" }, { type: "article" }, { type: "event" }],
      options: {
        filter: '_type != "article" || isSponsored == true',
      },
      validation: (rule) => rule.required(),
    }),
  ],
});