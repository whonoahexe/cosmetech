import { ArrowDown } from "lucide-react";

import { EventCard, type EventCardData } from "@/components/pages/home/event-card";
import { Button } from "@/components/ui/button";

export function EventsSection({ title, events }: { title: string; events: EventCardData[] }) {
  if (events.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end gap-6 py-4">
        <h2 className="type-heading-1 text-foreground">{title}</h2>
        <Button
          variant="outline"
          className="h-9 w-16 rounded-full"
          aria-label={`${title} controls`}
        >
          <ArrowDown className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-x-5 gap-y-8 py-4">
        {events.map((event) => (
          <div key={`${title}-${event.title}-${event.date}`} className="col-span-8 xl:col-span-4">
            <EventCard {...event} variant="list" />
          </div>
        ))}
      </div>
    </section>
  );
}
