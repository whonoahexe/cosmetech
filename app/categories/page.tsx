import {
  AllArticlesSection,
  CategoryHeroFilters,
  FeaturedSplitSection,
} from "@/components/pages/categories";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <CategoryHeroFilters />
      <FeaturedSplitSection />
      <AllArticlesSection />
    </div>
  );
}
