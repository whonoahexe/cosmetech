import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

type ArticleHeroProps = {
  image?: SanityImageType;
  title?: string;
};

export function ArticleHero({ image, title }: ArticleHeroProps) {
  return (
    <section className="py-4">
      <div className="relative h-65 w-full rounded-3xl bg-[#D9D9D9] md:h-105 lg:h-150 overflow-hidden">
        <SanityImage
          image={image ?? null}
          alt={title ?? ""}
          fill
          sizes="100vw"
          priority
        />
      </div>
    </section>
  );
}
