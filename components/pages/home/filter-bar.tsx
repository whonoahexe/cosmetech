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
import { ALL_CATEGORIES } from "./highlighted-categories";

export const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");

  // Default to Latest if not specified or invalid
  const sortOption = (
    ["Latest", "Popular", "Sponsored"].includes(sortParam as string) ? sortParam : "Latest"
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
  return (
    <div className="flex w-full justify-between items-center py-4">
      <div className="flex gap-3 justify-center items-center">
        <Button
          variant="outline"
          size="lg"
          className="px-6 border-secondary border-b capitalize"
          onClick={handleScrollToGrid}
        >
          <Zap />
          {sortOption === "Latest" ? "The Latest" : sortOption}
        </Button>
        <p className="type-heading-4">•</p>
        <ButtonGroup>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[0].slug}`}>
              <FlaskConical />
              Ingredients & Formulation
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[1].slug}`}>
              <Flower />
              Fragrance
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[2].slug}`}>
              <Box />
              Packaging
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[3].slug}`}>
              <Microscope />
              R&D
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[4].slug}`}>
              <FileCheck />
              Regulations
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[5].slug}`}>
              <ArrowUp />
              Springboard
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[6].slug}`}>
              <Megaphone />
              Marketing
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-6" asChild>
            <Link href={`/categories?category=${ALL_CATEGORIES[7].slug}`}>
              <Sparkle />
              Ai & Technology
            </Link>
          </Button>
        </ButtonGroup>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonGroup className="hover:cursor-pointer group">
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
            <DropdownMenuItem onClick={() => setSortOption("Latest")}>Latest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("Popular")}>Popular</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("Sponsored")}>
              Sponsored
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
