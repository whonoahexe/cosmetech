import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { darkGradient } from "@/lib/card-gradient";
import { cn } from "@/lib/utils";

type EventHeroProps = {
  image?: SanityImageType;
  title?: string;
};

export function EventHero({ image, title }: EventHeroProps) {
  return (
    <section className="py-4">
      <div className={cn("relative h-65 w-full rounded-3xl md:h-105 lg:h-150 overflow-hidden", darkGradient(title ?? "event"))}>
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
