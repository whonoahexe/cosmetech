import { aboutPageType } from "./documents/aboutPage";
import { advertisementType } from "./documents/advertisement";
import { articleType } from "./documents/article";
import { categoryType } from "./documents/category";
import { contactPageType } from "./documents/contactPage";
import { faqPageType } from "./documents/faqPage";
import { eventsPageType } from "./documents/eventsPage";
import { eventType } from "./documents/event";
import { homePageType } from "./documents/homePage";
import { newsPageType } from "./documents/newsPage";
import { privacyPolicyPageType } from "./documents/privacyPolicyPage";
import { siteSettingsType } from "./documents/siteSettings";
import { termsPageType } from "./documents/termsPage";
import { agendaItemType } from "./objects/agendaItem";
import { advertisementSlotType } from "./objects/advertisementSlot";
import { contactMethodType } from "./objects/contactMethod";
import { faqItemType } from "./objects/faqItem";
import { faqSectionType } from "./objects/faqSection";
import { seoType } from "./objects/seo";
import { socialLinkType } from "./objects/socialLink";
import { sponsoredMetaType } from "./objects/sponsoredMeta";

export const schemaTypes = [
  siteSettingsType,
  homePageType,
  newsPageType,
  eventsPageType,
  aboutPageType,
  contactPageType,
  faqPageType,
  privacyPolicyPageType,
  termsPageType,
  articleType,
  eventType,
  advertisementType,
  categoryType,
  agendaItemType,
  advertisementSlotType,
  contactMethodType,
  faqItemType,
  faqSectionType,
  seoType,
  socialLinkType,
  sponsoredMetaType,
];
