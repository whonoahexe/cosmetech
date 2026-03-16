import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard, type CategoryCardData } from "./category-card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HighlightedCategoriesProps {
  categories?: CategoryCardData[];
  className?: string;
}

export function HighlightedCategories({
  categories = [],
  className,
}: HighlightedCategoriesProps) {
  const [first, second, third, fourth] = categories.slice(0, 4);

  if (!first) return null;

  return (
    <section className={cn("flex flex-col", className)}>
      {/* Section header */}
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">Categories</h2>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0 w-16"
          aria-label="Browse all categories"
          asChild
        >
          <Link href="/categories">
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* responsive grid: 1-col → 2-col → 2-3-3 at xl */}
      <div className="grid grid-cols-1 gap-5 py-4 sm:grid-cols-2 xl:grid-cols-8 xl:h-109.25">
        {first && (
          <div className="col-span-full sm:col-span-1 xl:col-span-2">
            <CategoryCard {...first} className="aspect-[4/3] xl:aspect-auto xl:h-full" />
          </div>
        )}

        {second && (
          <div className="col-span-full sm:col-span-1 xl:col-span-3">
            <CategoryCard {...second} className="aspect-[4/3] xl:aspect-auto xl:h-full" />
          </div>
        )}

        <div className="col-span-full xl:col-span-3 flex flex-col gap-5">
          {third && <CategoryCard {...third} className="aspect-[4/3] xl:aspect-auto xl:flex-1" />}
          {fourth && <CategoryCard {...fourth} className="aspect-[4/3] xl:aspect-auto xl:flex-1" />}
        </div>
      </div>
    </section>
  );
}
