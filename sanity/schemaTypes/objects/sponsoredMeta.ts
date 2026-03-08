import { defineField, defineType } from "sanity";

export const sponsoredMetaType = defineType({
  name: "sponsoredMeta",
  title: "Sponsored Meta",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Sponsored",
    }),
    defineField({
      name: "sponsorName",
      title: "Sponsor name",
      type: "string",
    }),
    defineField({
      name: "sponsorUrl",
      title: "Sponsor URL",
      type: "url",
    }),
  ],
});
