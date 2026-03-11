import {
  AllArticlesSection,
  CategoryHeroFilters,
  FeaturedSplitSection,
} from "@/components/pages/categories";
import { CATEGORY_ARTICLES } from "@/components/pages/categories/all-articles";
import { FEATURED_ARTICLE, SIDE_ARTICLES } from "@/components/pages/categories/featured-split";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <CategoryHeroFilters />
      <FeaturedSplitSection
        featuredArticle={FEATURED_ARTICLE}
        sideArticles={SIDE_ARTICLES}
      />
      <AllArticlesSection articles={CATEGORY_ARTICLES} />
    </div>
  );
}
