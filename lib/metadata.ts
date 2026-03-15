import type { Metadata } from "next";
import type { Seo } from "@/sanity/lib/types";

export function buildMetadata(
  seo: Seo | undefined,
  defaults?: { title: string; description?: string }
): Metadata {
  const title = seo?.title ?? defaults?.title ?? "Cosmetech";
  const description =
    seo?.description ??
    defaults?.description ??
    "Leading B2B cosmetics magazine and resource for industry professionals in Asia.";
  const imageUrl = seo?.image?.asset?.url;

  return {
    title,
    description,
    ...(imageUrl && {
      openGraph: {
        title,
        description,
        images: [{ url: imageUrl }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    }),
  };
}
