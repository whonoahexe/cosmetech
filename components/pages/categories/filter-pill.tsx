"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type FilterPillProps = {
  label: string;
  value: string;
  options: string[];
  onOptionSelect?: (option: string) => void;
};

export function FilterPill({ label, value, options, onOptionSelect }: FilterPillProps) {
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
          <DropdownMenuItem
            key={option}
            className="type-paragraph-small cursor-pointer"
            onClick={() => onOptionSelect?.(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
