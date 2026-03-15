/**
 * Bulk-regenerate excerpts for all articles and press releases.
 *
 * Usage:
 *   npx tsx scripts/regenerate-excerpts.ts [--force]
 *
 * Flags:
 *   --force   Overwrite every excerpt even if unchanged (useful after updating generation logic)
 *
 * Required env vars (same as the webhook route):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (defaults to "production")
 *   NEXT_PUBLIC_SANITY_API_VERSION  (defaults to "2025-03-04")
 *   SANITY_API_WRITE_TOKEN
 *   GEMINI_API_KEY                  (optional — falls back to deterministic extraction)
 */

import { createClient } from "next-sanity";
import { generateExcerptWithGemini, buildFallbackExcerpt } from "../lib/ai/excerpts";
import { config } from "dotenv";
config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-03-04";
const writeToken = process.env.SANITY_API_WRITE_TOKEN!;
const geminiApiKey = process.env.GEMINI_API_KEY;
const force = process.argv.includes("--force");

if (!projectId || !writeToken) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false });

type Article = { _id: string; title?: string; plainText?: string };

async function fetchAllArticles(): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && !(_id in path("drafts.**"))]{
      _id,
      title,
      "plainText": pt::text(body)
    } | order(_createdAt asc)`
  );
}

function normalizeForComparison(text?: string): string {
  return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
}

async function main() {
  const articles = await fetchAllArticles();
  console.log(`Found ${articles.length} articles.${force ? " (--force: overwriting all)" : ""}`);

  let updated = 0;
  let skipped = 0;

  for (const article of articles) {
    const aiExcerpt = geminiApiKey
      ? await generateExcerptWithGemini({
          apiKey: geminiApiKey,
          title: article.title,
          plainText: article.plainText,
        })
      : null;

    const nextExcerpt = aiExcerpt || buildFallbackExcerpt(article);

    if (!nextExcerpt) {
      console.warn(`  [skip] ${article._id} — could not generate excerpt`);
      skipped++;
      continue;
    }

    if (!force) {
      // Fetch current excerpt to skip unnecessary writes
      const current = await client.fetch<{ excerpt?: string }>(
        `*[_id == $id][0]{ excerpt }`,
        { id: article._id }
      );

      if (normalizeForComparison(nextExcerpt) === normalizeForComparison(current?.excerpt)) {
        skipped++;
        continue;
      }
    }

    await client.patch(article._id).set({ excerpt: nextExcerpt }).commit();
    console.log(`  [updated] ${article._id}: ${nextExcerpt}`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
