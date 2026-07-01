import { client } from "./client";
import {
  aboutPageQuery,
  allArticlesQuery,
  allNewsStoriesQuery,
  popularArticlesQuery,
  searchQuery,
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
  sponsoredArticlesQuery,
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

type RawArticleCard = Extract<ContentCard, { _type: "article" }> & {
  plainText?: string;
  wordCount?: number;
};
type RawContentCard = RawArticleCard | Extract<ContentCard, { _type: "event" }> | AdvertisementCard;
type RawArticlePageData = ArticlePageData & {
  plainText?: string;
  relatedArticles?: RawArticleCard[];
};
type RawHomePageDocument = Omit<
  HomePageDocument,
  "carouselItems" | "sponsoredItems" | "highlightedEvents"
> & {
  carouselItems?: RawContentCard[];
  sponsoredItems?: RawContentCard[];
  highlightedEvents?: RawContentCard[];
};
type RawNewsPageDocument = Omit<NewsPageDocument, "featuredBanner" | "highlightedStories"> & {
  featuredBanner?: RawContentCard | null;
  highlightedStories?: RawContentCard[];
};

const readTimeFromWordCount = (wordCount = 0) =>
  wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 225)) : undefined;

// Article-detail path: computes word count from the full body text it already loads.
const estimateReadTime = (plainText?: string) =>
  readTimeFromWordCount(plainText?.trim().split(/\s+/).filter(Boolean).length ?? 0);

const enrichArticleCard = (article: RawArticleCard) => {
  const { plainText, wordCount, ...rest } = article;

  return {
    ...rest,
    // Cards carry a precomputed wordCount from GROQ (so lists don't ship every
    // article's full body); fall back to plainText where a query still provides it.
    readTime: readTimeFromWordCount(wordCount) ?? estimateReadTime(plainText),
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

    next[slotIndex] = enrichContentCard(slot.advertisement as RawContentCard);
  }

  return next.filter((item): item is ContentCard => Boolean(item));
};

// Cache published reads in Next's Data Cache. The Sanity webhook (/api/revalidate)
// busts the matching tags on publish, so pages regenerate on content changes rather
// than re-querying Sanity (and re-rendering on Vercel) on every single request.
// Falls back to a 1-hour TTL if a webhook is ever missed.
const cache = (tags: string[], revalidate: number = 3600) =>
  ({ next: { tags, revalidate } }) as const;

// Quantize "now" to the top of the hour so time-filtered queries share a stable
// cache key within the window — otherwise a fresh millisecond timestamp per request
// makes every fetch a cache miss.
const stableNow = () => {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  return d.toISOString();
};

export const getSiteSettings = async () =>
  client.fetch<SiteSettings | null>(siteSettingsQuery, {}, cache(["site-settings"], 300));

export const getHomePageData = async () => {
  const homePage = await client.fetch<RawHomePageDocument | null>(
    homePageQuery,
    {},
    cache(["home"])
  );

  if (!homePage) {
    return null;
  }

  const now = stableNow();
  const needsEventsFallback =
    !homePage.highlightedEvents || homePage.highlightedEvents.length === 0;

  const [latestItemsRaw, popularItemsRaw, sponsoredArticlesRaw, fallbackEvents] = await Promise.all(
    [
      client.fetch<RawContentCard[]>(latestHomeContentQuery, {}, cache(["home"])),
      client.fetch<RawContentCard[]>(popularHomeContentQuery, {}, cache(["home"])),
      client.fetch<RawArticleCard[]>(sponsoredArticlesQuery, {}, cache(["home"])),
      needsEventsFallback
        ? client.fetch<EventCard[]>(ongoingEventsQuery, { now }, cache(["home", "events"]))
        : Promise.resolve([] as EventCard[]),
    ]
  );

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

  // Merge CMS-curated sponsored items with auto-fetched sponsored articles, deduplicating by _id
  const curatedSponsored = enrichContentCards(homePage.sponsoredItems);
  const autoSponsored = sponsoredArticlesRaw.map(enrichArticleCard) as ContentCard[];
  const seenIds = new Set(curatedSponsored.map((item) => item._id));
  const mergedSponsored = [
    ...curatedSponsored,
    ...autoSponsored.filter((item) => !seenIds.has(item._id)),
  ];

  const data: HomePageData = {
    ...homePage,
    carouselItems: enrichContentCards(homePage.carouselItems),
    sponsoredItems: mergedSponsored,
    latestItems,
    popularItems,
    highlightedEvents:
      (homePage.highlightedEvents?.length ?? 0) > 0
        ? enrichContentCards(homePage.highlightedEvents)
        : fallbackEvents.slice(0, 5),
  };

  return data;
};

export const getNewsPageData = async () => {
  const newsPage = await client.fetch<RawNewsPageDocument | null>(newsPageQuery, {}, cache(["news"]));

  if (!newsPage) {
    return null;
  }

  const [pressReleases, allNewsStories] = await Promise.all([
    client.fetch<RawArticleCard[]>(pressReleasesQuery, {}, cache(["news"])),
    client.fetch<RawArticleCard[]>(allNewsStoriesQuery, {}, cache(["news"])),
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
  const eventsPage = await client.fetch<EventsPageDocument | null>(
    eventsPageQuery,
    {},
    cache(["events"])
  );

  const now = stableNow();

  const [ongoingEventsRaw, pastEventsRaw] = await Promise.all([
    client.fetch<EventCard[]>(ongoingEventsQuery, { now }, cache(["events"])),
    client.fetch<EventCard[]>(pastEventsQuery, { now }, cache(["events"])),
  ]);

  const ongoingEvents = applyAdvertisementSlots(
    ongoingEventsRaw,
    eventsPage?.ongoingAdSlots,
    Math.max(ongoingEventsRaw.length, 5)
  );
  const pastEvents = applyAdvertisementSlots(
    pastEventsRaw,
    eventsPage?.pastAdSlots,
    Math.max(pastEventsRaw.length, 5)
  );

  const data: EventsPageData = {
    _id: eventsPage?._id ?? "events-page.fallback",
    pageDescription: eventsPage?.pageDescription,
    seo: eventsPage?.seo,
    ongoingEvents,
    pastEvents,
  };

  return data;
};

export const getAboutPageData = async () =>
  client.fetch<AboutPageData | null>(aboutPageQuery, {}, cache(["pages"]));

export const getContactPageData = async () =>
  client.fetch<ContactPageData | null>(contactPageQuery, {}, cache(["pages"]));

export const getFaqPageData = async () =>
  client.fetch<FaqPageData | null>(faqPageQuery, {}, cache(["pages"]));

export const getPrivacyPolicyPageData = async () =>
  client.fetch<LegalPageData | null>(privacyPolicyPageQuery, {}, cache(["pages"]));

export const getTermsPageData = async () =>
  client.fetch<LegalPageData | null>(termsPageQuery, {}, cache(["pages"]));

export const getCategories = async () =>
  client.fetch<CategoryPageData[]>(categoriesQuery, {}, cache(["categories"]));

export const getArticlesByCategory = async (categoryId: string) => {
  const articles = await client.fetch<RawArticleCard[]>(
    articlesByCategoryRefQuery,
    { categoryId },
    cache(["categories", "articles"])
  );
  return articles.map(enrichArticleCard);
};

export const searchContent = async (q: string) => {
  if (!q.trim()) return [];
  // Not cached: the query string is user-supplied and unbounded, so caching would
  // just fill the Data Cache with single-use entries.
  const results = await client.fetch<RawContentCard[]>(searchQuery, {
    qWild: q.trim() + "*",
  });
  return enrichContentCards(results);
};

export const getSponsoredArticles = async () => {
  const articles = await client.fetch<RawArticleCard[]>(sponsoredArticlesQuery, {}, cache(["articles"]));
  return articles.map(enrichArticleCard);
};

export const getAllArticles = async (sort: "latest" | "popular" = "latest") => {
  const query = sort === "popular" ? popularArticlesQuery : allArticlesQuery;
  const articles = await client.fetch<RawArticleCard[]>(query, {}, cache(["articles"]));
  return articles.map(enrichArticleCard);
};

export const getLatestArticles = async (excludeSlug = "") => {
  const articles = await client.fetch<RawArticleCard[]>(
    latestArticlesQuery,
    { excludeSlug },
    cache(["articles"])
  );
  return articles.map(enrichArticleCard);
};

export const getArticlePageData = async (slug: string) =>
  client
    .fetch<RawArticlePageData | null>(articleBySlugQuery, { slug }, cache(["articles", `article:${slug}`]))
    .then((article) => {
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
  client.fetch<EventPageData | null>(eventBySlugQuery, { slug }, cache(["events", `event:${slug}`]));

export const getCategoryPageData = async (slug: string) => {
  const category = await client.fetch<CategoryPageData | null>(
    categoryBySlugQuery,
    { slug },
    cache(["categories", `category:${slug}`])
  );

  if (!category) {
    return null;
  }

  return {
    ...category,
    heroArticle: category.heroArticle
      ? enrichArticleCard(category.heroArticle as RawArticleCard)
      : undefined,
    highlightedArticles: (category.highlightedArticles ?? []).map((item) =>
      item._type === "article" ? enrichArticleCard(item as RawArticleCard) : item
    ),
  };
};
