import { PageTransition } from "@/components/page-transition";
import {
  AllArticlesSection,
  CategoryHeroFilters,
  FeaturedSplitSection,
} from "@/components/pages/categories";
import { getCategoryPageData, getCategories, getArticlesByCategory } from "@/sanity/lib/loaders";
import { toArticleCardData, toCategoryCardData } from "@/lib/mappers";
import { FALLBACK_CATEGORIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import type { ArticleCard } from "@/sanity/lib/types";
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

function filterByTime(articles: ArticleCard[], time: string | undefined): ArticleCard[] {
  const cutoff = getTimeCutoff(time);
  if (!cutoff) return articles;
  return articles.filter((a) => {
    const date = a.publishDate ? new Date(a.publishDate) : null;
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

  // Try fetching CMS-configured category data first
  const categoryData = selectedSlug ? await getCategoryPageData(selectedSlug) : null;

  let rawFeaturedArticle = categoryData?.heroArticle ?? null;
  let rawAllArticles: ArticleCard[] = (categoryData?.highlightedArticles ?? []) as ArticleCard[];

  // Fall back to direct article query by category ref ID when CMS data is unavailable
  if (!rawFeaturedArticle && selectedSlug) {
    const categoryId = `category.${selectedSlug}`;
    const directArticles = await getArticlesByCategory(categoryId);
    rawFeaturedArticle = directArticles[0] ?? null;
    rawAllArticles = directArticles.slice(1);
  }

  // Apply time filter before mapping
  const filteredRawAll = filterByTime(rawAllArticles, time);
  const filteredFeatured =
    rawFeaturedArticle && filterByTime([rawFeaturedArticle], time).length > 0
      ? rawFeaturedArticle
      : null;

  const featuredArticle = filteredFeatured ? toArticleCardData(filteredFeatured) : null;
  const allArticles = filteredRawAll.map(toArticleCardData);
  const sideArticles = allArticles.slice(0, 4);

  return (
    <PageTransition>
      <div className="flex flex-col gap-4">
      <CategoryHeroFilters categories={allCategories} />
      {featuredArticle && (
        <FeaturedSplitSection
          featuredArticle={featuredArticle}
          sideArticles={sideArticles}
        />
      )}
      {allArticles.length > 0 && <AllArticlesSection articles={allArticles} />}
    </div>
    </PageTransition>
  );
}
