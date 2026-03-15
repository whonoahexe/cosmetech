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
    return NextResponse.json({ ok: false, error: "Missing SANITY_API_WRITE_TOKEN" }, { status: 500 });
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

  const article = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "article" && slug.current == $slug][0]{ _id }`,
    { slug }
  );

  if (!article) {
    return NextResponse.json({ ok: false, error: "Article not found" }, { status: 404 });
  }

  await writeClient.patch(article._id).setIfMissing({ viewCount: 0 }).inc({ viewCount: 1 }).commit();

  return NextResponse.json({ ok: true });
}
