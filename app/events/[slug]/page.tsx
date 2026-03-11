import {
  EventAbout,
  EventAgenda,
  EventBreadcrumb,
  EventDetails,
  EventHero,
  EventRelated,
  EventTitle,
} from "@/components/pages/events";
import { type EventCardData } from "@/components/pages/home/event-card";
import { Separator } from "@/components/ui/separator";

// ─── Placeholder data ────────────────────────────────────────────────────────

const EVENT = {
  title: "Sustainable Packaging for Beauty Workshop",
  category: "Conferences",
  location: "Mumbai, India",
  date: "18 February 2026",
  time: "9:00 AM – 5:00 PM IST",
  organizer: "Cosmetech Media Group",
  isSponsored: false,
  isVirtual: false,
  registrationUrl: "#",
  description: `
    An intensive, full-day workshop bringing together R&D leads, supply chain
    directors, and sustainability officers from across the beauty and personal
    care industry. Sessions cover the regulatory landscape for single-use
    plastics, next-generation refill architecture, mono-material laminate
    innovations from global suppliers, and life-cycle assessment methodology
    for cosmetic packaging lines.

    Attendees leave with a working framework for auditing their current
    packaging portfolio and a curated list of verified supplier contacts
    actively operating in the South and Southeast Asian market.
  `,
  agenda: [
    { time: "09:00", label: "Registration & Networking Breakfast" },
    { time: "10:00", label: "Opening Keynote: The Regulatory Horizon" },
    { time: "11:30", label: "Panel — Refill Systems at Commercial Scale" },
    { time: "13:00", label: "Lunch Break" },
    { time: "14:00", label: "Workshop: Mono-Material Design Principles" },
    { time: "15:30", label: "Supplier Showcase & Networking" },
    { time: "17:00", label: "Closing Remarks" },
  ],
};

const RELATED_EVENTS: EventCardData[] = [
  {
    title: "Global Ingredients & Formulation Summit",
    location: "Dubai",
    category: "Workshops",
    date: "21/02/2026",
    excerpt:
      "A two-day gathering focused on ingredient innovation, formulation science, and stability testing.",
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

export default function EventPage() {
  return (
    <div className="flex flex-col mt-4 gap-4 mb-32">
      <EventHero />
      <EventTitle
        title={EVENT.title}
        category={EVENT.category}
        date={EVENT.date}
        isSponsored={EVENT.isSponsored}
        isVirtual={EVENT.isVirtual}
      />

      <section className="relative py-8 lg:px-32 xl:px-64">
        <div className="mx-auto w-full max-w-6xl">
          <EventBreadcrumb category={EVENT.category} />

          <div className="lg:pr-20 pt-16 space-y-16">
            <EventDetails
              date={EVENT.date}
              time={EVENT.time}
              location={EVENT.location}
              organizer={EVENT.organizer}
              isVirtual={EVENT.isVirtual}
              registrationUrl={EVENT.registrationUrl}
            />

            <Separator />
            <EventAbout description={EVENT.description} />

            <Separator />
            <EventAgenda agenda={EVENT.agenda} />

            <Separator />
            <EventRelated events={RELATED_EVENTS} />
          </div>
        </div>
      </section>
    </div>
  );
}
