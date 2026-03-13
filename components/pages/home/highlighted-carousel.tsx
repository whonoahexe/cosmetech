"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SanityImage } from "@/components/shared/sanity-image";
import type { ContentCard } from "@/sanity/lib/types";
import Link from "next/link";

function getSlideHref(card: ContentCard): string {
  if (card._type === "article" && card.slug) return `/article/${card.slug}`;
  if (card._type === "event" && card.slug) return `/events/${card.slug}`;
  if (card._type === "advertisement" && card.destinationUrl) return card.destinationUrl;
  return "#";
}

function getSlideCategory(card: ContentCard): string {
  if (card._type === "article") return card.categories?.[0]?.title ?? "Article";
  if (card._type === "event") return card.eventTags?.[0] ?? "Event";
  return card.advertiser ?? "Sponsored";
}

function getSlideReadTime(card: ContentCard): number | undefined {
  if (card._type === "article") return card.readTime;
  return undefined;
}

type HighlightedCarouselProps = {
  slides: ContentCard[];
};

export function HighlightedCarousel({ slides }: HighlightedCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (slides.length === 0) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      setApi={setApi}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="ml-0 my-4 ">
        {slides.map((slide) => {
          const href = getSlideHref(slide);
          const category = getSlideCategory(slide);
          const readTime = getSlideReadTime(slide);

          return (
            <CarouselItem key={slide._id} className="pl-0">
              <div className="relative w-full min-h-95 rounded-[24px] overflow-hidden bg-[#d9d9d9] h-150">
                {/* Background image area entirely linked */}
                <Link href={href} className="absolute inset-0 z-0">
                  <SanityImage
                    image={slide.image ?? null}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    priority
                    className="transition-opacity hover:opacity-90"
                  />
                </Link>

                {/* Article details */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-16 text-center pointer-events-none">
                  {/* Metadata row */}
                  <div className="flex items-center gap-3 pointer-events-auto">
                    <Badge>{category}</Badge>
                    {readTime && (
                      <>
                        <span className="text-foreground type-paragraph-medium">•</span>
                        <span className="text-muted-foreground type-paragraph-mini">
                          {readTime} min read
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={href} className="pointer-events-auto hover:underline">
                    <h2 className="text-foreground type-heading-2">{slide.title}</h2>
                  </Link>

                  {/* Excerpt */}
                  {slide.excerpt && (
                    <p className="text-muted-foreground type-paragraph-medium max-w-130 pointer-events-auto">
                      {slide.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Dot pagination */}
      <div className="absolute bottom-13 left-0 right-0 z-10 flex items-center justify-center gap-1.5 pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-3 rounded-full transition-all duration-300 focus-visible:outline-none cursor-pointer pointer-events-auto",
              i === current ? "w-5 bg-green-50" : "w-3 bg-accent"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
