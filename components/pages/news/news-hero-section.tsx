import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArticleCoverImage } from "@/components/shared/article-cover-image";
import type { ContentCard } from "@/sanity/lib/types";
import { buildGeneratedImageUrl } from "@/lib/ai/images";

type NewsHeroSectionProps = {
  featuredBanner: ContentCard | null;
};

function getHref(card: ContentCard): string {
  if (card._type === "article" && card.slug) return `/article/${card.slug}`;
  if (card._type === "event" && card.slug) return `/events/${card.slug}`;
  if (card._type === "advertisement" && card.destinationUrl) return card.destinationUrl;
  return "#";
}

function getCategory(card: ContentCard): string {
  if (card._type === "article") return card.categories?.[0]?.title ?? "News";
  if (card._type === "event") return card.eventTags?.[0] ?? "Event";
  return card.advertiser ?? "Sponsored";
}

function getReadTime(card: ContentCard): number | undefined {
  if (card._type === "article") return card.readTime;
  return undefined;
}

export function NewsHeroSection({ featuredBanner }: NewsHeroSectionProps) {
  if (!featuredBanner) return null;

  const href = getHref(featuredBanner);
  const category = getCategory(featuredBanner);
  const readTime = getReadTime(featuredBanner);
  const generatedImageUrl =
    featuredBanner._type === "article" && featuredBanner.imageMode !== "custom"
      ? buildGeneratedImageUrl(featuredBanner.title, category, featuredBanner.excerpt)
      : undefined;

  return (
    <section className="py-4">
      <div className="group relative h-[260px] sm:h-[380px] md:h-[460px] xl:h-150 w-full overflow-hidden rounded-3xl bg-[#D9D9D9]">
        <Link href={href} className="absolute inset-0 z-0" aria-label={`Read ${featuredBanner.title}`}>
          <ArticleCoverImage
            image={featuredBanner.image}
            generatedImageUrl={generatedImageUrl}
            alt={featuredBanner.title}
            fill
            sizes="100vw"
            priority
          />
        </Link>
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/60 to-transparent" />

        <div className="pointer-events-none absolute left-5 top-5 z-10 flex max-w-[85%] flex-col gap-3 sm:left-8 sm:top-8 md:left-18 md:top-18 md:max-w-130 md:gap-4">
          <Link href={href} className="pointer-events-auto hover:underline">
            <h2 className="type-heading-1 text-foreground">{featuredBanner.title}</h2>
          </Link>

          <div className="pointer-events-auto flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {"isSponsored" in featuredBanner && featuredBanner.isSponsored && <Badge variant="default">Sponsored</Badge>}
            {readTime && (
              <>
                <span className="type-paragraph text-foreground">&bull;</span>
                <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
                  {readTime} min read
                </span>
              </>
            )}
          </div>

          {featuredBanner.excerpt && (
            <p className="hidden type-paragraph-medium text-foreground sm:block md:text-muted-foreground">
              {featuredBanner.excerpt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
