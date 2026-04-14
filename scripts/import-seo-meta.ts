/**
 * Import SEO meta tags from the old WordPress site (Yoast) into Sanity.
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

const WP_API = "https://cosmetech.co.in/wp-json/wp/v2/posts";

// ─── Types ────────────────────────────────────────────────────────────────────

type WpPost = { slug: string; yoast_head: string };

type ParsedSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
};

type SanityArticle = {
  _id: string;
  slug: string;
  seo?: { title?: string; description?: string; keywords?: string[] } | null;
};

// ─── WordPress fetching ───────────────────────────────────────────────────────

async function fetchAllWpPosts(): Promise<WpPost[]> {
  const posts: WpPost[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_API}?per_page=100&page=${page}&_fields=slug,yoast_head`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 400) break; // WP returns 400 when page exceeds total
      throw new Error(`WP API error: ${res.status} on page ${page}`);
    }

    if (page === 1) {
      totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
      const total = res.headers.get("X-WP-Total") ?? "?";
      console.log(`WP API: ${total} posts across ${totalPages} pages.`);
    }

    const data = (await res.json()) as WpPost[];
    posts.push(...data);
    console.log(`  Fetched page ${page}/${totalPages} (${data.length} posts)`);
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

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nSEO meta import — force=${force}, dry-run=${dryRun}\n`);

  const [wpPosts, sanityMap] = await Promise.all([
    fetchAllWpPosts(),
    fetchAllSanityArticles(),
  ]);

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

    if (!seo.title && !seo.description) {
      console.log(`  [skip-empty] ${post.slug} — no usable SEO data in yoast_head`);
      skipped++;
      continue;
    }

    const patch: Record<string, unknown> = {};
    if (seo.title) patch["seo.title"] = seo.title;
    if (seo.description) patch["seo.description"] = seo.description;
    if (seo.keywords && seo.keywords.length > 0) patch["seo.keywords"] = seo.keywords;

    if (dryRun) {
      console.log(`  [dry-run] ${post.slug} → title: "${seo.title?.slice(0, 60)}..."`);
    } else {
      await client.patch(article._id).set(patch).commit();
      console.log(`  [updated] ${post.slug}`);
    }

    updated++;
  }

  console.log(`
Done.
  WP posts fetched : ${wpPosts.length}
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
