import { AllArticlesSection } from "@/components/pages/categories";
import { getAllArticles } from "@/sanity/lib/loaders";
import { toArticleCardData } from "@/lib/mappers";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type Props = { searchParams: Promise<{ sort?: string }> };

const SORT_LABELS: Record<string, string> = {
  Latest: "The Latest",
  Popular: "Most Popular",
  Sponsored: "Sponsored",
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { sort } = await searchParams;
  const label = SORT_LABELS[sort ?? ""] ?? "The Latest";
  return buildMetadata(null, { title: `${label} | Cosmetech` });
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { sort } = await searchParams;

  const sanitySort = sort === "Popular" ? "popular" : "latest";
  const rawArticles = await getAllArticles(sanitySort);

  const filtered =
    sort === "Sponsored"
      ? rawArticles.filter((a) => a.isSponsored)
      : rawArticles;

  const articles = filtered.map(toArticleCardData);
  const heading = SORT_LABELS[sort ?? ""] ?? "The Latest";

  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <AllArticlesSection articles={articles} heading={heading} />
    </div>
  );
}
