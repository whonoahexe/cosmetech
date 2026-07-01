import Link from "next/link";
import { SanityImage } from "@/components/shared/sanity-image";
import type { ArticleCardData } from "./article-card";

interface AdStripProps {
  items: ArticleCardData[];
}

export function AdStrip({ items }: AdStripProps) {
  const ads = items.filter((item) => item.image);
  if (ads.length === 0) return null;

  return (
    <section className="flex flex-col gap-3 py-5">
      {ads.map((item) => (
        <Link
          key={item.href ?? item.title}
          href={item.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="relative block h-28 w-full overflow-hidden rounded-2xl border bg-card shadow-sm sm:h-32 lg:h-36"
        >
          <SanityImage
            image={item.image!}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </Link>
      ))}
    </section>
  );
}
