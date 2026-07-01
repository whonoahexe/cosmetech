import { PageTransition } from "@/components/page-transition";
import {
  AllArticlesSection,
  CategoryHeroFilters,
  FeaturedSplitSection,
} from "@/components/pages/categories";
import { getCategoryPageData, getCategories, getArticlesByCategory } from "@/sanity/lib/loaders";
import { toArticleCardData, toContentCardData, toCategoryCardData } from "@/lib/mappers";
import { FALLBACK_CATEGORIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import type { ArticleCard, ContentCard } from "@/sanity/lib/types";
import type { Metadata } from "next";

type Props = { searchParams: Promise<{ category?: string; time?: string }> };

function getTimeCutoff(time: string | undefined): Date | null {
  const now = new Date();
  if (time === "Last 7 days") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  if (time === "Last 30 days") {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  if (time === "This year") {
    return new Date(now.getFullYear(), 0, 1);
  }
  return null;
}

function filterByTime(items: ContentCard[], time: string | undefined): ContentCard[] {
  const cutoff = getTimeCutoff(time);
  if (!cutoff) return items;
  return items.filter((item) => {
    if (item._type !== "article") return true; // ads always pass through
    const date = item.publishDate ? new Date(item.publishDate) : null;
    return date && date >= cutoff;
  });
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category: slug } = await searchParams;
  const fallback = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
  const title = fallback ? `${fallback.name} | Cosmetech` : "Categories | Cosmetech";
  return buildMetadata(null, { title });
}

export default async function CategoriesPage({ searchParams }: Props) {
  const { category: slug, time } = await searchParams;

  const categories = await getCategories();
  const resolvedCategories = (categories ?? []).filter(Boolean).map(toCategoryCardData);
  const allCategories = resolvedCategories.length > 0 ? resolvedCategories : FALLBACK_CATEGORIES;

  // Determine which category to display
  const selectedCategory = allCategories.find((c) => c.slug === slug) ?? allCategories[0];
  const selectedSlug = selectedCategory?.slug;

  // CMS-curated hero + highlighted list (curation may be missing or partial)
  const categoryData = selectedSlug ? await getCategoryPageData(selectedSlug) : null;

  // Always pull the full set of articles in this category so the page shows all
  // of them — not just whatever was hand-curated on the category document.
  const categoryRefId = selectedSlug ? `category.${selectedSlug}` : "";
  const directArticles = selectedSlug ? await getArticlesByCategory(categoryRefId) : [];

  // Keep the category page pure: an article may only appear here if its primary
  // (first) category is this one. Applies to curated items too, so a mistaken
  // highlight/hero from another category can't leak in. Non-articles (curated
  // events/ads) pass through.
  const isPrimaryCategory = (item: ContentCard) =>
    item._type !== "article" || item.categoryRefs?.[0] === categoryRefId;

  const curatedHero =
    categoryData?.heroArticle && isPrimaryCategory(categoryData.heroArticle)
      ? categoryData.heroArticle
      : null;
  const rawFeaturedArticle = curatedHero ?? directArticles[0] ?? null;

  // Curated highlights first, then backfill with the remaining category
  // articles — excluding the hero and de-duping by _id.
  const seenIds = new Set<string>();
  if (rawFeaturedArticle?._id) seenIds.add(rawFeaturedArticle._id);

  const curatedHighlights = (categoryData?.highlightedArticles ?? []).filter(isPrimaryCategory);

  const rawAllItems: ContentCard[] = [];
  for (const item of [...curatedHighlights, ...directArticles]) {
    if (!item?._id || seenIds.has(item._id)) continue;
    seenIds.add(item._id);
    rawAllItems.push(item);
  }

  // Apply time filter before mapping
  const filteredRawAll = filterByTime(rawAllItems, time);
  const filteredFeatured =
    rawFeaturedArticle && filterByTime([rawFeaturedArticle], time).length > 0
      ? rawFeaturedArticle
      : null;

  const featuredArticle = filteredFeatured ? toArticleCardData(filteredFeatured) : null;
  const allArticles = filteredRawAll.map(toContentCardData);
  const sideArticles = allArticles.slice(0, 4);

  return (
    <PageTransition>
      <div className="flex flex-col gap-4">
        <CategoryHeroFilters categories={allCategories} />
        {featuredArticle && (
          <FeaturedSplitSection featuredArticle={featuredArticle} sideArticles={sideArticles} />
        )}
        {allArticles.length > 0 && <AllArticlesSection articles={allArticles} />}
      </div>
    </PageTransition>
  );
}
