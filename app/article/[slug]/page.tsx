import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  ArticleBreadcrumb,
  ArticleContent,
  ArticleHeader,
  ArticleHero,
  ArticlePromo,
} from "@/components/pages/article";
import { getArticlePageData, getLatestArticles } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { toArticleCardData } from "@/lib/mappers";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticlePageData(slug);
  if (!data) return {};
  return buildMetadata(data.seo, { title: data.title });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await getArticlePageData(slug);
  if (!data) notFound();

  const category = toArticleCardData(data).category;

  // Use CMS-configured related articles if available, else fall back to latest
  const cmsRelated = (data.relatedArticles ?? []).slice(0, 2).map(toArticleCardData);
  const promoArticles = cmsRelated.length > 0
    ? cmsRelated
    : (await getLatestArticles(slug)).map(toArticleCardData);

  return (
    <div className="flex flex-col mt-4 gap-4 mb-32">
      <ArticleHero image={data.image} title={data.title} />
      <ArticleHeader
        title={data.title}
        excerpt={data.excerpt ?? ""}
        category={category}
        readTime={data.readTime ?? 0}
      />

      <section className="relative py-16 lg:px-32 xl:px-64">
        <div className="mx-auto w-full max-w-6xl">
          <ArticleBreadcrumb category={category} />

          <div className="lg:pr-20 pt-16">
            <ArticleContent body={data.body} />

            <Separator className="my-16" />

            <ArticlePromo articles={promoArticles} />
          </div>
        </div>
      </section>
    </div>
  );
}
