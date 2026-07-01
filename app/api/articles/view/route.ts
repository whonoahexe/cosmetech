import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/env";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
  perspective: "published",
});

export async function POST(req: Request) {
  if (!writeToken) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_API_WRITE_TOKEN" },
      { status: 500 }
    );
  }

  let slug: string | undefined;
  try {
    const body = await req.json();
    slug = typeof body?.slug === "string" ? body.slug : undefined;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
  }

  // Patch by query in a single request (no separate _id lookup). A non-matching
  // slug is simply a no-op, which is fine for a fire-and-forget view counter.
  await writeClient
    .patch({ query: `*[_type == "article" && slug.current == $slug]`, params: { slug } })
    .setIfMissing({ viewCount: 0 })
    .inc({ viewCount: 1 })
    .commit();

  return NextResponse.json({ ok: true });
}
