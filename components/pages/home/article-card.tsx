import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ArticleCardData {
  slug?: string;
  image?: SanityImageType;
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
        className="relative block h-111 overflow-hidden rounded-3xl bg-[#D9D9D9] lg:col-span-4 transition-opacity hover:opacity-90"
      >
        <SanityImage image={image ?? null} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" />
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
        <SanityImage image={image ?? null} alt={title} fill sizes="100vw" />
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
        className="relative block w-full overflow-hidden rounded-3xl bg-[#D9D9D9] transition-opacity hover:opacity-90 aspect-square"
      >
        <SanityImage image={image ?? null} alt={title} fill sizes={isLargeGrid ? "50vw" : "25vw"} />
      </Link>

      <div className="flex flex-col gap-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {isSponsored && <Badge variant="default">Sponsored</Badge>}
          </div>
          <ReadTimeBadge readTime={readTime} />
        </div>

        {isLargeGrid ? (
          <Link href={slug ? `/article/${slug}` : "#"} className="w-fit hover:underline">
            <h2 className="type-heading-1 text-foreground">{title}</h2>
          </Link>
        ) : (
          <Link href={slug ? `/article/${slug}` : "#"} className="w-fit hover:underline">
            <h3 className="type-heading-3 text-foreground">{title}</h3>
          </Link>
        )}

        {excerpt && (
          <p
            className={cn(
              "text-muted-foreground",
              isLargeGrid ? "type-paragraph-large-medium" : "type-paragraph-medium"
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
  category,
  isSponsored,
  readTime,
  title,
  excerpt,
  showSeparator = false,
  className,
}: ArticleCardProps) {
  return (
    <article className={cn("flex flex-col gap-4 px-2", className)}>
      <div className="flex flex-col gap-4">
        <Link href={slug ? `/article/${slug}` : "#"} className="w-fit hover:underline">
          <h3 className="type-heading-3 text-foreground">{title}</h3>
        </Link>
        {excerpt && (
          <p className="type-paragraph-medium text-muted-foreground">{excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {isSponsored && <Badge variant="default">Sponsored</Badge>}
          </div>
          <ReadTimeBadge readTime={readTime} />
        </div>
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
