"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { ALL_CATEGORIES } from "@/components/pages/home/highlighted-categories";
import { FilterPill } from "./filter-pill";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SEARCH_TOPIC_OPTIONS = [
  "Any topic",
  "Consumer trends",
  "Ingredients",
  "Packaging innovation",
  "Compliance",
];

const TIME_OPTIONS = ["Any Time", "Last 7 days", "Last 30 days", "This year"];

import { useRouter } from "next/navigation";

function CategoryHeroFiltersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const selectedCategory =
    ALL_CATEGORIES.find((c) => c.slug === categoryParam) || ALL_CATEGORIES[0];

  return (
    <section className="flex flex-col items-center gap-8 py-8 mt-4">
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="type-heading-1 text-foreground px-14">{selectedCategory.name}</h1>
        <p className="type-paragraph-large-medium text-muted-foreground">
          {selectedCategory.description}
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <ButtonGroup className="mx-auto w-fit min-w-max">
          <FilterPill
            label="In"
            value={selectedCategory.name}
            options={ALL_CATEGORIES.map((category) => category.name)}
            onOptionSelect={(name) => {
              const cat = ALL_CATEGORIES.find((c) => c.name === name);
              if (cat) router.push(`/categories?category=${cat.slug}`);
            }}
          />
          <FilterPill label="In" value="Search Topics" options={SEARCH_TOPIC_OPTIONS} />
          <FilterPill label="From" value="Any Time" options={TIME_OPTIONS} />
        </ButtonGroup>
      </div>
    </section>
  );
}

export function CategoryHeroFilters() {
  return (
    <Suspense
      fallback={
        <section className="flex flex-col items-center gap-8 py-8 mt-4">
          <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
            <h1 className="type-heading-1 text-foreground px-14">Loading...</h1>
          </div>
        </section>
      }
    >
      <CategoryHeroFiltersContent />
    </Suspense>
  );
}
