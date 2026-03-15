import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const token = process.env.SANITY_API_WRITE_TOKEN;

  // Published-only client (no token)
  const publishedClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
  });

  // Raw client with token — sees drafts too
  const rawClient = token
    ? createClient({ projectId, dataset, apiVersion, useCdn: false, token, perspective: "raw" })
    : null;

  const eventQuery = `*[_type == "event"]{ _id, title, startDate, endDate, "slug": slug.current }`;

  const publishedEvents = await publishedClient.fetch(eventQuery);
  const rawEvents = rawClient ? await rawClient.fetch(eventQuery) : null;

  return NextResponse.json({
    config: { projectId, dataset, apiVersion, hasToken: !!token },
    serverTime: now,
    published: { count: publishedEvents.length, events: publishedEvents },
    raw: rawEvents
      ? { count: rawEvents.length, events: rawEvents }
      : { note: "no SANITY_API_WRITE_TOKEN set — cannot inspect drafts" },
  });
}
