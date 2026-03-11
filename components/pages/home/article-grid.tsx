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

// Placeholder articles
const PLACEHOLDER_ARTICLES: ArticleCardData[] = [
  {
    image: null,
    category: "Packaging",
    readTime: 6,
    title: "The Aesthetic Is the Product",
    excerpt:
      "Why branding, UI, and vibes now carry more weight than features. We're all buying feelings with a side of software.",
  },
  {
    image: null,
    category: "Fragrance",
    readTime: 6,
    title: "The Death of the Casual Internet",
    excerpt:
      "Every post is optimized. Every opinion branded. Whatever happened to logging on and just being weird.",
  },
  {
    image: null,
    category: "Culture",
    readTime: 6,
    title: "The Internet Is Smaller Than It Thinks!",
    excerpt:
      "Been poking at traffic patterns and it\u2019s kind of hilarious how the \u201copen web\u201d is just five platforms in a trench coat. Algorithms looping the same creators, same takes, same aesthetics. Discovery feels like walking in circles inside a very pretty mall.",
  },
  {
    image: null,
    category: "Fragrance",
    readTime: 6,
    title: "Minimalism Was a Phase. We Want Texture Again",
    excerpt:
      "Clean design ruled for a decade. Now people want personality, clutter, and interfaces that feel human.",
  },
  {
    image: null,
    category: "Regulations",
    isSponsored: true,
    readTime: 6,
    title: "Burnout but Make It Productive",
    excerpt:
      "Hustle culture evolved into quiet overwork. Same pressure, softer language. Still exhausting.",
  },
];

interface ArticleGridProps {
  articles?: ArticleCardData[];
  className?: string;
}

export function ArticleGridContent({
  articles = PLACEHOLDER_ARTICLES,
  className,
}: ArticleGridProps) {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("sort")?.toLowerCase();

  const filter: ArticleFilter = ["latest", "popular", "sponsored", "all"].includes(
    filterParam as string
  )
    ? (filterParam as ArticleFilter)
    : "latest";

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
