import { ArrowDown } from "lucide-react";

import { EventCard, type EventCardData } from "@/components/pages/home/event-card";
import { Button } from "@/components/ui/button";

export const ONGOING_EVENTS: EventCardData[] = [
  {
    title: "Sustainable Packaging for Beauty Workshop",
    location: "Mumbai",
    category: "Conferences",
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
    href: "/events/sustainable-packaging-for-beauty-workshop",
  },
  {
    title: "Global Ingredients & Formulation Summit",
    location: "Dubai",
    category: "Workshops",
    isSponsored: true,
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
    href: "/events/global-ingredients-formulation-summit",
  },
  {
    title: "Cosmetech R&D Leadership Forum",
    location: "Singapore",
    category: "Conferences",
    date: "14/03/2026",
    excerpt:
      "A strategic forum bringing together innovation leaders working across formulation, testing, and commercialization.",
    href: "/events/cosmetech-rd-leadership-forum",
  },
];

export const PAST_EVENTS: EventCardData[] = [
  {
    title: "Fragrance Futures: Scent & Sensory Forum",
    location: "Mumbai",
    category: "Workshops",
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
    href: "/events/fragrance-futures-scent-sensory-forum",
  },
  {
    title: "AI & BeautyTech Webinar Series",
    location: "Virtual",
    category: "Webinars",
    isSponsored: true,
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
    href: "/events/ai-beautytech-webinar-series",
  },
  {
    title: "Sustainable Packaging for Beauty Workshop",
    location: "Delhi",
    category: "Expos",
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
    href: "/events/sustainable-packaging-for-beauty-workshop-delhi",
  },
  {
    title: "Global Ingredients & Formulation Summit",
    location: "Bengaluru",
    category: "Webinars",
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
    href: "/events/global-ingredients-formulation-summit-bengaluru",
  },
  {
    title: "Regulatory Compliance in Cosmetics: APAC Edition",
    location: "Singapore",
    category: "Expos",
    isSponsored: true,
    date: "18/02/2026",
    excerpt:
      "An intensive session exploring refill systems, mono-material packaging, and evolving sustainability standards.",
    href: "/events/regulatory-compliance-in-cosmetics-apac-edition",
  },
  {
    title: "Cosmetech Industry Expo & Networking Meet",
    location: "Dubai",
    category: "Conferences",
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing across emerging and established markets.",
    href: "/events/cosmetech-industry-expo-networking-meet",
  },
];

export function EventsSection({ title, events }: { title: string; events: EventCardData[] }) {
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
