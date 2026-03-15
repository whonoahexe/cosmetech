"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard, type EventCardData } from "./event-card";
import { cn } from "@/lib/utils";

// Tilt angles from Figma (index 0-4): positive = CW, negative = CCW
const TILTS = [4, -8, -4, 6, 4];

// Vertical offsets
const Y_OFFSETS = [50, 94, 0, 101, 50];

// Default z-indices: center card floats on top at rest
const DEFAULT_Z = [1, 2, 3, 2, 1];

interface UpcomingEventsProps {
  events?: EventCardData[];
  className?: string;
}

export function UpcomingEvents({ events = [], className }: UpcomingEventsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (events.length === 0) return null;

  return (
    <section className={cn("flex flex-col", className)}>
      {/* Section header */}
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">Upcoming Events</h2>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0 w-16"
          aria-label="Browse all events"
          asChild
        >
          <Link href="/events">
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* Black backdrop */}
      <div className="flex flex-col items-center justify-center gap-8 rounded-[24px] bg-popover my-4 py-8 xl:py-0 xl:h-200">
        {/* Fan layout — desktop only */}
        <div className="hidden xl:flex items-start justify-center">
          {events.slice(0, 5).map((event, i) => (
            <div
              key={i}
              className="relative"
              style={{
                zIndex: hoveredIndex === i ? 20 : (DEFAULT_Z[i] ?? 1),
                marginLeft: i === 0 ? 0 : "-72px",
                marginTop: Y_OFFSETS[i] ?? 0,
              }}
            >
              <EventCard
                {...event}
                tilt={TILTS[i] ?? 0}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>

        {/* Grid layout — mobile/tablet */}
        <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full px-4">
          {events.slice(0, 5).map((event, i) => (
            <div key={i} className="flex justify-center">
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {/* Explore All Events CTA */}
        <Button size="lg" className="rounded-full px-8 h-12" asChild>
          <Link href="/events">
            Explore All Events
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
