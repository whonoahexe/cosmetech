/**
 * Import SEO meta tags + WordPress tags from the old WordPress site (Yoast) into Sanity.
 *
 * Usage:
 *   npx tsx scripts/import-seo-meta.ts [--force] [--dry-run]
 *
 * Flags:
 *   --force    Overwrite SEO data even if it already exists on the article
 *   --dry-run  Log what would be updated without writing anything to Sanity
 *
 * Required env vars (loaded from .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (defaults to "production")
 *   NEXT_PUBLIC_SANITY_API_VERSION  (defaults to "2025-03-04")
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from "next-sanity";
import { config } from "dotenv";
config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-03-04";
const writeToken = process.env.SANITY_API_WRITE_TOKEN!;

const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

if (!projectId || !writeToken) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false });

const WP_BASE = "https://cosmetech.co.in/wp-json/wp/v2";

// ─── Types ────────────────────────────────────────────────────────────────────

type WpPost = { slug: string; yoast_head: string; tags: number[] };

type WpTag = { id: number; name: string };

type MetaTag = { name: string; content: string };

type ParsedSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
  additionalMetaTags?: MetaTag[];
};

type SanityArticle = {
  _id: string;
  slug: string;
  seo?: { title?: string; description?: string; keywords?: string[] } | null;
};

// ─── WordPress tag fetching ───────────────────────────────────────────────────

async function fetchAllWpTags(): Promise<Map<number, string>> {
  const tagMap = new Map<number, string>();
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_BASE}/tags?per_page=100&page=${page}&_fields=id,name`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 400) break;
      throw new Error(`WP tags API error: ${res.status} on page ${page}`);
    }

    if (page === 1) {
      totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
      const total = res.headers.get("X-WP-Total") ?? "?";
      console.log(`WP Tags API: ${total} tags across ${totalPages} pages.`);
    }

    const data = (await res.json()) as WpTag[];
    for (const tag of data) {
      tagMap.set(tag.id, decodeHtmlEntities(tag.name));
    }
    console.log(`  Fetched tags page ${page}/${totalPages} (${data.length} tags)`);
    page++;
  }

  return tagMap;
}

// ─── WordPress post fetching ──────────────────────────────────────────────────

async function fetchAllWpPosts(): Promise<WpPost[]> {
  const posts: WpPost[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_BASE}/posts?per_page=100&page=${page}&_fields=slug,yoast_head,tags`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 400) break;
      throw new Error(`WP API error: ${res.status} on page ${page}`);
    }

    if (page === 1) {
      totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
      const total = res.headers.get("X-WP-Total") ?? "?";
      console.log(`WP Posts API: ${total} posts across ${totalPages} pages.`);
    }

    const data = (await res.json()) as WpPost[];
    posts.push(...data);
    console.log(`  Fetched posts page ${page}/${totalPages} (${data.length} posts)`);
    page++;
  }

  return posts;
}

// ─── Yoast HTML parsing ───────────────────────────────────────────────────────

function parseYoastHead(html: string): ParsedSeo {
  const seo: ParsedSeo = {};

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  if (titleMatch) seo.title = decodeHtmlEntities(titleMatch[1].trim());

  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  if (descMatch) seo.description = decodeHtmlEntities(descMatch[1].trim());

  const kwMatch = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/);
  if (kwMatch) {
    const kws = kwMatch[1]
      .split(",")
      .map((k) => decodeHtmlEntities(k.trim()))
      .filter(Boolean);
    if (kws.length > 0) seo.keywords = kws;
  }

  // Capture additional named meta tags (e.g. robots, author, news_keywords)
  // Exclude ones already handled above and noisy OG/Twitter properties
  const SKIP_NAMES = new Set(["description", "keywords"]);
  const additionalTags: MetaTag[] = [];
  const metaNameRe = /<meta\s+name="([^"]+)"\s+content="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = metaNameRe.exec(html)) !== null) {
    const name = m[1].trim();
    const content = decodeHtmlEntities(m[2].trim());
    if (!SKIP_NAMES.has(name) && content) {
      additionalTags.push({ name, content });
    }
  }
  if (additionalTags.length > 0) seo.additionalMetaTags = additionalTags;

  return seo;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

// ─── Sanity fetching ──────────────────────────────────────────────────────────

async function fetchAllSanityArticles(): Promise<Map<string, SanityArticle>> {
  const articles = await client.fetch<SanityArticle[]>(
    `*[_type == "article" && !(_id in path("drafts.**"))]{
      _id,
      "slug": slug.current,
      seo{ title, description, keywords }
    } | order(_createdAt asc)`
  );

  const map = new Map<string, SanityArticle>();
  for (const article of articles) {
    map.set(article.slug, article);
  }
  console.log(`Sanity: found ${articles.length} published articles.`);
  return map;
}

// ─── Slug normalisation ───────────────────────────────────────────────────────

function normaliseSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).toLowerCase().trim();
  } catch {
    return slug.toLowerCase().trim();
  }
}

function hasSeoData(seo?: SanityArticle["seo"]): boolean {
  if (!seo) return false;
  return !!(seo.title || seo.description || (seo.keywords && seo.keywords.length > 0));
}

/** Merge two keyword arrays, deduplicating case-insensitively. */
function mergeKeywords(a: string[], b: string[]): string[] {
  const seen = new Set(a.map((k) => k.toLowerCase()));
  const merged = [...a];
  for (const kw of b) {
    if (!seen.has(kw.toLowerCase())) {
      seen.add(kw.toLowerCase());
      merged.push(kw);
    }
  }
  return merged;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nSEO meta import (with WP tags) — force=${force}, dry-run=${dryRun}\n`);

  // Fetch WP tags, WP posts, and Sanity articles in parallel
  const [tagMap, wpPosts, sanityMap] = await Promise.all([
    fetchAllWpTags(),
    fetchAllWpPosts(),
    fetchAllSanityArticles(),
  ]);

  console.log(`\nWP tag dictionary: ${tagMap.size} tags loaded.`);
  console.log(`\nMatching and patching...\n`);

  let matched = 0;
  let updated = 0;
  let skipped = 0;
  let noMatch = 0;

  for (const post of wpPosts) {
    const normSlug = normaliseSlug(post.slug);
    const article = sanityMap.get(normSlug);

    if (!article) {
      console.log(`  [no-match] ${post.slug}`);
      noMatch++;
      continue;
    }

    matched++;

    if (!force && hasSeoData(article.seo)) {
      skipped++;
      continue;
    }

    const seo = parseYoastHead(post.yoast_head);

    // Resolve WP tag IDs → names and merge with Yoast keywords
    const tagNames = (post.tags ?? [])
      .map((id) => tagMap.get(id))
      .filter((name): name is string => Boolean(name));

    const allKeywords = mergeKeywords(seo.keywords ?? [], tagNames);
    if (allKeywords.length > 0) seo.keywords = allKeywords;

    if (!seo.title && !seo.description && !seo.keywords?.length && !seo.additionalMetaTags?.length) {
      console.log(`  [skip-empty] ${post.slug} — no usable SEO data`);
      skipped++;
      continue;
    }

    const patch: Record<string, unknown> = {};
    if (seo.title) patch["seo.title"] = seo.title;
    if (seo.description) patch["seo.description"] = seo.description;
    if (seo.keywords && seo.keywords.length > 0) patch["seo.keywords"] = seo.keywords;
    if (seo.additionalMetaTags && seo.additionalMetaTags.length > 0) {
      patch["seo.additionalMetaTags"] = seo.additionalMetaTags.map((tag) => ({
        _type: "metaTag",
        _key: `${tag.name}-${Math.random().toString(36).slice(2, 7)}`,
        name: tag.name,
        content: tag.content,
      }));
    }

    if (dryRun) {
      console.log(
        `  [dry-run] ${post.slug}` +
          (seo.title ? ` | title: "${seo.title.slice(0, 50)}..."` : "") +
          (seo.keywords?.length ? ` | tags: [${seo.keywords.slice(0, 3).join(", ")}${seo.keywords.length > 3 ? ", ..." : ""}]` : "")
      );
    } else {
      await client.patch(article._id).set(patch).commit();
      console.log(`  [updated] ${post.slug} (${seo.keywords?.length ?? 0} keywords)`);
    }

    updated++;
  }

  console.log(`
Done.
  WP posts fetched : ${wpPosts.length}
  WP tags loaded   : ${tagMap.size}
  Matched in Sanity: ${matched}
  Updated          : ${updated}
  Skipped (had SEO): ${skipped}
  No match         : ${noMatch}
  Dry-run          : ${dryRun}
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
