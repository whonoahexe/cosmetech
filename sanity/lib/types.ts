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

export type CtaLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type SocialLink = {
  platform: string;
  label?: string;
  href: string;
};

export type ContactMethod = {
  label: string;
  value: string;
  kind?: string;
  href?: string;
};

export type Topic = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
};

export type Tag = {
  _id: string;
  title: string;
  slug?: string;
  appliesTo?: string[];
};

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
  image?: SanityImage;
  publishDate?: string;
  readTime?: number;
  contentKind?: "feature" | "news" | "pressRelease";
  popularityScore?: number;
  isSponsored?: boolean;
  sponsoredMeta?: SponsoredMeta;
  category?: CategorySummary;
  topics?: Topic[];
  tags?: Tag[];
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
  registrationUrl?: string;
  isSponsored?: boolean;
  sponsoredMeta?: SponsoredMeta;
  topics?: Topic[];
  tags?: Tag[];
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
  targetPages?: string[];
  renderVariant?: "nativeCard" | "banner";
  sponsoredMeta?: SponsoredMeta;
  tags?: Tag[];
  targetCategories?: CategorySummary[];
  targetTopics?: Topic[];
};

export type ContentCard = ArticleCard | EventCard | AdvertisementCard;

export type FeedMode = "latest" | "popular" | "sponsored" | "manual";
export type ContentTypeName = "article" | "event" | "advertisement";
export type TargetPage =
  | "homepage"
  | "category"
  | "article"
  | "news"
  | "events"
  | "about"
  | "contact";
export type EventWindow = "ongoing" | "past" | "upcoming";

export type FeedSectionConfig = {
  title?: string;
  mode: FeedMode;
  limit?: number;
  contentTypes?: ContentTypeName[];
  categories?: CategorySummary[];
  topics?: Topic[];
  manualItems?: ContentCard[];
};

export type ResolvedFeedSection = FeedSectionConfig & {
  items: ContentCard[];
  resolvedMode: FeedMode;
};

export type HeroSlide = {
  overrideTitle?: string;
  overrideExcerpt?: string;
  overrideImage?: SanityImage;
  cta?: CtaLink;
  tags?: Tag[];
  content?: ContentCard;
};

export type SiteSettings = {
  _id: string;
  title: string;
  description?: string;
  navigationLinks?: CtaLink[];
  footerLinks?: CtaLink[];
  socialLinks?: SocialLink[];
  defaultSeo?: Seo;
};

export type HomePageDocument = {
  _id: string;
  heroCarousel?: HeroSlide[];
  latestSection?: FeedSectionConfig;
  highlightedCategories?: CategorySummary[];
  upcomingEventsSection?: FeedSectionConfig;
  subnavCategories?: CategorySummary[];
  seo?: Seo;
};

export type HomePageData = Omit<HomePageDocument, "latestSection" | "upcomingEventsSection"> & {
  latestSection: ResolvedFeedSection | null;
  upcomingEventsSection: ResolvedFeedSection | null;
};

export type NewsPageDocument = {
  _id: string;
  title?: string;
  intro?: string;
  featuredStories?: FeedSectionConfig;
  latestNews?: FeedSectionConfig;
  pressReleaseSection?: FeedSectionConfig;
  seo?: Seo;
};

export type NewsPageData = Omit<
  NewsPageDocument,
  "featuredStories" | "latestNews" | "pressReleaseSection"
> & {
  featuredStories: ResolvedFeedSection | null;
  latestNews: ResolvedFeedSection | null;
  pressReleaseSection: ResolvedFeedSection | null;
};

export type EventsPageDocument = {
  _id: string;
  title?: string;
  intro?: string;
  filterTags?: Tag[];
  ongoingSection?: FeedSectionConfig;
  pastSection?: FeedSectionConfig;
  seo?: Seo;
};

export type EventsPageData = Omit<EventsPageDocument, "ongoingSection" | "pastSection"> & {
  ongoingSection: ResolvedFeedSection | null;
  pastSection: ResolvedFeedSection | null;
};

export type AboutPageData = {
  _id: string;
  cosmetechTitle?: string;
  cosmetechBody?: unknown[];
  quickLinks?: CtaLink[];
  fourthWaveTitle?: string;
  fourthWaveBody?: unknown[];
  fourthWaveLink?: CtaLink;
  socialLinks?: SocialLink[];
  seo?: Seo;
};

export type ContactPageData = {
  _id: string;
  generalTitle?: string;
  generalIntro?: string;
  generalContactMethods?: ContactMethod[];
  editorialTitle?: string;
  editorialIntro?: string;
  editorialContactMethods?: ContactMethod[];
  advertisingTitle?: string;
  advertisingBody?: unknown[];
  advertisingContactMethods?: ContactMethod[];
  seo?: Seo;
};

export type CategoryPageData = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  heroArticle?: ContentCard;
  allowedTopics?: Topic[];
  availableTopics: Topic[];
  items: ContentCard[];
  seo?: Seo;
};

export type ArticlePageData = ArticleCard & {
  body?: unknown[];
  relatedArticles?: ContentCard[];
  seo?: Seo;
};
