import { PageTransition } from "@/components/page-transition";
import { notFound } from "next/navigation";
import {
  EventAbout,
  EventAgenda,
  EventBreadcrumb,
  EventDetails,
  EventHero,
  EventRelated,
  EventTitle,
} from "@/components/pages/events";
import { Separator } from "@/components/ui/separator";
import { getEventPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { toEventCardData } from "@/lib/mappers";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getEventPageData(slug);
  if (!data) return {};
  return buildMetadata(data.seo, { title: data.title });
}

function formatEventDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatEventTime(startIso?: string, endIso?: string): string {
  if (!startIso) return "";
  const start = new Date(startIso);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
  if (endIso) {
    return `${fmt(start)} – ${fmt(new Date(endIso))}`;
  }
  return fmt(start);
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const data = await getEventPageData(slug);
  if (!data) notFound();

  const category = data.eventTags?.[0] ?? "Event";
  const dateStr = formatEventDate(data.startDate);
  const timeStr = formatEventTime(data.startDate, data.endDate);
  const relatedEvents = (data.relatedEvents ?? []).map(toEventCardData);

  return (
    <PageTransition>
    <div className="flex flex-col mt-4 gap-4 mb-32">
      <EventHero image={data.image} title={data.title} />
      <EventTitle
        title={data.title}
        category={category}
        date={dateStr}
        excerpt={data.excerpt}
        isSponsored={data.isSponsored}
        isVirtual={data.location?.toLowerCase() === "virtual"}
      />

      <section className="relative py-8 lg:px-32 xl:px-64">
        <div className="mx-auto w-full max-w-6xl">
          <EventBreadcrumb category={category} uid={slug} />

          <div className="lg:pr-20 pt-16 space-y-16">
            <EventDetails
              date={dateStr}
              time={timeStr}
              location={data.location ?? ""}
              organizer={data.organizer ?? ""}
              isVirtual={data.location?.toLowerCase() === "virtual"}
              registrationUrl={data.registrationUrl ?? "#"}
            />

            <Separator />
            <EventAbout body={data.body} />

            {data.agenda && data.agenda.length > 0 && (
              <>
                <Separator />
                <EventAgenda agenda={data.agenda} />
              </>
            )}

            {relatedEvents.length > 0 && (
              <>
                <Separator />
                <EventRelated events={relatedEvents} />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
