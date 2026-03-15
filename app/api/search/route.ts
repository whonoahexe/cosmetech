import { NextResponse } from "next/server";
import { searchContent } from "@/sanity/lib/loaders";
import { CATEGORY_REF_TO_NAME } from "@/lib/constants";

export type SearchResultType = "article" | "news" | "pressRelease" | "event";

export type SearchResultItem = {
  id: string;
  type: SearchResultType;
  title: string;
  href: string;
  label: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) return NextResponse.json({ results: [] });

  const results = await searchContent(q);

  const mapped: SearchResultItem[] = results.flatMap((r): SearchResultItem[] => {
    if (r._type === "event") {
      return [{
        id: r._id,
        type: "event",
        title: r.title,
        href: r.slug ? `/events/${r.slug}` : "#",
        label: r.eventTags?.[0] ?? "Event",
      }];
    }

    if (r._type === "article") {
      const isPressRelease = r.contentKinds?.includes("pressRelease");
      const isNews = r.contentKinds?.includes("news");
      const type: SearchResultType = isPressRelease ? "pressRelease" : isNews ? "news" : "article";

      const category =
        r.categories?.find((c) => c?.title)?.title ??
        (() => {
          const ref = r.categoryRefs?.[0] ?? "";
          return CATEGORY_REF_TO_NAME[ref.replace(/^category\./, "")] ?? "Article";
        })();

      return [{
        id: r._id,
        type,
        title: r.title,
        href: r.slug ? `/article/${r.slug}` : "#",
        label: category,
      }];
    }

    return [];
  });

  return NextResponse.json({ results: mapped });
}
