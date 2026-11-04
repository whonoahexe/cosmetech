import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { darkGradient } from "@/lib/card-gradient";
import { cn } from "@/lib/utils";

export interface CategoryCardData {
  name: string;
  description: string;
  image?: SanityImageType;
  slug?: string;
}

interface CategoryCardProps extends CategoryCardData {
  className?: string;
}

/**
 * Built-in photos (Unsplash License, see public/images/categories/CREDITS.md)
 * used when a category has no card image uploaded in Sanity.
 */
const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  "ingredients-formulation": "/images/categories/ingredients-formulation.webp",
  fragrance: "/images/categories/fragrance.webp",
  packaging: "/images/categories/packaging.webp",
  "r-and-d": "/images/categories/r-and-d.webp",
  regulations: "/images/categories/regulations.webp",
  springboard: "/images/categories/springboard.webp",
  marketing: "/images/categories/marketing.webp",
  "ai-technology": "/images/categories/ai-technology.webp",
};

const IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 40vw";

export function CategoryCard({ name, description, image, slug, className }: CategoryCardProps) {
  const hasSanityImage = Boolean(image?.asset?.url);
  const defaultImage = slug ? DEFAULT_CATEGORY_IMAGES[slug] : undefined;

  const CardContent = (
    <div
      className={cn(
        "group relative isolate w-full h-full rounded-3xl overflow-hidden",
        hasSanityImage || defaultImage ? "bg-muted" : darkGradient(name),
        className
      )}
    >
      {/* Image layer — slow zoom on hover */}
      <div className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        {hasSanityImage ? (
          <SanityImage image={image ?? null} alt="" fill sizes={IMAGE_SIZES} />
        ) : defaultImage ? (
          <Image src={defaultImage} alt="" fill sizes={IMAGE_SIZES} className="object-cover" />
        ) : null}
      </div>

      {/* Scrim so the text stays readable on any photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 via-45% to-black/10 transition-colors duration-500 group-hover:to-black/25"
      />

      {/* Arrow affordance */}
      {slug && (
        <span
          aria-hidden
          className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-foreground"
        >
          <ArrowUpRight className="size-5" />
        </span>
      )}

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-7">
        <h3 className="type-heading-2 text-white">{name}</h3>
        <p className="type-paragraph-medium max-w-md text-white/80 line-clamp-3">{description}</p>
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link
        href={`/categories?category=${slug}`}
        className="block h-full w-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
