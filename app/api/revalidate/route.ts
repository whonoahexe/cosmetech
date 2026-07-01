import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const secret = process.env.SANITY_REVALIDATE_SECRET;

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string } | string | null;
};

function getSlug(payload: WebhookPayload): string | undefined {
  if (!payload.slug) return undefined;
  if (typeof payload.slug === "string") return payload.slug || undefined;
  return payload.slug.current || undefined;
}

export async function POST(req: Request) {
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 }
    );
  }

  const suppliedSecret = req.headers.get("x-webhook-secret");
  if (!suppliedSecret || suppliedSecret !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await req.json()) as WebhookPayload;
  const docType = payload._type;
  const slug = getSlug(payload);

  // Tags mirror the ones set on cached reads in sanity/lib/loaders.ts. Busting a
  // tag drops the matching Data Cache entries and regenerates any route that used
  // them — so a publish reflects immediately instead of waiting out the TTL.
  const tags: string[] = [];
  const paths: string[] = [];

  switch (docType) {
    case "article":
      tags.push("home", "articles", "news", "categories");
      if (slug) tags.push(`article:${slug}`);
      paths.push("/", "/articles", "/news");
      if (slug) paths.push(`/article/${slug}`);
      break;
    case "event":
      tags.push("home", "events");
      if (slug) tags.push(`event:${slug}`);
      paths.push("/", "/events");
      if (slug) paths.push(`/events/${slug}`);
      break;
    case "category":
      tags.push("home", "categories");
      if (slug) tags.push(`category:${slug}`);
      paths.push("/", "/categories");
      break;
    case "advertisement":
      tags.push("home", "articles", "news", "events");
      paths.push("/", "/articles", "/news", "/events");
      break;
    case "homePage":
      tags.push("home");
      paths.push("/");
      break;
    case "newsPage":
      tags.push("news");
      paths.push("/news");
      break;
    case "eventsPage":
      tags.push("events");
      paths.push("/events");
      break;
    case "aboutPage":
      tags.push("pages");
      paths.push("/about");
      break;
    case "contactPage":
      tags.push("pages");
      paths.push("/contact");
      break;
    case "faqPage":
      tags.push("pages");
      paths.push("/faq");
      break;
    case "privacyPolicyPage":
      tags.push("pages");
      paths.push("/privacy-policy");
      break;
    case "termsPage":
      tags.push("pages");
      paths.push("/terms");
      break;
    case "siteSettings":
      revalidateTag("site-settings", "max");
      return NextResponse.json({ ok: true, revalidated: ["site-settings"] });
    default:
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, revalidated: ["/ (layout)"] });
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: { tags, paths } });
}
