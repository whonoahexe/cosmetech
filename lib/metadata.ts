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
  defaults?: {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
  }
): Metadata {
  const title = seo?.title ?? defaults?.title ?? "Cosmetech";
  const description =
    seo?.description ??
    defaults?.description ??
    "Leading B2B cosmetics magazine and resource for industry professionals in Asia.";
  const imageUrl = seo?.image?.asset?.url ?? defaults?.image;
  const keywords = (seo?.keywords || []).map((item) => item.trim()).filter(Boolean);
  const other = toMetadataOther(seo?.additionalMetaTags);

  return {
    title,
    description,
    ...(defaults?.url && { alternates: { canonical: defaults.url } }),
    ...(keywords.length > 0 && { keywords }),
    ...(Object.keys(other).length > 0 && { other }),
    openGraph: {
      title,
      description,
      type: defaults?.type ?? "website",
      siteName: "Cosmetech",
      ...(defaults?.url && { url: defaults.url }),
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}
