import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface ArticleCardData {
  image?: string | null;
  category: string;
  isSponsored?: boolean;
  readTime: number;
  title: string;
  excerpt: string;
}

interface ArticleCardProps extends ArticleCardData {
  colSpan?: 2 | 4;
  variant?: "grid" | "featured" | "list" | "news-horizontal";
  showSeparator?: boolean;
  className?: string;
}

export function ArticleCard({
  image,
  category,
  isSponsored,
  readTime,
  title,
  excerpt,
  colSpan = 2,
  variant = "grid",
  showSeparator = false,
  className,
}: ArticleCardProps) {
  const isGrid = variant === "grid";
  const isFeatured = variant === "featured";
  const isList = variant === "list";
  const isNewsHorizontal = variant === "news-horizontal";
  const isLargeGrid = isGrid && colSpan >= 4;

  if (isNewsHorizontal) {
    return (
      <article className={cn("grid grid-cols-1 gap-5 lg:grid-cols-8", className)}>
        <div className="h-111 overflow-hidden rounded-3xl bg-[#D9D9D9] lg:col-span-4">
          {image && <img src={image} alt={title} className="h-full w-full object-cover" />}
        </div>

        <div className="flex flex-col gap-4 px-2 lg:col-span-4">
          <h3 className="type-heading-3 text-foreground">{title}</h3>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {isSponsored && <Badge variant="default">Sponsored</Badge>}
            <span className="type-paragraph text-foreground">&bull;</span>
            <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
              {readTime} min read
            </span>
          </div>

          <p className="type-paragraph-medium text-muted-foreground whitespace-pre-line">
            {excerpt}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-col",
        isGrid && "gap-4",
        isFeatured && "gap-6",
        isList && "gap-4 px-2",
        className
      )}
    >
      {!isList && (
        <div
          className={cn(
            "w-full overflow-hidden rounded-3xl bg-[#D9D9D9]",
            isFeatured ? "aspect-1123/600" : "aspect-square"
          )}
        >
          {image && <img src={image} alt={title} className="h-full w-full object-cover" />}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col",
          isGrid && "gap-4 px-2",
          isFeatured && "items-center gap-3 text-center",
          isList && "gap-4"
        )}
      >
        {isFeatured ? (
          <>
            <h2 className="type-heading-2 text-foreground">{title}</h2>
            <p className="type-paragraph-medium max-w-130 text-muted-foreground">{excerpt}</p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="default">{category}</Badge>
              {isSponsored && <Badge variant="secondary">Sponsored</Badge>}
              <span className="type-paragraph text-foreground">&bull;</span>
              <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
                {readTime} min read
              </span>
            </div>
          </>
        ) : (
          <>
            {isGrid && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{category}</Badge>
                  {isSponsored && <Badge variant="default">Sponsored</Badge>}
                </div>
                <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
                  {readTime} min read
                </span>
              </div>
            )}

            {isLargeGrid ? (
              <h2 className="type-heading-1 text-foreground">{title}</h2>
            ) : (
              <h3 className="type-heading-3 text-foreground">{title}</h3>
            )}

            <p
              className={cn(
                "text-muted-foreground",
                isList
                  ? "type-paragraph-medium"
                  : isLargeGrid
                    ? "type-paragraph-large-medium"
                    : "type-paragraph-medium"
              )}
            >
              {excerpt}
            </p>

            {isList && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{category}</Badge>
                  {isSponsored && <Badge variant="default">Sponsored</Badge>}
                </div>
                <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
                  {readTime} min read
                </span>
              </div>
            )}
          </>
        )}

        {isList && showSeparator && <Separator className="mt-2" />}
      </div>
    </article>
  );
}
