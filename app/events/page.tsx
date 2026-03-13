import { ArrowDown } from "lucide-react";
import { EventsHeader, EventsSection } from "@/components/pages/events";
import { Button } from "@/components/ui/button";
import { getEventsPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { toEventCardData } from "@/lib/mappers";
import { PLACEHOLDER_EVENTS } from "@/lib/constants";
import type { EventCardData } from "@/components/pages/home/event-card";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEventsPageData();
  return buildMetadata(data?.seo, { title: "Events | Cosmetech" });
}

// Hardcoded placeholder events split into ongoing/past for display when CMS has none
const PLACEHOLDER_ONGOING: EventCardData[] = [
  {
    title: "Cosmetech Formulation Summit 2026",
    location: "Mumbai",
    category: "conference",
    date: "19 March 2026",
    excerpt: "An intensive summit bringing together R&D leads and formulation scientists across the beauty and personal care industry.",
    href: "/events",
  },
  {
    title: "Fragrance & Sensory Forum",
    location: "Dubai",
    category: "workshop",
    date: "12 April 2026",
    excerpt: "A two-day forum exploring the science and art of fragrance, from raw materials to consumer experience.",
    href: "/events",
  },
  {
    title: "Sustainable Packaging Expo",
    location: "Singapore",
    category: "expo",
    date: "6 May 2026",
    excerpt: "Showcasing the latest innovations in sustainable cosmetic packaging, refill systems, and mono-material design.",
    href: "/events",
  },
];

const PLACEHOLDER_PAST: EventCardData[] = [
  {
    title: "BeautyTech & AI Innovation Expo",
    location: "Bengaluru",
    category: "expo",
    date: "22 January 2026",
    excerpt: "Where AI, machine learning, and digital innovation intersect with the beauty industry.",
    isSponsored: true,
    href: "/events",
  },
  {
    title: "Regulatory & Compliance Workshop: Asia-Pacific",
    location: "Virtual",
    category: "webinar",
    date: "15 February 2026",
    excerpt: "A deep dive into the evolving regulatory landscape for cosmetics across Southeast Asian markets.",
    isVirtual: true,
    href: "/events",
  },
];

export default async function EventsPage() {
  const data = await getEventsPageData();

  const ongoingEvents = (data?.ongoingEvents ?? []).map(toEventCardData);
  const pastEvents = (data?.pastEvents ?? []).map(toEventCardData);

  const displayOngoing = ongoingEvents.length > 0 ? ongoingEvents : PLACEHOLDER_ONGOING;
  const displayPast = pastEvents.length > 0 ? pastEvents : PLACEHOLDER_PAST;

  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <EventsHeader description={data?.pageDescription} />

      <EventsSection title="Ongoing" events={displayOngoing} />
      <EventsSection title="Past Events" events={displayPast} />

      <div className="flex items-center justify-center py-4">
        <Button variant="default" size="lg" className="h-12 rounded-full px-8">
          Load More
          <ArrowDown className="size-4" />
        </Button>
      </div>
    </div>
  );
}
