import Image from "next/image";
import { SanityImage } from "./sanity-image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  image?: SanityImageType;
  generatedImageUrl?: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

type ArticleImageMode = "ai" | "cloudinary" | "off";

function getArticleImageMode(): ArticleImageMode {
  const raw = process.env.NEXT_PUBLIC_ARTICLE_IMAGE_MODE;
  if (raw === "cloudinary" || raw === "off") return raw;
  return "ai";
}

export function ArticleCoverImage({
  image,
  generatedImageUrl,
  alt,
  fill,
  sizes,
  priority,
  className,
}: Props) {
  const mode = getArticleImageMode();

  if (mode === "off") return null;

  if (mode === "cloudinary" || !generatedImageUrl) {
    return (
      <SanityImage
        image={image ?? null}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={generatedImageUrl}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized
      className={cn("object-cover", className)}
    />
  );
}
