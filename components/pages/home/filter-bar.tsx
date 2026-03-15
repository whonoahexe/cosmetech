"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  Box,
  FileCheck,
  FlaskConical,
  Flower,
  Megaphone,
  Microscope,
  Sparkle,
  Zap,
} from "lucide-react";
import type { CategoryCardData } from "./category-card";

const ICONS = [
  FlaskConical,
  Flower,
  Box,
  Microscope,
  FileCheck,
  ArrowUp,
  Megaphone,
  Sparkle,
];

const SORT_OPTIONS = ["Latest", "Popular", "Sponsored"];

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export function FilterBarSkeleton() {
  return (
    <div className="flex w-full items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-36 rounded-full" />
        <p className="hidden md:block type-heading-4 text-muted-foreground">•</p>
        <div className="hidden md:flex gap-1">
          <Skeleton className="h-11 w-28 rounded-full" />
          <Skeleton className="h-11 w-28 rounded-full" />
          <Skeleton className="h-11 w-28 rounded-full" />
        </div>
      </div>
      <div className="flex gap-1">
        <Skeleton className="h-11 w-28 rounded-full" />
        <Skeleton className="h-11 w-11 rounded-full" />
      </div>
    </div>
  );
}

function FilterBarContent({ categories = [] }: { categories?: CategoryCardData[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");

  // Default to Latest if not specified or invalid
  const sortOption = (
    SORT_OPTIONS.includes(sortParam as string) ? sortParam : "Latest"
  ) as "Latest" | "Popular" | "Sponsored";

  const setSortOption = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleScrollToGrid = () => {
    const gridEl = document.getElementById("article-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categoriesWithIcons = categories.map((cat, i) => ({
    ...cat,
    Icon: ICONS[i % ICONS.length],
  }));

  return (
    <div className="flex w-full items-center justify-between py-4 gap-3">
      {/* Left: active-filter indicator + category pills (pills hidden on mobile) */}
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="outline"
          size="lg"
          className="shrink-0 px-6 border-secondary border-b capitalize"
          onClick={handleScrollToGrid}
        >
          <Zap />
          {sortOption === "Latest" ? "The Latest" : sortOption}
        </Button>
        <p className="hidden md:block shrink-0 type-heading-4">•</p>
        <div className="hidden md:block overflow-x-auto">
          <ButtonGroup className="shrink-0">
            {categoriesWithIcons.map((cat) => (
              <Button key={cat.slug} variant="outline" size="lg" className="px-6" asChild>
                <Link href={`/categories?category=${cat.slug}`}>
                  <cat.Icon />
                  {cat.name}
                </Link>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>

      {/* Right: sort picker — always visible */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonGroup className="shrink-0 hover:cursor-pointer group">
            <Button
              variant="outline"
              size="lg"
              className="px-6 pointer-events-none group-hover:bg-accent group-hover:text-accent-foreground"
            >
              {sortOption}
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="More Options"
              className="pointer-events-none group-hover:bg-accent group-hover:text-accent-foreground"
            >
              <ArrowDown />
            </Button>
          </ButtonGroup>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem key={option} onClick={() => setSortOption(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function FilterBar({ categories }: { categories?: CategoryCardData[] }) {
  return (
    <Suspense fallback={<FilterBarSkeleton />}>
      <FilterBarContent categories={categories} />
    </Suspense>
  );
}
