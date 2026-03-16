"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import { darkGradient } from "@/lib/card-gradient";

export interface EventCardData {
  title: string;
  location: string;
  date: string;
  category?: string;
  excerpt?: string;
  image?: SanityImageType;
  isVirtual?: boolean;
  isSponsored?: boolean;
  href?: string;
}

interface EventCardProps extends EventCardData {
  variant?: "stacked" | "list";
  tilt?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

function EventCardList({
  title,
  location,
  date,
  category,
  excerpt,
  image,
  isSponsored,
  href,
  className,
}: EventCardProps) {
  const inner = (
    <article className={cn("flex flex-col sm:flex-row sm:items-center gap-5 group", className)}>
      <div className="relative h-48 w-full sm:h-60 sm:w-56 xl:w-109 shrink-0 overflow-hidden rounded-3xl bg-muted">
        <SanityImage image={image ?? null} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 224px, 436px" />
      </div>

      <div className="flex xl:min-h-60 flex-1 flex-col justify-between py-4">
        <div className="flex items-center gap-2.5">
          <Badge variant="secondary">{category ?? location}</Badge>
          {isSponsored && <Badge variant="default">Sponsored</Badge>}
          <span className="type-paragraph text-foreground">&bull;</span>
          <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
            {date}
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="type-heading-3 text-foreground group-hover:underline transition-all">
            {title}
          </h3>
          <p className="type-paragraph-medium text-muted-foreground">{excerpt}</p>
        </div>
      </div>
    </article>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}

function EventCardStacked({
  title,
  location,
  date,
  image,
  isVirtual,
  isSponsored,
  href,
  tilt = 0,
  onHoverStart,
  onHoverEnd,
  className,
}: EventCardProps) {
  const country = location.includes(",")
    ? (location.split(",").at(-1)?.trim() ?? location)
    : location;

  return (
    <motion.div
      className={cn("cursor-pointer", className)}
      initial={{ rotate: tilt }}
      animate={{ rotate: tilt }}
      whileHover={{ rotate: 0, y: -48 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <div className="w-75 h-95 rounded-[24px] border border-border bg-[#D9D9D9] flex flex-col items-center justify-between px-6 py-16 gap-6">
        {/* Thumbnail */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-primary/30">
          <SanityImage image={image ?? null} alt={title} fill sizes="96px" />
        </div>

        {/* Details */}
        <div className="flex flex-col items-center gap-3 w-full">
          <h4 className="type-heading-4 text-foreground text-center">{title}</h4>

          {/* Metadata row */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Badge variant="secondary">{country}</Badge>
            {isVirtual && <Badge variant="default">Virtual</Badge>}
            {isSponsored && <Badge>Sponsored</Badge>}
            <span className="type-paragraph-medium text-foreground">•</span>
            <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
              {date}
            </span>
          </div>

          {/* CTA */}
          {href ? (
            <Button
              variant="outline"
              className="rounded-full w-16"
              aria-label={`View ${title}`}
              asChild
            >
              <Link href={href}>
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="rounded-full w-16" aria-label={`View ${title}`}>
              <ArrowUpRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function EventCard(props: EventCardProps) {
  const { variant = "stacked" } = props;

  if (variant === "list") {
    return <EventCardList {...props} />;
  }

  return <EventCardStacked {...props} />;
}
