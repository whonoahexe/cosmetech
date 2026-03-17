export const revalidate = 60;

import { PageTransition } from "@/components/page-transition";
import { EventsView } from "@/components/pages/events";
import { getEventsPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { toContentEventCardData } from "@/lib/mappers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEventsPageData();
  return buildMetadata(data?.seo, { title: "Events | Cosmetech" });
}

export default async function EventsPage() {
  const data = await getEventsPageData();

  const ongoingEvents = (data?.ongoingEvents ?? []).map(toContentEventCardData);
  const pastEvents = (data?.pastEvents ?? []).map(toContentEventCardData);

  return (
    <PageTransition>
      <div className="mt-4 mb-12 flex flex-col gap-4">
        <EventsView
          description={data?.pageDescription}
          ongoingEvents={ongoingEvents}
          pastEvents={pastEvents}
        />
      </div>
    </PageTransition>
  );
}
