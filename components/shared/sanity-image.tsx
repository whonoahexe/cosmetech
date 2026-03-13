import Image from "next/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

type SanityImageProps = {
  image: SanityImageType;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function SanityImage({
  image,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: SanityImageProps) {
  const url = image?.asset?.url;
  if (!url) return null;

  const dimensions = image?.asset?.metadata?.dimensions;
  const lqip = image?.asset?.metadata?.lqip;

  const imgWidth = width ?? dimensions?.width;
  const imgHeight = height ?? dimensions?.height;

  return (
    <Image
      src={url}
      alt={alt}
      fill={fill}
      width={fill ? undefined : imgWidth}
      height={fill ? undefined : imgHeight}
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? "blur" : undefined}
      blurDataURL={lqip || undefined}
      className={cn("object-cover", className)}
    />
  );
}
