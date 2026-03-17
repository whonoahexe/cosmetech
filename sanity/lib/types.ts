export type SanityImage = {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
} | null;

export type Seo = {
  title?: string;
  description?: string;
  image?: SanityImage;
} | null;

export type SocialLink = {
  platform: string;
  label?: string;
  href: string;
};

export type ContactMethod = {
  value: string;
  kind: "email" | "phone";
};

export type ArticleContentKind = "article" | "news" | "pressRelease";
export type EventTag = "conference" | "workshop" | "webinar" | "expo";
export type AdvertisementRenderAs = "article" | "event" | "news" | "pressRelease";

export type CategorySummary = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
};

export type SponsoredMeta = {
  label?: string;
  sponsorName?: string;
  sponsorUrl?: string;
} | null;

export type ArticleCard = {
  _id: string;
  _type: "article";
  title: string;
  slug?: string;
  excerpt?: string;
  imageMode?: "generated" | "custom";
  image?: SanityImage;
  publishDate?: string;
  readTime?: number;
  viewCount?: number;
  contentKinds?: ArticleContentKind[];
  isSponsored?: boolean;
  sponsoredMeta?: SponsoredMeta;
  categories?: (CategorySummary | null)[];
  categoryRefs?: string[];
};

export type EventCard = {
  _id: string;
  _type: "event";
  title: string;
  slug?: string;
  excerpt?: string;
  image?: SanityImage;
  startDate?: string;
  endDate?: string;
  location?: string;
  organizer?: string;
  registrationUrl?: string;
  eventTags?: EventTag[];
  isSponsored?: boolean;
  sponsoredMeta?: SponsoredMeta;
};

export type AdvertisementCard = {
  _id: string;
  _type: "advertisement";
  title: string;
  excerpt?: string;
  image?: SanityImage;
  destinationUrl?: string;
  ctaLabel?: string;
  advertiser?: string;
  activeFrom?: string;
  activeTo?: string;
  renderAs?: AdvertisementRenderAs;
  sponsoredMeta?: SponsoredMeta;
};

export type ContentCard = ArticleCard | EventCard | AdvertisementCard;

export type AgendaItem = {
  time: string;
  label: string;
};

export type AdvertisementSlot = {
  slot: number;
  advertisement: ContentCard | null;
};

export type SiteSettings = {
  _id: string;
  title: string;
  description?: string;
  socialLinks?: SocialLink[];
  defaultSeo?: Seo;
};

export type HomePageDocument = {
  _id: string;
  carouselItems?: ContentCard[];
  latestAdSlots?: AdvertisementSlot[];
  popularAdSlots?: AdvertisementSlot[];
  sponsoredItems?: ContentCard[];
  highlightedCategories?: CategorySummary[];
  highlightedEvents?: ContentCard[];
  seo?: Seo;
};

export type HomePageData = Omit<HomePageDocument, "latestAdSlots" | "popularAdSlots"> & {
  latestItems: ContentCard[];
  popularItems: ContentCard[];
};

export type NewsPageDocument = {
  _id: string;
  pageDescription?: string;
  featuredBanner?: ContentCard | null;
  highlightedStories?: ContentCard[];
  seo?: Seo;
};

export type NewsPageData = NewsPageDocument & {
  pressReleases: ArticleCard[];
  allNewsStories: ArticleCard[];
};

export type EventsPageDocument = {
  _id: string;
  pageDescription?: string;
  ongoingAdSlots?: AdvertisementSlot[];
  pastAdSlots?: AdvertisementSlot[];
  seo?: Seo;
};

export type EventsPageData = Omit<EventsPageDocument, "ongoingAdSlots" | "pastAdSlots"> & {
  ongoingEvents: ContentCard[];
  pastEvents: ContentCard[];
};

export type AboutPageData = {
  _id: string;
  cosmetechBody?: unknown[];
  fourthWaveBody?: unknown[];
  seo?: Seo;
};

export type ContactPageData = {
  _id: string;
  generalContactEmail?: string;
  editorialContactEmail?: string;
  advertisingContacts?: ContactMethod[];
  seo?: Seo;
};

export type FaqItem = {
  question: string;
  answer?: unknown[];
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export type FaqPageData = {
  _id: string;
  pageTitle?: string;
  sections?: FaqSection[];
  seo?: Seo;
};

export type LegalPageData = {
  _id: string;
  pageTitle?: string;
  body?: unknown[];
  seo?: Seo;
};

export type CategoryPageData = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  heroArticle?: ArticleCard;
  highlightedArticles?: ArticleCard[];
};

export type ArticlePageData = ArticleCard & {
  body?: unknown[];
  relatedArticles?: ArticleCard[];
  seo?: Seo;
};

export type EventPageData = EventCard & {
  body?: unknown[];
  agenda?: AgendaItem[];
  relatedEvents?: EventCard[];
  seo?: Seo;
};
