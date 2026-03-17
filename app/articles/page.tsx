import { PageTransition } from "@/components/page-transition";
import { AllArticlesSection } from "@/components/pages/categories";
import { getAllArticles, getSponsoredArticles } from "@/sanity/lib/loaders";
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

  const rawArticles =
    sort === "Sponsored"
      ? await getSponsoredArticles()
      : await getAllArticles(sort === "Popular" ? "popular" : "latest");

  const articles = rawArticles.map(toArticleCardData);
  const heading = SORT_LABELS[sort ?? ""] ?? "The Latest";

  return (
    <PageTransition>
      <div className="mt-4 mb-12 flex flex-col gap-4">
        <AllArticlesSection articles={articles} heading={heading} />
      </div>
    </PageTransition>
  );
}
