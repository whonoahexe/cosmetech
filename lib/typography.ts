export const typography = {
  heading1: "type-heading-1",
  heading2: "type-heading-2",
  heading3: "type-heading-3",
  heading4: "type-heading-4",
  monospaced: "type-monospaced",
  paragraphLarge: "type-paragraph-large",
  paragraphLargeMedium: "type-paragraph-large-medium",
  paragraphLargeBold: "type-paragraph-large-bold",
  paragraph: "type-paragraph",
  paragraphMedium: "type-paragraph-medium",
  paragraphBold: "type-paragraph-bold",
  paragraphSmall: "type-paragraph-small",
  paragraphSmallMedium: "type-paragraph-small-medium",
  paragraphMini: "type-paragraph-mini",
  paragraphMiniMedium: "type-paragraph-mini-medium",
  paragraphMiniBold: "type-paragraph-mini-bold",
  caption: "type-caption",
} as const;

export type TypographyVariant = keyof typeof typography;
