"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import type { CategoryCardData } from "@/components/pages/home/category-card";
import { FilterPill } from "./filter-pill";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TIME_OPTIONS = ["Any Time", "Last 7 days", "Last 30 days", "This year"];

import { useRouter } from "next/navigation";

type CategoryHeroFiltersProps = {
  categories?: CategoryCardData[];
};

function CategoryHeroFiltersContent({ categories = [] }: CategoryHeroFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const timeParam = searchParams.get("time") ?? "Any Time";

  const selectedCategory =
    categories.find((c) => c.slug === categoryParam) || categories[0];

  if (!selectedCategory) return null;

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "Any Time" && key === "time") {
      params.delete("time");
    } else {
      params.set(key, value);
    }
    router.push(`/categories?${params.toString()}`);
  };

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
            options={categories.map((category) => category.name)}
            onOptionSelect={(name) => {
              const cat = categories.find((c) => c.name === name);
              if (cat) {
                const params = new URLSearchParams(searchParams.toString());
                params.set("category", cat.slug ?? "");
                router.push(`/categories?${params.toString()}`);
              }
            }}
          />
          <FilterPill
            label="From"
            value={timeParam}
            options={TIME_OPTIONS}
            onOptionSelect={(value) => updateParam("time", value)}
          />
        </ButtonGroup>
      </div>
    </section>
  );
}

export function CategoryHeroFilters({ categories }: CategoryHeroFiltersProps) {
  return (
    <Suspense
      fallback={
        <section className="flex flex-col items-center gap-8 py-8 mt-4">
          <div className="flex w-full max-w-2xl flex-col items-center gap-4 text-center">
            <Skeleton className="h-16 w-3/4 rounded-2xl" />
            <Skeleton className="h-6 w-1/2 rounded-full mt-2" />
          </div>
          <div className="w-full flex justify-center">
            <Skeleton className="h-12 w-150 rounded-full" />
          </div>
        </section>
      }
    >
      <CategoryHeroFiltersContent categories={categories} />
    </Suspense>
  );
}
