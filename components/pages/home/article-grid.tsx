"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard, type ArticleCardData } from "./article-card";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type ArticleFilter = "latest" | "popular" | "sponsored" | "all";

const FILTER_LABELS: Record<ArticleFilter, string> = {
  latest: "The Latest",
  popular: "Most Popular",
  sponsored: "Sponsored",
  all: "All Articles",
};

interface ArticleGridProps {
  latestArticles?: ArticleCardData[];
  popularArticles?: ArticleCardData[];
  sponsoredArticles?: ArticleCardData[];
  className?: string;
}

export function ArticleGridContent({
  latestArticles = [],
  popularArticles = [],
  sponsoredArticles = [],
  className,
}: ArticleGridProps) {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("sort")?.toLowerCase();

  const filter: ArticleFilter = ["latest", "popular", "sponsored", "all"].includes(
    filterParam as string
  )
    ? (filterParam as ArticleFilter)
    : "latest";

  let articles: ArticleCardData[];
  switch (filter) {
    case "popular":
      articles = popularArticles;
      break;
    case "sponsored":
      articles = sponsoredArticles;
      break;
    case "latest":
    default:
      articles = latestArticles;
      break;
  }

  const [leftTop, leftBottom, center, rightTop, rightBottom] = articles;

  return (
    <section id="article-grid" className={cn("flex flex-col", className)}>
      {/* Section header */}
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">{FILTER_LABELS[filter]}</h2>
        <Button
          variant="outline"
          className="rounded-full shrink-0 w-16"
          aria-label="View all articles"
        >
          <ArrowUpRight className="size-4" />
        </Button>
      </div>

      {/* 8-col grid */}
      <div className="grid grid-cols-8 gap-5 py-4">
        <div className="col-span-2 flex flex-col gap-5">
          {leftTop && <ArticleCard {...leftTop} colSpan={2} />}
          {leftBottom && <ArticleCard {...leftBottom} colSpan={2} />}
        </div>

        <div className="col-span-4">{center && <ArticleCard {...center} colSpan={4} />}</div>

        <div className="col-span-2 flex flex-col gap-5">
          {rightTop && <ArticleCard {...rightTop} colSpan={2} />}
          {rightBottom && <ArticleCard {...rightBottom} colSpan={2} />}
        </div>
      </div>
    </section>
  );
}

export function ArticleGrid(props: ArticleGridProps) {
  return (
    <Suspense
      fallback={
        <section id="article-grid" className={cn("flex flex-col", props.className)}>
          <div className="flex items-end gap-6 py-4">
            <Skeleton className="h-12 w-48 rounded-md" />
          </div>
          <div className="grid grid-cols-8 gap-5 py-4">
            <div className="col-span-2 flex flex-col gap-5">
              <Skeleton className="h-100 w-full rounded-[30px]" />
              <Skeleton className="h-100 w-full rounded-[30px]" />
            </div>
            <div className="col-span-4">
              <Skeleton className="h-205 w-full rounded-[30px]" />
            </div>
            <div className="col-span-2 flex flex-col gap-5">
              <Skeleton className="h-100 w-full rounded-[30px]" />
              <Skeleton className="h-100 w-full rounded-[30px]" />
            </div>
          </div>
        </section>
      }
    >
      <ArticleGridContent {...props} />
    </Suspense>
  );
}
