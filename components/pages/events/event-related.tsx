import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventCard, type EventCardData } from "@/components/pages/home/event-card";
import { Button } from "@/components/ui/button";

export function EventRelated({ events }: { events: EventCardData[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-end gap-4 md:gap-6">
        <h2 className="type-heading-2 text-foreground md:type-heading-1">Related Events</h2>
        <Button variant="outline" size="icon" className="rounded-full shrink-0 w-10 md:w-16" asChild>
          <Link href="/events">
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap">
        {events.map((event) => (
          <EventCard key={event.title} {...event} variant="list" />
        ))}
      </div>
    </div>
  );
}
