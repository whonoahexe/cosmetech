type EnhanceMode = "off" | "sanity" | "cloudinary";

type TransformInput = {
  src: string;
  quality?: number;
};

function getEnhanceMode(): EnhanceMode {
  const rawMode = process.env.NEXT_PUBLIC_IMAGE_ENHANCE_MODE;
  if (rawMode === "cloudinary" || rawMode === "sanity" || rawMode === "off") {
    return rawMode;
  }
  return "sanity";
}

function toSanityUrl({ src, quality }: TransformInput): string {
  const url = new URL(src);
  const q = quality ?? 78;

  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("q", String(q));
  url.searchParams.set("dpr", "auto");

  return url.toString();
}

function toCloudinaryFetchUrl({ src, quality }: TransformInput): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return toSanityUrl({ src, quality });
  }

  const transformations = [
    "f_auto",
    "q_auto",
    "dpr_auto",
    "c_limit",
    "w_1600",
    "e_auto_color",
    "e_auto_contrast",
    "e_auto_brightness",
    "e_sharpen:40",
  ].join(",");

  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${encodeURIComponent(src)}`;
}

export function getEnhancedImageSrc({ src, quality }: TransformInput): string {
  if (!src) return src;

  const mode = getEnhanceMode();
  if (mode === "off") {
    return src;
  }

  if (mode === "cloudinary") {
    return toCloudinaryFetchUrl({ src, quality });
  }

  return toSanityUrl({ src, quality });
}
