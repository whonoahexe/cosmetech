import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArticleCoverImage } from "@/components/shared/article-cover-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ArticleCardData {
  slug?: string;
  image?: SanityImageType;
  generatedImageUrl?: string;
  category: string;
  isSponsored?: boolean;
  readTime?: number;
  title: string;
  excerpt?: string;
}

interface ArticleCardProps extends ArticleCardData {
  colSpan?: 2 | 4;
  variant?: "grid" | "featured" | "list" | "news-horizontal";
  showSeparator?: boolean;
  showThumbnail?: boolean;
  className?: string;
}

function ReadTimeBadge({ readTime }: { readTime?: number }) {
  if (!readTime) return null;
  return (
    <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
      {readTime} min read
    </span>
  );
}

function ArticleCardNewsHorizontal({
  slug,
  image,
  generatedImageUrl,
  category,
  isSponsored,
  readTime,
  title,
  excerpt,
  className,
}: ArticleCardProps) {
  return (
    <article className={cn("grid grid-cols-1 gap-5 lg:grid-cols-8", className)}>
      <Link
        href={slug ? `/article/${slug}` : "#"}
        className="relative block aspect-[4/3] xl:h-111 xl:aspect-auto overflow-hidden rounded-3xl bg-[#D9D9D9] lg:col-span-4 transition-opacity hover:opacity-90"
      >
        <ArticleCoverImage
          image={image}
          generatedImageUrl={generatedImageUrl}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </Link>

      <div className="flex flex-col gap-4 px-2 lg:col-span-4">
        <Link href={slug ? `/article/${slug}` : "#"} className="w-fit hover:underline">
          <h3 className="type-heading-3 text-foreground">{title}</h3>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{category}</Badge>
          {isSponsored && <Badge variant="default">Sponsored</Badge>}
          {readTime && <span className="type-paragraph text-foreground">&bull;</span>}
          <ReadTimeBadge readTime={readTime} />
        </div>

        {excerpt && (
          <p className="type-paragraph-medium text-muted-foreground whitespace-pre-line">
            {excerpt}
          </p>
        )}
      </div>
    </article>
  );
}

function ArticleCardFeatured({
  slug,
  image,
  generatedImageUrl,
  category,
  isSponsored,
  readTime,
  title,
  excerpt,
  className,
}: ArticleCardProps) {
  return (
    <article className={cn("flex flex-col gap-6", className)}>
      <Link
        href={slug ? `/article/${slug}` : "#"}
        className="relative block w-full overflow-hidden rounded-3xl bg-[#D9D9D9] transition-opacity hover:opacity-90 aspect-1123/600"
      >
        <ArticleCoverImage image={image} generatedImageUrl={generatedImageUrl} alt={title} fill sizes="100vw" />
      </Link>

      <div className="flex flex-col items-center gap-3 text-center">
        <Link href={slug ? `/article/${slug}` : "#"} className="hover:underline">
          <h2 className="type-heading-2 text-foreground">{title}</h2>
        </Link>
        {excerpt && (
          <p className="type-paragraph-medium max-w-130 text-muted-foreground">{excerpt}</p>
        )}
        <div className="flex items-center justify-center gap-2">
          <Badge variant="default">{category}</Badge>
          {isSponsored && <Badge variant="secondary">Sponsored</Badge>}
          {readTime && <span className="type-paragraph text-foreground">&bull;</span>}
          <ReadTimeBadge readTime={readTime} />
        </div>
      </div>
    </article>
  );
}

function ArticleCardGrid({
  slug,
  image,
  generatedImageUrl,
  category,
  isSponsored,
  readTime,
  title,
  excerpt,
  colSpan = 2,
  className,
}: ArticleCardProps) {
  const isLargeGrid = colSpan >= 4;

  return (
    <article className={cn("flex flex-col gap-4", className)}>
      <Link
        href={slug ? `/article/${slug}` : "#"}
        className="relative block w-full overflow-hidden rounded-3xl bg-[#D9D9D9] transition-opacity hover:opacity-90 aspect-[4/3] xl:aspect-square"
      >
        <ArticleCoverImage image={image} generatedImageUrl={generatedImageUrl} alt={title} fill sizes={isLargeGrid ? "50vw" : "25vw"} />
      </Link>

      <div className="flex flex-col gap-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {isSponsored && <Badge variant="default">Sponsored</Badge>}
          </div>
          <ReadTimeBadge readTime={readTime} />
        </div>

        <Link href={slug ? `/article/${slug}` : "#"} className="w-fit hover:underline">
          <h3
            className={cn(
              "text-foreground type-heading-3",
              isLargeGrid && "xl:type-heading-1"
            )}
          >
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p
            className={cn(
              "text-muted-foreground type-paragraph-medium line-clamp-2",
              isLargeGrid
                ? "xl:type-paragraph-large-medium xl:line-clamp-3"
                : "xl:line-clamp-none"
            )}
          >
            {excerpt}
          </p>
        )}
      </div>
    </article>
  );
}

function ArticleCardList({
  slug,
  image,
  generatedImageUrl,
  category,
  isSponsored,
  readTime,
  title,
  excerpt,
  showSeparator = false,
  showThumbnail = false,
  className,
}: ArticleCardProps) {
  const href = slug ? `/article/${slug}` : "#";

  return (
    <article className={cn("flex flex-col gap-4 px-2", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {showThumbnail && (
            <Link
              href={href}
              className="relative hidden h-32 w-48 shrink-0 overflow-hidden rounded-2xl bg-[#D9D9D9] sm:block md:h-36 md:w-56"
            >
              <ArticleCoverImage
                image={image}
                generatedImageUrl={generatedImageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 192px, 224px"
              />
            </Link>
          )}

          <div className="flex min-w-0 flex-col gap-4">
            {showThumbnail && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{category}</Badge>
                {isSponsored && <Badge variant="default">Sponsored</Badge>}
                {readTime && <span className="type-paragraph text-foreground">&bull;</span>}
                <ReadTimeBadge readTime={readTime} />
              </div>
            )}

            <Link href={href} className="w-fit hover:underline">
              <h3 className="type-heading-3 text-foreground">{title}</h3>
            </Link>
            {excerpt && <p className="type-paragraph-medium text-muted-foreground">{excerpt}</p>}
          </div>
        </div>
        {!showThumbnail && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{category}</Badge>
              {isSponsored && <Badge variant="default">Sponsored</Badge>}
            </div>
            <ReadTimeBadge readTime={readTime} />
          </div>
        )}
        {showSeparator && <Separator className="mt-2" />}
      </div>
    </article>
  );
}

export function ArticleCard(props: ArticleCardProps) {
  const { variant = "grid" } = props;

  switch (variant) {
    case "news-horizontal":
      return <ArticleCardNewsHorizontal {...props} />;
    case "featured":
      return <ArticleCardFeatured {...props} />;
    case "list":
      return <ArticleCardList {...props} />;
    case "grid":
    default:
      return <ArticleCardGrid {...props} />;
  }
}
