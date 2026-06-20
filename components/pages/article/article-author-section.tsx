import { SanityImage } from "@/components/shared/sanity-image";
import { cn } from "@/lib/utils";
import type { ArticleAuthor } from "@/sanity/lib/types";

type ArticleAuthorSectionProps = {
  author?: ArticleAuthor;
};

export function ArticleAuthorSection({ author }: ArticleAuthorSectionProps) {
  if (!author?.name && !author?.authority && !author?.signature && !author?.image?.asset?.url) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-border/70 bg-muted/20 p-4 sm:p-5 md:p-4">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-28 sm:w-28">
          <SanityImage
            image={author?.image ?? null}
            alt={author?.name ?? "Author image"}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className={cn("object-cover")}
          />
        </div>

        <div className="min-w-0">
          {author?.name && <p className="type-heading-3 text-foreground">Author: {author.name}</p>}
          {author?.authority && (
            <p className="type-paragraph-medium text-muted-foreground">{author.authority}</p>
          )}
          {author?.signature && (
            <p className="type-heading-4 italic text-foreground pt-2">{author.signature}</p>
          )}
        </div>
      </div>
    </section>
  );
}
