import { client } from "./client";
import {
  aboutPageQuery,
  allArticlesQuery,
  allNewsStoriesQuery,
  popularArticlesQuery,
  articleBySlugQuery,
  articlesByCategoryRefQuery,
  categoriesQuery,
  categoryBySlugQuery,
  contactPageQuery,
  eventBySlugQuery,
  eventsPageQuery,
  faqPageQuery,
  homePageQuery,
  latestArticlesQuery,
  newsPageQuery,
  ongoingEventsQuery,
  pastEventsQuery,
  popularHomeContentQuery,
  pressReleasesQuery,
  privacyPolicyPageQuery,
  siteSettingsQuery,
  termsPageQuery,
  latestHomeContentQuery,
} from "./queries";
import type {
  AboutPageData,
  AdvertisementCard,
  AdvertisementSlot,
  ArticlePageData,
  CategoryPageData,
  ContentCard,
  ContactPageData,
  EventCard,
  EventPageData,
  EventsPageData,
  EventsPageDocument,
  FaqPageData,
  HomePageData,
  HomePageDocument,
  LegalPageData,
  NewsPageData,
  NewsPageDocument,
  SiteSettings,
} from "./types";

type RawArticleCard = Extract<ContentCard, { _type: "article" }> & { plainText?: string };
type RawContentCard = RawArticleCard | Extract<ContentCard, { _type: "event" }> | AdvertisementCard;
type RawArticlePageData = ArticlePageData & {
  plainText?: string;
  relatedArticles?: RawArticleCard[];
};
type RawHomePageDocument = Omit<HomePageDocument, "carouselItems" | "sponsoredItems"> & {
  carouselItems?: RawContentCard[];
  sponsoredItems?: RawContentCard[];
};
type RawNewsPageDocument = Omit<NewsPageDocument, "featuredBanner" | "highlightedStories"> & {
  featuredBanner?: RawContentCard | null;
  highlightedStories?: RawContentCard[];
};

const estimateReadTime = (plainText?: string) => {
  const wordCount = plainText?.trim().split(/\s+/).filter(Boolean).length ?? 0;

  if (wordCount === 0) {
    return undefined;
  }

  return Math.max(1, Math.ceil(wordCount / 225));
};

const enrichArticleCard = (article: RawArticleCard) => {
  const { plainText, ...rest } = article;

  return {
    ...rest,
    readTime: estimateReadTime(plainText),
  };
};

const enrichContentCard = (card: RawContentCard): ContentCard => {
  if (card._type === "article") {
    return enrichArticleCard(card);
  }

  return card;
};

const enrichContentCards = (cards: RawContentCard[] | null | undefined) =>
  (cards || []).map(enrichContentCard);

const applyAdvertisementSlots = (
  items: ContentCard[],
  slots: AdvertisementSlot[] | null | undefined,
  maxItems = 5
) => {
  const next: Array<ContentCard | undefined> = Array.from(
    { length: maxItems },
    (_, index) => items[index]
  );

  for (const slot of slots || []) {
    if (!slot.advertisement) {
      continue;
    }

    const slotIndex = slot.slot - 1;

    if (slotIndex < 0 || slotIndex >= maxItems) {
      continue;
    }

    next[slotIndex] = slot.advertisement;
  }

  return next.filter((item): item is ContentCard => Boolean(item));
};

export const getSiteSettings = async () => client.fetch<SiteSettings | null>(siteSettingsQuery);

export const getHomePageData = async () => {
  const homePage = await client.fetch<RawHomePageDocument | null>(homePageQuery);

  if (!homePage) {
    return null;
  }

  const now = new Date().toISOString();
  const needsEventsFallback = !homePage.highlightedEvents || homePage.highlightedEvents.length === 0;

  const [latestItemsRaw, popularItemsRaw, fallbackEvents] = await Promise.all([
    client.fetch<RawContentCard[]>(latestHomeContentQuery),
    client.fetch<RawContentCard[]>(popularHomeContentQuery),
    needsEventsFallback
      ? client.fetch<EventCard[]>(ongoingEventsQuery, { now })
      : Promise.resolve([] as EventCard[]),
  ]);

  const latestItems = applyAdvertisementSlots(
    enrichContentCards(latestItemsRaw),
    homePage.latestAdSlots,
    5
  );
  const popularItems = applyAdvertisementSlots(
    enrichContentCards(popularItemsRaw),
    homePage.popularAdSlots,
    5
  );

  const data: HomePageData = {
    ...homePage,
    carouselItems: enrichContentCards(homePage.carouselItems),
    sponsoredItems: enrichContentCards(homePage.sponsoredItems),
    latestItems,
    popularItems,
    highlightedEvents: (homePage.highlightedEvents?.length ?? 0) > 0
      ? homePage.highlightedEvents
      : fallbackEvents.slice(0, 5),
  };

  return data;
};

export const getNewsPageData = async () => {
  const newsPage = await client.fetch<RawNewsPageDocument | null>(newsPageQuery);

  if (!newsPage) {
    return null;
  }

  const [pressReleases, allNewsStories] = await Promise.all([
    client.fetch<RawArticleCard[]>(pressReleasesQuery),
    client.fetch<RawArticleCard[]>(allNewsStoriesQuery),
  ]);

  const data: NewsPageData = {
    ...newsPage,
    featuredBanner: newsPage.featuredBanner ? enrichContentCard(newsPage.featuredBanner) : null,
    highlightedStories: enrichContentCards(newsPage.highlightedStories),
    pressReleases: pressReleases.map(enrichArticleCard),
    allNewsStories: allNewsStories.map(enrichArticleCard),
  };

  return data;
};

export const getEventsPageData = async () => {
  const eventsPage = await client.fetch<EventsPageDocument | null>(eventsPageQuery);

  const now = new Date().toISOString();

  const [ongoingEvents, pastEvents] = await Promise.all([
    client.fetch<EventCard[]>(ongoingEventsQuery, { now }),
    client.fetch<EventCard[]>(pastEventsQuery, { now }),
  ]);

  const data: EventsPageData = {
    _id: eventsPage?._id ?? "events-page.fallback",
    pageDescription: eventsPage?.pageDescription,
    seo: eventsPage?.seo,
    ongoingEvents,
    pastEvents,
  };

  return data;
};

export const getAboutPageData = async () => client.fetch<AboutPageData | null>(aboutPageQuery);

export const getContactPageData = async () =>
  client.fetch<ContactPageData | null>(contactPageQuery);

export const getFaqPageData = async () => client.fetch<FaqPageData | null>(faqPageQuery);

export const getPrivacyPolicyPageData = async () =>
  client.fetch<LegalPageData | null>(privacyPolicyPageQuery);

export const getTermsPageData = async () => client.fetch<LegalPageData | null>(termsPageQuery);

export const getCategories = async () => client.fetch<CategoryPageData[]>(categoriesQuery);

export const getArticlesByCategory = async (categoryId: string) => {
  const articles = await client.fetch<RawArticleCard[]>(articlesByCategoryRefQuery, { categoryId });
  return articles.map(enrichArticleCard);
};

export const getAllArticles = async (sort: "latest" | "popular" = "latest") => {
  const query = sort === "popular" ? popularArticlesQuery : allArticlesQuery;
  const articles = await client.fetch<RawArticleCard[]>(query);
  return articles.map(enrichArticleCard);
};

export const getLatestArticles = async (excludeSlug = "") => {
  const articles = await client.fetch<RawArticleCard[]>(latestArticlesQuery, { excludeSlug });
  return articles.map(enrichArticleCard);
};

export const getArticlePageData = async (slug: string) =>
  client.fetch<RawArticlePageData | null>(articleBySlugQuery, { slug }).then((article) => {
    if (!article) {
      return null;
    }

    const { plainText, relatedArticles, ...rest } = article;

    return {
      ...rest,
      readTime: estimateReadTime(plainText),
      relatedArticles: (relatedArticles || []).map(enrichArticleCard),
    };
  });

export const getEventPageData = async (slug: string) =>
  client.fetch<EventPageData | null>(eventBySlugQuery, { slug });

export const getCategoryPageData = async (slug: string) => {
  const category = await client.fetch<CategoryPageData | null>(categoryBySlugQuery, { slug });

  if (!category) {
    return null;
  }

  return {
    ...category,
    heroArticle: category.heroArticle
      ? enrichArticleCard(category.heroArticle as RawArticleCard)
      : undefined,
    highlightedArticles: ((category.highlightedArticles as RawArticleCard[] | undefined) || []).map(
      enrichArticleCard
    ),
  };
};
