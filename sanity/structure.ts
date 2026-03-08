import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "newsPage",
  "eventsPage",
  "aboutPage",
  "contactPage",
]);

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const singletonItem = (S: Parameters<StructureResolver>[0], schemaType: string, title: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType));

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
      S.divider(),
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("advertisement").title("Advertisements"),
      S.divider(),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("topic").title("Topics"),
      S.documentTypeListItem("tag").title("Tags"),
    ]);
