import {
  ArticleGrid,
  FilterBar,
  HighlightedCarousel,
  HighlightedCategories,
  UpcomingEvents,
} from "@/components/pages/home";
import { PageTransition } from "@/components/page-transition";
import { getHomePageData, getCategories } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { FALLBACK_CATEGORIES, PLACEHOLDER_EVENTS } from "@/lib/constants";
import { toContentCardData, toContentEventCardData, toCategoryCardData } from "@/lib/mappers";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();
  return buildMetadata(data?.seo, { title: "Cosmetech" });
}

export default async function Home() {
  const [data, categories] = await Promise.all([getHomePageData(), getCategories()]);

  const allSlides = (data?.carouselItems ?? []).filter(Boolean);
  const alternateSlides = allSlides.slice(3, 6);
  const carouselSlides = (
    alternateSlides.length >= 3 ? alternateSlides : allSlides.slice(0, 3)
  ).slice(0, 3);
  const latestArticles = (data?.latestItems ?? []).filter(Boolean).map(toContentCardData);
  const popularArticles = (data?.popularItems ?? []).filter(Boolean).map(toContentCardData);
  const sponsoredArticles = (data?.sponsoredItems ?? []).filter(Boolean).map(toContentCardData);
  const rawHighlightedEvents = (data?.highlightedEvents ?? []).filter(Boolean).map(toContentEventCardData);
  const highlightedEvents =
    rawHighlightedEvents.length > 0 ? rawHighlightedEvents : PLACEHOLDER_EVENTS;

  const resolvedCategories = (categories ?? []).filter(Boolean).map(toCategoryCardData);
  const allCategories = resolvedCategories.length > 0 ? resolvedCategories : FALLBACK_CATEGORIES;

  // Use first 4 resolved categories for the highlight section, or fallback
  const highlightedCategories = (data?.highlightedCategories ?? [])
    .filter(Boolean)
    .map(toCategoryCardData);
  const displayCategories =
    highlightedCategories.length > 0 ? highlightedCategories : allCategories.slice(0, 4);

  return (
    <PageTransition>
      <div className="flex flex-col gap-4">
        <FilterBar categories={allCategories} />
        <HighlightedCarousel slides={carouselSlides} />
        <ArticleGrid
          latestArticles={latestArticles}
          popularArticles={popularArticles}
          sponsoredArticles={sponsoredArticles}
        />
        <HighlightedCategories categories={displayCategories} />
        <UpcomingEvents events={highlightedEvents} />
      </div>
    </PageTransition>
  );
}
