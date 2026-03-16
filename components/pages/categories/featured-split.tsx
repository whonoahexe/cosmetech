import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";

type FeaturedSplitSectionProps = {
  featuredArticle: ArticleCardData;
  sideArticles: ArticleCardData[];
};

export function FeaturedSplitSection({
  featuredArticle,
  sideArticles,
}: FeaturedSplitSectionProps) {
  return (
    <section className="py-4">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-8">
        <div className="xl:col-span-5">
          <ArticleCard {...featuredArticle} variant="featured" colSpan={4} />
        </div>

        <div className="flex flex-col gap-6 xl:col-span-3">
          {sideArticles.map((article, index) => (
            <ArticleCard
              key={article.title}
              {...article}
              variant="list"
              showSeparator={index < sideArticles.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
