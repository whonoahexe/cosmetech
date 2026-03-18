import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArticleCoverImage } from "@/components/shared/article-cover-image";
import type { ArticleCardData } from "./article-card";
import { buildGeneratedImageUrl } from "@/lib/ai/images";

interface AdStripProps {
  items: ArticleCardData[];
}

export function AdStrip({ items }: AdStripProps) {
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-3 py-4">
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
              className="group flex w-64 shrink-0 items-center gap-3 rounded-2xl border bg-card p-3 transition-colors hover:bg-muted/50 lg:flex-1"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#d9d9d9]">
                <ArticleCoverImage
                  image={item.image}
                  generatedImageUrl={item.generatedImageUrl}
                  alt={item.title}
                  fill
                  sizes="80px"
                />
              </div>
              <p className="type-paragraph-medium min-w-0 flex-1 text-foreground line-clamp-3 group-hover:underline">
                {item.title}
              </p>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 whitespace-nowrap">
                  {item.category}
                </Badge>
                {item.isSponsored && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0 whitespace-nowrap">
                    Sponsored
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
