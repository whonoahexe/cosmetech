"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 4;

type PressReleasesSectionProps = {
  pressReleases?: ArticleCardData[];
};

export function PressReleasesSection({ pressReleases = [] }: PressReleasesSectionProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (pressReleases.length === 0) return null;

  const visibleReleases = pressReleases.slice(0, visibleCount);
  const hasMore = visibleCount < pressReleases.length;

  return (
    <section className="py-4">
      <div className="flex items-end gap-4 py-4 md:gap-6">
        <h2 className="type-heading-2 text-foreground md:type-heading-1">Press Releases</h2>
        <Button
          variant="outline"
          className="h-9 w-10 rounded-full md:w-16"
          aria-label="Press releases controls"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-5 py-4">
        {visibleReleases.map((article) => (
          <div key={article.slug ?? article.title} className="col-span-8 md:col-span-4 xl:col-span-2">
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
            onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, pressReleases.length))}
          >
            Load More
            <ArrowDown className="size-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
