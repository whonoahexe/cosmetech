import { revalidatePath } from "next/cache";
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

  const paths: string[] = [];

  switch (docType) {
    case "article":
      paths.push("/", "/articles", "/news");
      if (slug) paths.push(`/article/${slug}`);
      break;
    case "event":
      paths.push("/", "/events");
      if (slug) paths.push(`/events/${slug}`);
      break;
    case "category":
      paths.push("/", "/categories");
      if (slug) paths.push(`/categories/${slug}`);
      break;
    case "advertisement":
      paths.push("/", "/articles", "/news", "/events");
      break;
    case "homePage":
      paths.push("/");
      break;
    case "newsPage":
      paths.push("/news");
      break;
    case "eventsPage":
      paths.push("/events");
      break;
    case "aboutPage":
      paths.push("/about");
      break;
    case "contactPage":
      paths.push("/contact");
      break;
    case "faqPage":
      paths.push("/faq");
      break;
    case "privacyPolicyPage":
      paths.push("/privacy-policy");
      break;
    case "termsPage":
      paths.push("/terms");
      break;
    case "siteSettings":
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, revalidated: ["/ (layout)"] });
    default:
      revalidatePath("/", "layout");
      return NextResponse.json({ ok: true, revalidated: ["/ (layout)"] });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
