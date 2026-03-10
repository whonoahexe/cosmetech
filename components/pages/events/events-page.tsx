import { ArrowDown, Calendar, Clapperboard, Store, Wrench, Zap } from "lucide-react";

import { EventCard, type EventCardData } from "@/components/pages/home/event-card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const ONGOING_EVENTS: EventCardData[] = [
  {
    title: "Sustainable Packaging for Beauty Workshop",
    location: "Mumbai",
    category: "Conferences",
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
  },
  {
    title: "Global Ingredients & Formulation Summit",
    location: "Dubai",
    category: "Workshops",
    isSponsored: true,
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
  },
  {
    title: "Cosmetech R&D Leadership Forum",
    location: "Singapore",
    category: "Conferences",
    date: "14/03/2026",
    excerpt:
      "A strategic forum bringing together innovation leaders working across formulation, testing, and commercialization.",
  },
];

const PAST_EVENTS: EventCardData[] = [
  {
    title: "Fragrance Futures: Scent & Sensory Forum",
    location: "Mumbai",
    category: "Workshops",
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
  },
  {
    title: "AI & BeautyTech Webinar Series",
    location: "Virtual",
    category: "Webinars",
    isSponsored: true,
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
  },
  {
    title: "Sustainable Packaging for Beauty Workshop",
    location: "Delhi",
    category: "Expos",
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
  },
  {
    title: "Global Ingredients & Formulation Summit",
    location: "Bengaluru",
    category: "Webinars",
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
  },
  {
    title: "Regulatory Compliance in Cosmetics: APAC Edition",
    location: "Singapore",
    category: "Expos",
    isSponsored: true,
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
  },
  {
    title: "Cosmetech Industry Expo & Networking Meet",
    location: "Dubai",
    category: "Conferences",
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
  },
];

function EventsSection({ title, events }: { title: string; events: EventCardData[] }) {
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

export function EventsPageContent() {
  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <section className="grid grid-cols-8 gap-5 py-8">
        <div className="col-span-8 flex max-w-230 flex-col gap-4 xl:col-span-5">
          <h1 className="type-heading-1 text-foreground">EVENTS</h1>

          <div className="flex flex-wrap items-center gap-3 py-4">
            <Button variant="outline" size="sm" className="h-10 rounded-full border-secondary px-6">
              <Zap className="size-4" />
              Upcoming
            </Button>

            <span className="type-heading-4 text-foreground">&bull;</span>

            <ButtonGroup>
              <Button variant="outline" size="sm" className="h-10 px-6">
                <Calendar className="size-4" />
                Conferences
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-6">
                <Wrench className="size-4" />
                Workshops
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-6">
                <Clapperboard className="size-4" />
                Webinars
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-6">
                <Store className="size-4" />
                Expos
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <p className="type-paragraph-large-medium col-span-8 max-w-166 text-foreground xl:col-span-3 xl:pt-2">
          Conferences, workshops, and industry gatherings from across the global cosmetics and
          personal care sector. Explore upcoming events, past highlights, and opportunities to
          connect with researchers, manufacturers, and innovators shaping the future of beauty.
        </p>
      </section>

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
