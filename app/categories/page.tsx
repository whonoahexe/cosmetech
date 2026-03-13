import {
  AllArticlesSection,
  CategoryHeroFilters,
  FeaturedSplitSection,
} from "@/components/pages/categories";
import { getCategoryPageData, getCategories, getArticlesByCategory } from "@/sanity/lib/loaders";
import { toArticleCardData, toCategoryCardData } from "@/lib/mappers";
import { FALLBACK_CATEGORIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type Props = { searchParams: Promise<{ category?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category: slug } = await searchParams;
  const fallback = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
  const title = fallback ? `${fallback.name} | Cosmetech` : "Categories | Cosmetech";
  return buildMetadata(null, { title });
}

export default async function CategoriesPage({ searchParams }: Props) {
  const { category: slug } = await searchParams;

  const categories = await getCategories();
  const resolvedCategories = (categories ?? []).filter(Boolean).map(toCategoryCardData);
  const allCategories = resolvedCategories.length > 0 ? resolvedCategories : FALLBACK_CATEGORIES;

  // Determine which category to display
  const selectedCategory = allCategories.find((c) => c.slug === slug) ?? allCategories[0];
  const selectedSlug = selectedCategory?.slug;

  // Try fetching CMS-configured category data first
  const categoryData = selectedSlug ? await getCategoryPageData(selectedSlug) : null;

  let featuredArticle = categoryData?.heroArticle ? toArticleCardData(categoryData.heroArticle) : null;
  let allArticles = (categoryData?.highlightedArticles ?? []).map(toArticleCardData);

  // Fall back to direct article query by category ref ID when CMS data is unavailable
  if (!featuredArticle && selectedSlug) {
    const categoryId = `category.${selectedSlug}`;
    const directArticles = await getArticlesByCategory(categoryId);
    const mapped = directArticles.map(toArticleCardData);
    featuredArticle = mapped[0] ?? null;
    allArticles = mapped.slice(1);
  }

  const sideArticles = allArticles.slice(0, 4);

  return (
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
  );
}
