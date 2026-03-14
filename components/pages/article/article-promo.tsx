import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

type ArticlePromoProps = {
  articles: ArticleCardData[];
};

export function ArticlePromo({ articles }: ArticlePromoProps) {
  if (articles.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-end gap-6">
        <h2 className="type-heading-1 text-foreground">Related Articles</h2>
        <Button variant="outline" size="icon" className="rounded-full shrink-0 w-16" asChild>
          <Link href="/news">
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-5">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug ?? article.title}
            {...article}
            variant="list"
            showThumbnail
            className="[&_h3]:text-primary"
            showSeparator={false}
          />
        ))}
      </div>
    </div>
  );
}
