import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface CategoryCardData {
  name: string;
  description: string;
  image?: SanityImageType;
  slug?: string;
}

interface CategoryCardProps extends CategoryCardData {
  className?: string;
}

export function CategoryCard({ name, description, image, slug, className }: CategoryCardProps) {
  const CardContent = (
    <div className={cn("relative w-full h-full rounded-3xl overflow-hidden bg-muted", className)}>
      <SanityImage image={image ?? null} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-7">
        <h3 className="type-heading-2 text-foreground">{name}</h3>
        <p className="type-paragraph-medium text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link href={`/categories?category=${slug}`} className="block h-full w-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
