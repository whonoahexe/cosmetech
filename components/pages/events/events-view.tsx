"use client";

import { useState } from "react";
import type { EventCardData } from "@/components/pages/home/event-card";
import { EventsHeader } from "./events-header";
import { EventsSection } from "./events-section";

type EventTag = "conference" | "workshop" | "webinar" | "expo";

type EventsViewProps = {
  description?: string;
  ongoingEvents: EventCardData[];
  pastEvents: EventCardData[];
};

export function EventsView({ description, ongoingEvents, pastEvents }: EventsViewProps) {
  const [activeTag, setActiveTag] = useState<EventTag | null>(null);
  const [pastOnly, setPastOnly] = useState(false);

  const filterByTag = (events: EventCardData[]) =>
    activeTag ? events.filter((e) => e.category === activeTag) : events;

  const filteredOngoing = filterByTag(ongoingEvents);
  const filteredPast = filterByTag(pastEvents);

  return (
    <>
      <EventsHeader
        description={description}
        activeTag={activeTag}
        pastOnly={pastOnly}
        onTagToggle={(tag) => setActiveTag((prev) => (prev === tag ? null : tag))}
        onPastOnlyToggle={() => setPastOnly((prev) => !prev)}
      />
      {!pastOnly && <EventsSection title="Ongoing" events={filteredOngoing} />}
      <EventsSection title="Past Events" events={filteredPast} initialLimit={4} />
    </>
  );
}
