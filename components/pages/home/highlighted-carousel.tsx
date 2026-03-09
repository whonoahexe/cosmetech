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

// Placeholder slides — replace with real ArticleCard data from Sanity
const SLIDES = [
  {
    id: "1",
    image: null as string | null,
    category: "Fragrance",
    readTime: 6,
    title: "Search Is Dead. Long Live Asking.",
    excerpt:
      "People don't search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational.",
  },
  {
    id: "2",
    image: null as string | null,
    category: "Skincare",
    readTime: 4,
    title: "The Rise of Barrier Repair.",
    excerpt:
      "Skin barriers are having a moment. Here's why every brand is pivoting to ceramides and what it means for you.",
  },
  {
    id: "3",
    image: null as string | null,
    category: "Makeup",
    readTime: 5,
    title: "Bold Lips Are Back, Again.",
    excerpt:
      "Runways are saturated with crimson and violet. The classic bold lip is making its cyclical return — but with a twist.",
  },
];

export function HighlightedCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      plugins={[plugin.current]}
      setApi={setApi}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="ml-0 my-4 ">
        {SLIDES.map((slide) => (
          <CarouselItem key={slide.id} className="pl-0">
            <div className="relative w-full min-h-95 rounded-[24px] overflow-hidden bg-[#d9d9d9] h-150">
              {/* Background image */}
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Bottom gradient for text legibility over images */}
              {/* <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" /> */}

              {/* Article details */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-16 text-center">
                {/* Metadata row */}
                <div className="flex items-center gap-3">
                  <Badge>{slide.category}</Badge>
                  <span className="text-foreground type-paragraph-medium">•</span>
                  <span className="text-muted-foreground type-paragraph-mini">
                    {slide.readTime} min read
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-foreground type-heading-2">{slide.title}</h2>

                {/* Excerpt */}
                <p className="text-muted-foreground type-paragraph-medium max-w-130">
                  {slide.excerpt}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Dot pagination — absolute over the carousel so it never moves with slides */}
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
