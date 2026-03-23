import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArticleCoverImage } from "@/components/shared/article-cover-image";
import type { ArticleCardData } from "./article-card";

interface AdStripProps {
  items: ArticleCardData[];
}

export function AdStrip({ items }: AdStripProps) {
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-3 py-5">
      <div className="flex items-center gap-3">
        <span className="type-paragraph-mini text-muted-foreground uppercase tracking-widest">
          Partner Content
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {items.map((item) => {
          const href = item.href ?? (item.slug ? `/article/${item.slug}` : "#");
          return (
            <Link
              key={item.slug ?? item.title}
              href={href}
              className="flex w-96 shrink-0 items-stretch gap-4 rounded-2xl border bg-card p-3.5 shadow-sm lg:flex-1"
            >
              <div className="relative size-36 shrink-0 overflow-hidden rounded-2xl bg-[#d9d9d9]">
                <ArticleCoverImage
                  image={item.image}
                  generatedImageUrl={item.generatedImageUrl}
                  alt={item.title}
                  fill
                  sizes="144px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-0.5">
                <p className="type-paragraph-medium min-w-0 text-foreground line-clamp-3">
                  {item.title}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 whitespace-nowrap">
                    {item.category}
                  </Badge>
                  {item.isSponsored && (
                    <Badge variant="default" className="text-[10px] px-1.5 py-0 whitespace-nowrap">
                      Sponsored
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
