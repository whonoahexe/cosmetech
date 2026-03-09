"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ALL_CATEGORIES } from "@/components/pages/home/highlighted-categories";

type FilterPillProps = {
  label: string;
  value: string;
  options: string[];
};

function FilterPill({ label, value, options }: FilterPillProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="h-auto min-h-12 px-6 text-left"
          aria-label={`${label}: ${value}`}
        >
          <span className="flex flex-col items-start leading-none">
            <span className="type-paragraph-small text-muted-foreground">{label}</span>
            <span className="type-paragraph-small-medium text-foreground">{value}</span>
          </span>
          <ChevronDown className="size-4 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem key={option} className="type-paragraph-small">
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const SEARCH_TOPIC_OPTIONS = [
  "Any topic",
  "Consumer trends",
  "Ingredients",
  "Packaging innovation",
  "Compliance",
];

const TIME_OPTIONS = ["Any Time", "Last 7 days", "Last 30 days", "This year"];

export function CategoryHeroFilters() {
  const selectedCategory = ALL_CATEGORIES[0];

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
            value="Categories"
            options={ALL_CATEGORIES.map((category) => category.name)}
          />
          <FilterPill label="In" value="Search Topics" options={SEARCH_TOPIC_OPTIONS} />
          <FilterPill label="From" value="Any Time" options={TIME_OPTIONS} />
        </ButtonGroup>
      </div>
    </section>
  );
}
