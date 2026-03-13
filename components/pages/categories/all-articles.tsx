import { ArrowDown } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

type AllArticlesSectionProps = {
  articles: ArticleCardData[];
};

export function AllArticlesSection({ articles }: AllArticlesSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="flex flex-col mb-12">
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">All Articles</h2>
        <Button variant="outline" className="h-9 rounded-full w-16" aria-label="Sort all articles">
          <ArrowDown className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 py-4 md:grid-cols-4">
        {articles.map((article) => (
          <div key={article.title} className="md:col-span-1">
            <ArticleCard {...article} colSpan={2} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-4">
        <Button variant="default" size="lg" className="rounded-full px-8 h-12">
          Load More
          <ArrowDown className="size-4" />
        </Button>
      </div>
    </section>
  );
}
