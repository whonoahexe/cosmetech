import { defineField, defineType } from "sanity";

export const articleAuthorType = defineType({
  name: "articleAuthor",
  title: "Article Author",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Author image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authority",
      title: "Authority",
      type: "string",
      description: "Role, title, or credential shown under the name.",
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "string",
      description: "Displayed as the signature line on the right side of the author block.",
    }),
  ],
});