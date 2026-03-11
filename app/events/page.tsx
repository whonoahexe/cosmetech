import { ArrowDown } from "lucide-react";

import {
  EventsHeader,
  EventsSection,
  ONGOING_EVENTS,
  PAST_EVENTS,
} from "@/components/pages/events";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <EventsHeader />

      <EventsSection title="Ongoing" events={ONGOING_EVENTS} />
      <EventsSection title="Past Events" events={PAST_EVENTS} />

      <div className="flex items-center justify-center py-4">
        <Button variant="default" size="lg" className="h-12 rounded-full px-8">
          Load More
          <ArrowDown className="size-4" />
        </Button>
      </div>
    </div>
  );
}
