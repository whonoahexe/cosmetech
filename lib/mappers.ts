import type { ArticleCardData } from "@/components/pages/home/article-card";
import type { EventCardData } from "@/components/pages/home/event-card";
import type { CategoryCardData } from "@/components/pages/home/category-card";
import type {
  ArticleCard,
  EventCard,
  ContentCard,
  CategorySummary,
} from "@/sanity/lib/types";
import { CATEGORY_REF_TO_NAME } from "@/lib/constants";

function formatDate(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Resolve category name from an article card.
 * First tries resolved category docs; falls back to parsing the raw ref ID
 * (e.g. "category.fragrance" → "Fragrance") for when category docs are unpublished drafts.
 */
function resolveCategory(card: ArticleCard): string {
  // Try resolved category documents first
  const resolved = (card.categories ?? []).find((c) => c && c.title);
  if (resolved) return resolved.title;

  // Fall back to raw ref IDs (e.g. "category.fragrance")
  for (const ref of card.categoryRefs ?? []) {
    const slug = ref.replace(/^category\./, "");
    const name = CATEGORY_REF_TO_NAME[slug];
    if (name) return name;
  }

  return "General";
}

export function toArticleCardData(card: ArticleCard): ArticleCardData {
  return {
    slug: card.slug,
    image: card.image,
    category: resolveCategory(card),
    isSponsored: card.isSponsored,
    readTime: card.readTime,
    title: card.title,
    excerpt: card.excerpt,
  };
}

export function toEventCardData(card: EventCard): EventCardData {
  return {
    title: card.title,
    location: card.location ?? "",
    date: formatDate(card.startDate),
    category: card.eventTags?.[0],
    excerpt: card.excerpt,
    image: card.image,
    isVirtual: card.location?.toLowerCase() === "virtual",
    isSponsored: card.isSponsored,
    href: card.slug ? `/events/${card.slug}` : undefined,
  };
}

export function toCategoryCardData(cat: CategorySummary): CategoryCardData {
  return {
    name: cat.title,
    description: cat.description ?? "",
    slug: cat.slug,
  };
}

export function toContentCardData(card: ContentCard): ArticleCardData {
  if (card._type === "article") {
    return toArticleCardData(card);
  }

  if (card._type === "event") {
    return {
      slug: card.slug,
      image: card.image,
      category: card.eventTags?.[0] ?? "Event",
      isSponsored: card.isSponsored,
      title: card.title,
      excerpt: card.excerpt,
    };
  }

  // advertisement
  return {
    slug: undefined,
    image: card.image,
    category: card.advertiser ?? "Sponsored",
    isSponsored: true,
    title: card.title,
    excerpt: card.excerpt,
  };
}
