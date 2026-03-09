import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard, type CategoryCardData } from "./category-card";
import { cn } from "@/lib/utils";

export const ALL_CATEGORIES: CategoryCardData[] = [
  {
    slug: "ingredients-formulation",
    name: "Ingredients & Formulation",
    description: "Raw materials, actives, and the science behind what goes into every product.",
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    description: "The art and chemistry of scent, from raw materials to the finished bottle.",
  },
  {
    slug: "packaging",
    name: "Packaging",
    description: "Design, materials, and sustainability shaping the future of cosmetic packaging.",
  },
  {
    slug: "r-and-d",
    name: "R&D",
    description:
      "Research, clinical testing, and innovations powering the next generation of formulas.",
  },
  {
    slug: "regulations",
    name: "Regulations",
    description: "Compliance, safety standards, and global frameworks every brand must navigate.",
  },
  {
    slug: "springboard",
    name: "Springboard",
    description: "Startups, new launches, and emerging ideas shaping the industry.",
  },
  {
    slug: "marketing",
    name: "Marketing",
    description: "Brand strategy, consumer trends, and the business of beauty.",
  },
  {
    slug: "ai-technology",
    name: "AI & Technology",
    description:
      "How machine learning, automation, and digital tools are reshaping the cosmetics space.",
  },
];

const DEFAULT_HIGHLIGHTED = [
  ALL_CATEGORIES[0], // Ingredients & Formulation
  ALL_CATEGORIES[2], // Packaging
  ALL_CATEGORIES[5], // Springboard
  ALL_CATEGORIES[6], // Marketing
];

interface HighlightedCategoriesProps {
  categories?: CategoryCardData[];
  className?: string;
}

export function HighlightedCategories({
  categories = DEFAULT_HIGHLIGHTED,
  className,
}: HighlightedCategoriesProps) {
  const [first, second, third, fourth] = categories.slice(0, 4);

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
        >
          <ArrowUpRight className="size-4" />
        </Button>
      </div>

      {/* 8-col grid */}
      <div className="grid grid-cols-8 gap-5 py-4 h-109.25">
        {/* Slot 0: 2-col tall */}
        {first && (
          <div className="col-span-2">
            <CategoryCard {...first} className="h-full" />
          </div>
        )}

        {second && (
          <div className="col-span-3">
            <CategoryCard {...second} className="h-full" />
          </div>
        )}

        <div className="col-span-3 flex flex-col gap-5">
          {third && <CategoryCard {...third} className="flex-1" />}
          {fourth && <CategoryCard {...fourth} className="flex-1" />}
        </div>
      </div>
    </section>
  );
}
