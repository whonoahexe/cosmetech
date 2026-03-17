import { PageTransition } from "@/components/page-transition";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  ArticleBreadcrumb,
  ArticleContent,
  ArticleHeader,
  ArticleHero,
  ArticlePromo,
  ArticleViewTracker,
} from "@/components/pages/article";
import { getArticlePageData, getLatestArticles } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { toArticleCardData } from "@/lib/mappers";
import { buildGeneratedImageUrl } from "@/lib/ai/images";
import { CATEGORY_REF_TO_NAME } from "@/lib/constants";
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

  const { category, generatedImageUrl } = toArticleCardData(data);
  const categorySlug =
    data.categories?.find((item) => item?.slug)?.slug ??
    data.categoryRefs?.find((ref) => ref.startsWith("category."))?.replace(/^category\./, "");
  const breadcrumbCategory =
    data.categories?.find((item) => item?.title)?.title ??
    (categorySlug ? CATEGORY_REF_TO_NAME[categorySlug] : undefined) ??
    category;
  const breadcrumbLeaf = (() => {
    const seed = data._id ?? data.slug ?? "article";
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
    return String(Math.abs(h) % 100000).padStart(5, "0");
  })();

  // Use CMS-configured related articles if available, else fall back to latest
  const cmsRelated = (data.relatedArticles ?? []).slice(0, 2).map(toArticleCardData);
  const promoArticles =
    cmsRelated.length > 0 ? cmsRelated : (await getLatestArticles(slug)).map(toArticleCardData);

  return (
    <PageTransition>
    <div className="flex flex-col mt-4 gap-4 mb-16 md:mb-24 lg:mb-32">
      <ArticleViewTracker slug={slug} />
      <ArticleHero image={data.image} generatedImageUrl={generatedImageUrl} title={data.title} />
      <ArticleHeader
        title={data.title}
        excerpt={data.excerpt ?? ""}
        category={category}
        readTime={data.readTime ?? 0}
        isSponsored={data.isSponsored}
      />

      <section className="relative py-8 px-4 sm:px-6 md:py-12 lg:py-16 lg:px-32 xl:px-64">
        <div className="mx-auto w-full max-w-6xl">
          <ArticleBreadcrumb
            category={breadcrumbCategory}
            categorySlug={categorySlug}
            articleLabel={breadcrumbLeaf}
          />

          <div className="pt-8 md:pt-12 lg:pr-20 lg:pt-16">
            <ArticleContent body={data.body} />

            <Separator className="my-16" />

            <ArticlePromo articles={promoArticles} />
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
