import type { StructureResolver } from "sanity/structure";
import { fixedCategories } from "./lib/fixedCategories";

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "newsPage",
  "eventsPage",
  "aboutPage",
  "contactPage",
  "faqPage",
  "privacyPolicyPage",
  "termsPage",
]);

export const fixedDocumentTypes = new Set(["category"]);

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const singletonItem = (S: Parameters<StructureResolver>[0], schemaType: string, title: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType));

const fixedCategoryItem = (
  S: Parameters<StructureResolver>[0],
  category: (typeof fixedCategories)[number]
) =>
  S.listItem()
    .title(category.title)
    .id(category.documentId)
    .child(S.document().schemaType("category").documentId(category.documentId));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singletonItem(S, "siteSettings", "Site Settings"),
      S.divider(),
      singletonItem(S, "homePage", "Homepage"),
      singletonItem(S, "newsPage", "News / Updates Page"),
      singletonItem(S, "eventsPage", "Events Page"),
      singletonItem(S, "aboutPage", "About Page"),
      singletonItem(S, "contactPage", "Contact Page"),
      singletonItem(S, "faqPage", "FAQ Page"),
      singletonItem(S, "privacyPolicyPage", "Privacy Policy Page"),
      singletonItem(S, "termsPage", "Terms & Conditions Page"),
      S.divider(),
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("advertisement").title("Advertisements"),
      S.divider(),
      S.listItem()
        .title("Categories")
        .id("fixed-categories")
        .child(
          S.list()
            .title("Categories")
            .items(fixedCategories.map((category) => fixedCategoryItem(S, category)))
        ),
    ]);
