"use client";

import { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

type AllArticlesSectionProps = {
  articles: ArticleCardData[];
  heading?: string;
};

const PAGE_SIZE = 8; // Two rows at md:grid-cols-4

export function AllArticlesSection({ articles, heading = "All Articles" }: AllArticlesSectionProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleArticles = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);
  const hasMore = visibleCount < articles.length;

  if (articles.length === 0) return null;

  const onLoadMore = () => {
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, articles.length));
  };

  return (
    <section className="flex flex-col mb-12">
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">{heading}</h2>
        <Button variant="outline" className="h-9 rounded-full w-16" aria-label="Sort all articles">
          <ArrowDown className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 py-4 sm:grid-cols-2 xl:grid-cols-4">
        {visibleArticles.map((article) => (
          <div key={article.slug ?? article.title} className="xl:col-span-1">
            <ArticleCard {...article} colSpan={2} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex items-center justify-center pt-4">
          <Button
            variant="default"
            size="lg"
            className="rounded-full px-8 h-12"
            onClick={onLoadMore}
          >
            Load More
            <ArrowDown className="size-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
