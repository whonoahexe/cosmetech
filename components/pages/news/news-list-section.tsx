"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

const INITIAL_COUNT = 2;
const LOAD_MORE_SIZE = 4;

type NewsListSectionProps = {
  stories?: ArticleCardData[];
};

export function NewsListSection({ stories = [] }: NewsListSectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (stories.length === 0) return null;

  const visibleStories = stories.slice(0, visibleCount);
  const hasMore = visibleCount < stories.length;

  return (
    <section className="flex flex-col py-4">
      <div className="space-y-8">
        {visibleStories.map((article) => (
          <ArticleCard key={article.slug ?? article.title} {...article} variant="news-horizontal" />
        ))}
      </div>

      {hasMore && (
        <div className="flex items-center justify-center pt-8">
          <Button
            variant="default"
            size="lg"
            className="rounded-full px-8 h-12"
            onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_SIZE, stories.length))}
          >
            Load More
            <ArrowDown className="size-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
