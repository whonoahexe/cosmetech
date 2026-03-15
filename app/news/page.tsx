import { PageTransition } from "@/components/page-transition";
import {
  NewsHeader,
  NewsHeroSection,
  NewsListSection,
  PressReleasesSection,
} from "@/components/pages/news";
import { getNewsPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { toArticleCardData } from "@/lib/mappers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNewsPageData();
  return buildMetadata(data?.seo, { title: "News | Cosmetech" });
}

export default async function NewsPage() {
  const data = await getNewsPageData();

  const featuredBanner = data?.featuredBanner ?? null;
  const allNewsStories = (data?.allNewsStories ?? []).map(toArticleCardData);
  const pressReleases = (data?.pressReleases ?? []).map(toArticleCardData);

  return (
    <PageTransition>
      <div className="mt-4 mb-12 flex flex-col gap-4">
        <NewsHeader description={data?.pageDescription} />
        <NewsHeroSection featuredBanner={featuredBanner} />
        <NewsListSection stories={allNewsStories} />
        <PressReleasesSection pressReleases={pressReleases} />
      </div>
    </PageTransition>
  );
}
