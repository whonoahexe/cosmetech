import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Separator } from "@/components/ui/separator";

type ArticlePromoProps = {
  articles: ArticleCardData[];
};

export function ArticlePromo({ articles }: ArticlePromoProps) {
  if (articles.length === 0) return null;

  return (
    <div className="flex flex-col gap-0">
      {articles.map((article, i) => (
        <div key={article.slug ?? article.title}>
          <ArticleCard
            {...article}
            variant="list"
            className="[&_h3]:text-primary"
            showSeparator={false}
          />
          {i < articles.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
