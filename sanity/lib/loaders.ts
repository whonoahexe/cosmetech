import { client } from "./client";
import {
  aboutPageQuery,
  articleBySlugQuery,
  categoryBySlugQuery,
  contactPageQuery,
  contentCardProjection,
  eventsPageQuery,
  homePageQuery,
  newsPageQuery,
  siteSettingsQuery,
  topicBySlugQuery,
  topicsByCategoryIdQuery,
} from "./queries";
import type {
  AboutPageData,
  ArticlePageData,
  CategoryPageData,
  ContentCard,
  ContentTypeName,
  ContactPageData,
  EventWindow,
  EventsPageData,
  EventsPageDocument,
  FeedMode,
  FeedSectionConfig,
  HomePageData,
  HomePageDocument,
  NewsPageData,
  NewsPageDocument,
  ResolvedFeedSection,
  SiteSettings,
  TargetPage,
  Topic,
} from "./types";

type FeedResolutionOptions = {
  page?: TargetPage;
  mode?: FeedMode;
  eventWindow?: EventWindow;
  forceContentTypes?: ContentTypeName[];
  categoryIds?: string[];
  topicIds?: string[];
};

const defaultContentTypes: ContentTypeName[] = ["article", "event", "advertisement"];

const buildFeedQuery = (mode: FeedMode, options: FeedResolutionOptions) => {
  const filters = ["_type in $contentTypes"];

  if (mode === "sponsored") {
    filters.push(
      '(_type == "advertisement" || (_type in ["article", "event"] && isSponsored == true))'
    );
  }

  if (options.page) {
    filters.push(
      '(_type != "advertisement" || !defined(targetPages) || count(targetPages) == 0 || count(targetPages[@ == $page]) > 0)'
    );
  }

  if (options.categoryIds?.length) {
    filters.push(
      '((_type == "article" && category._ref in $categoryIds) || (_type == "advertisement" && count(targetCategories[]._ref[@ in $categoryIds]) > 0))'
    );
  }

  if (options.topicIds?.length) {
    filters.push(
      '((_type == "article" && count(topics[]._ref[@ in $topicIds]) > 0) || (_type == "event" && count(topics[]._ref[@ in $topicIds]) > 0) || (_type == "advertisement" && count(targetTopics[]._ref[@ in $topicIds]) > 0))'
    );
  }

  if (options.eventWindow === "ongoing") {
    filters.push(
      '(_type != "event" || (dateTime(startDate) <= now() && (!defined(endDate) || dateTime(endDate) >= now())))'
    );
  }

  if (options.eventWindow === "past") {
    filters.push(
      '(_type != "event" || ((defined(endDate) && dateTime(endDate) < now()) || (!defined(endDate) && dateTime(startDate) < now())))'
    );
  }

  if (options.eventWindow === "upcoming") {
    filters.push('(_type != "event" || dateTime(startDate) > now())');
  }

  const orderBy =
    mode === "popular"
      ? "order(coalesce(popularityScore, 0) desc, coalesce(publishDate, startDate, activeFrom, _createdAt) desc)"
      : "order(coalesce(publishDate, startDate, activeFrom, _createdAt) desc)";

  return `*[${filters.join(" && ")}] | ${orderBy}[0...$limit] ${contentCardProjection}`;
};

export const getSiteSettings = async () => client.fetch<SiteSettings | null>(siteSettingsQuery);

export const resolveFeedSection = async (
  section: FeedSectionConfig | null | undefined,
  options: FeedResolutionOptions = {}
): Promise<ResolvedFeedSection | null> => {
  if (!section) {
    return null;
  }

  const resolvedMode = options.mode || section.mode || "latest";
  const limit = section.limit || 6;

  if (resolvedMode === "manual" && section.manualItems?.length) {
    return {
      ...section,
      resolvedMode,
      items: section.manualItems.slice(0, limit),
    };
  }

  const contentTypes = options.forceContentTypes || section.contentTypes || defaultContentTypes;
  const categoryIds =
    options.categoryIds || section.categories?.map((category) => category._id) || [];
  const topicIds = options.topicIds || section.topics?.map((topic) => topic._id) || [];

  const query = buildFeedQuery(resolvedMode, {
    ...options,
    categoryIds,
    topicIds,
  });

  const items = await client.fetch<ContentCard[]>(query, {
    contentTypes,
    limit,
    page: options.page,
    categoryIds,
    topicIds,
  });

  return {
    ...section,
    resolvedMode,
    items,
  };
};

export const getHomePageData = async (options?: { latestMode?: FeedMode }) => {
  const homePage = await client.fetch<HomePageDocument | null>(homePageQuery);

  if (!homePage) {
    return null;
  }

  const latestSection = await resolveFeedSection(homePage.latestSection, {
    page: "homepage",
    mode: options?.latestMode,
  });
  const upcomingEventsSection = await resolveFeedSection(homePage.upcomingEventsSection, {
    page: "homepage",
    forceContentTypes: ["event", "advertisement"],
    eventWindow: "upcoming",
  });

  const data: HomePageData = {
    ...homePage,
    latestSection,
    upcomingEventsSection,
  };

  return data;
};

export const getNewsPageData = async () => {
  const newsPage = await client.fetch<NewsPageDocument | null>(newsPageQuery);

  if (!newsPage) {
    return null;
  }

  const featuredStories = await resolveFeedSection(newsPage.featuredStories, {
    page: "news",
    forceContentTypes: ["article", "advertisement"],
  });
  const latestNews = await resolveFeedSection(newsPage.latestNews, {
    page: "news",
    forceContentTypes: ["article", "advertisement"],
  });
  const pressReleaseSection = await resolveFeedSection(newsPage.pressReleaseSection, {
    page: "news",
    forceContentTypes: ["article", "advertisement"],
  });

  const data: NewsPageData = {
    ...newsPage,
    featuredStories,
    latestNews,
    pressReleaseSection,
  };

  return data;
};

export const getEventsPageData = async () => {
  const eventsPage = await client.fetch<EventsPageDocument | null>(eventsPageQuery);

  if (!eventsPage) {
    return null;
  }

  const ongoingSection = await resolveFeedSection(eventsPage.ongoingSection, {
    page: "events",
    forceContentTypes: ["event", "advertisement"],
    eventWindow: "ongoing",
  });
  const pastSection = await resolveFeedSection(eventsPage.pastSection, {
    page: "events",
    forceContentTypes: ["event", "advertisement"],
    eventWindow: "past",
  });

  const data: EventsPageData = {
    ...eventsPage,
    ongoingSection,
    pastSection,
  };

  return data;
};

export const getAboutPageData = async () => client.fetch<AboutPageData | null>(aboutPageQuery);

export const getContactPageData = async () =>
  client.fetch<ContactPageData | null>(contactPageQuery);

export const getArticlePageData = async (slug: string) =>
  client.fetch<ArticlePageData | null>(articleBySlugQuery, { slug });

export const getCategoryPageData = async (
  slug: string,
  options?: { topicSlug?: string; mode?: FeedMode }
) => {
  const category = await client.fetch<Omit<CategoryPageData, "availableTopics" | "items"> | null>(
    categoryBySlugQuery,
    { slug }
  );

  if (!category) {
    return null;
  }

  const availableTopics = await client.fetch<Topic[]>(topicsByCategoryIdQuery, {
    categoryId: category._id,
  });

  const topic = options?.topicSlug
    ? await client.fetch<Topic | null>(topicBySlugQuery, { slug: options.topicSlug })
    : null;

  const items = await resolveFeedSection(
    {
      mode: options?.mode || "latest",
      limit: 12,
      contentTypes: ["article", "advertisement"],
      categories: [{ _id: category._id, title: category.title, slug: category.slug }],
      topics: topic ? [topic] : [],
    },
    {
      page: "category",
      mode: options?.mode,
      categoryIds: [category._id],
      topicIds: topic ? [topic._id] : [],
    }
  );

  const data: CategoryPageData = {
    ...category,
    availableTopics,
    items: items?.items || [],
  };

  return data;
};
