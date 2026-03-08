import { aboutPageType } from "./documents/aboutPage";
import { advertisementType } from "./documents/advertisement";
import { articleType } from "./documents/article";
import { categoryType } from "./documents/category";
import { contactPageType } from "./documents/contactPage";
import { eventsPageType } from "./documents/eventsPage";
import { eventType } from "./documents/event";
import { homePageType } from "./documents/homePage";
import { newsPageType } from "./documents/newsPage";
import { siteSettingsType } from "./documents/siteSettings";
import { tagType } from "./documents/tag";
import { topicType } from "./documents/topic";
import { contactMethodType } from "./objects/contactMethod";
import { ctaLinkType } from "./objects/ctaLink";
import { feedSectionType } from "./objects/feedSection";
import { heroSlideType } from "./objects/heroSlide";
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
  articleType,
  eventType,
  advertisementType,
  categoryType,
  topicType,
  tagType,
  contactMethodType,
  ctaLinkType,
  feedSectionType,
  heroSlideType,
  seoType,
  socialLinkType,
  sponsoredMetaType,
];
