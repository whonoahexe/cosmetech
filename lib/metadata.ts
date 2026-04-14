import type { Metadata } from "next";
import type { Seo } from "@/sanity/lib/types";

const toMetadataOther = (metaTags: NonNullable<Seo>["additionalMetaTags"]): NonNullable<Metadata["other"]> => {
  const other: NonNullable<Metadata["other"]> = {};

  for (const tag of metaTags || []) {
    const name = tag?.name?.trim();
    const content = tag?.content?.trim();

    if (!name || !content) {
      continue;
    }

    const existing = other[name];

    if (typeof existing === "undefined") {
      other[name] = content;
      continue;
    }

    if (Array.isArray(existing)) {
      other[name] = [...existing, content];
      continue;
    }

    other[name] = [existing, content];
  }

  return other;
};

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
  const keywords = (seo?.keywords || []).map((item) => item.trim()).filter(Boolean);
  const other = toMetadataOther(seo?.additionalMetaTags);

  return {
    title,
    description,
    ...(keywords.length > 0 && { keywords }),
    ...(Object.keys(other).length > 0 && { other }),
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
