import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users, Wifi } from "lucide-react";

import { EventCard, type EventCardData } from "@/components/pages/home/event-card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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

// ─── Component ────────────────────────────────────────────────────────────────

export function EventPageContent() {
  return (
    <div className="flex flex-col mt-4 gap-4 mb-32">
      {/* Hero image */}
      <section className="py-4">
        <div className="h-65 w-full rounded-3xl bg-[#D9D9D9] md:h-105 lg:h-150" />
      </section>

      {/* Title & meta */}
      <section className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary">{EVENT.category}</Badge>
          {EVENT.isSponsored && <Badge variant="default">Sponsored</Badge>}
          {EVENT.isVirtual && <Badge variant="default">Virtual</Badge>}
          <span className="type-paragraph text-foreground">&bull;</span>
          <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
            {EVENT.date}
          </span>
        </div>
        <h1 className="type-heading-2 text-foreground max-w-3xl">{EVENT.title}</h1>
        <p className="type-paragraph-medium max-w-110 text-muted-foreground">
          An intensive full-day workshop on sustainable packaging, refill systems, and mono-material innovation for the beauty industry.
        </p>
      </section>

      {/* Body */}
      <section className="relative py-8 lg:px-32 xl:px-64">
        <div className="mx-auto w-full max-w-6xl">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px]">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/events">Events</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/events">{EVENT.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="type-monospaced text-primary text-[30px]!">
                  01
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="lg:pr-20 pt-16 space-y-16">
            {/* Details block */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              {/* Meta pills row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-col">
                    <span className="type-paragraph-medium text-foreground">{EVENT.date}</span>
                    <span className="type-paragraph-mini text-muted-foreground">{EVENT.time}</span>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-border" />

                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-col">
                    <span className="type-paragraph-medium text-foreground">{EVENT.location}</span>
                    {EVENT.isVirtual && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Wifi className="size-3" />
                        <span className="type-paragraph-mini">Online access available</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-border" />

                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-col">
                    <span className="type-paragraph-medium text-foreground">{EVENT.organizer}</span>
                    <span className="type-paragraph-mini text-muted-foreground">Organiser</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button className="rounded-full h-11 px-7 shrink-0" asChild>
                <a href={EVENT.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>

            <Separator />

            {/* About */}
            <div className="space-y-6">
              <h2 className="type-heading-3 text-foreground">About This Event</h2>
              {EVENT.description
                .trim()
                .split("\n\n")
                .map((para, i) => (
                  <p key={i} className="type-paragraph-large text-foreground">
                    {para.trim()}
                  </p>
                ))}
            </div>

            <Separator />

            {/* Agenda */}
            <div className="space-y-6">
              <h2 className="type-heading-3 text-foreground">Agenda</h2>
              <div className="space-y-0 divide-y divide-border">
                {EVENT.agenda.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 py-4">
                    <span className="type-monospaced text-muted-foreground w-14 shrink-0">
                      {item.time}
                    </span>
                    <span className="type-paragraph-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Related events */}
            <div className="space-y-8">
              <div className="flex items-end gap-6">
                <h2 className="type-heading-1 text-foreground">Related Events</h2>
                <Button variant="outline" size="icon" className="rounded-full shrink-0 w-16" asChild>
                  <Link href="/events">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-5">
                {RELATED_EVENTS.map((event) => (
                  <EventCard key={event.title} {...event} variant="list" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
