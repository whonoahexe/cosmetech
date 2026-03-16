"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";

import { EventCard, type EventCardData } from "@/components/pages/home/event-card";
import { Button } from "@/components/ui/button";

export function EventsSection({
  title,
  events,
  initialLimit,
}: {
  title: string;
  events: EventCardData[];
  initialLimit?: number;
}) {
  const [showAll, setShowAll] = useState(false);

  if (events.length === 0) return null;

  const visibleEvents = initialLimit && !showAll ? events.slice(0, initialLimit) : events;
  const hasMore = !!initialLimit && !showAll && events.length > initialLimit;

  return (
    <section className="space-y-4">
      <div className="flex items-end gap-4 py-4 md:gap-6">
        <h2 className="type-heading-2 text-foreground md:type-heading-1">{title}</h2>
        <Button
          variant="outline"
          className="h-9 w-10 rounded-full md:w-16"
          aria-label={`${title} controls`}
        >
          <ArrowDown className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-y-8 py-4 xl:grid-cols-2 xl:gap-x-5">
        {visibleEvents.map((event) => (
          <div key={`${title}-${event.title}-${event.date}`}>
            <EventCard {...event} variant="list" />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex items-center justify-center py-4">
          <Button
            variant="default"
            size="lg"
            className="h-12 rounded-full px-8"
            onClick={() => setShowAll(true)}
          >
            Load More
            <ArrowDown className="size-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
