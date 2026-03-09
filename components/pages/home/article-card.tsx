import { Badge } from "@/components/ui/badge";
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
  className,
}: ArticleCardProps) {
  const isLarge = colSpan >= 4;

  return (
    <article className={cn("flex flex-col gap-4", className)}>
      {/* Thumbnail */}
      <div className="w-full aspect-square rounded-3xl overflow-hidden bg-[#D9D9D9]">
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 px-2">
        {/* Metadata row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {isSponsored && <Badge variant="default">Sponsored</Badge>}
          </div>
          <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        {isLarge ? (
          <h2 className="type-heading-1 text-foreground">{title}</h2>
        ) : (
          <h3 className="type-heading-3 text-foreground">{title}</h3>
        )}

        {/* Excerpt */}
        <p
          className={cn(
            "text-muted-foreground",
            isLarge ? "type-paragraph-large-medium" : "type-paragraph-medium"
          )}
        >
          {excerpt}
        </p>
      </div>
    </article>
  );
}
