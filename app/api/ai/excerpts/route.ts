import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { generateExcerptWithGemini, buildFallbackExcerpt } from "@/lib/ai/excerpts";
import { apiVersion, dataset, projectId } from "@/sanity/lib/env";

const webhookSecret = process.env.SANITY_EXCERPT_WEBHOOK_SECRET;
const geminiApiKey = process.env.GEMINI_API_KEY;
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
  perspective: "published",
});

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
  perspective: "published",
});

type WebhookBody = {
  _id?: string;
  documentId?: string;
  ids?: {
    created?: string[];
    updated?: string[];
  };
};

type ArticleForExcerpt = {
  _id: string;
  title?: string;
  excerpt?: string;
  plainText?: string;
};

function normalizeArticleId(id: string): string {
  return id.startsWith("drafts.") ? id.replace(/^drafts\./, "") : id;
}

function getDocumentIds(payload: WebhookBody): string[] {
  const directIds = [payload._id, payload.documentId].filter(Boolean) as string[];
  const groupedIds = [...(payload.ids?.created ?? []), ...(payload.ids?.updated ?? [])];

  return [...new Set([...directIds, ...groupedIds])]
    .map(normalizeArticleId)
    .filter((id) => id.startsWith("article."));
}

function normalizeForComparison(text?: string): string {
  return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
}

async function getArticleById(id: string): Promise<ArticleForExcerpt | null> {
  return readClient.fetch(
    `*[_type == "article" && _id == $id][0]{
      _id,
      title,
      excerpt,
      "plainText": pt::text(body)
    }`,
    { id }
  );
}

export async function POST(req: Request) {
  if (!webhookSecret) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_EXCERPT_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  if (!writeToken) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_API_WRITE_TOKEN" },
      { status: 500 }
    );
  }

  const suppliedSecret = req.headers.get("x-webhook-secret");
  if (!suppliedSecret || suppliedSecret !== webhookSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await req.json()) as WebhookBody;
  const ids = getDocumentIds(payload);

  if (ids.length === 0) {
    return NextResponse.json({ ok: true, updated: 0, reason: "No article IDs in payload" });
  }

  let updated = 0;

  for (const id of ids) {
    const article = await getArticleById(id);
    if (!article) continue;

    const aiExcerpt = geminiApiKey
      ? await generateExcerptWithGemini({
          apiKey: geminiApiKey,
          title: article.title,
          plainText: article.plainText,
        })
      : null;

    const nextExcerpt = aiExcerpt || buildFallbackExcerpt(article);
    if (!nextExcerpt) continue;

    if (normalizeForComparison(nextExcerpt) === normalizeForComparison(article.excerpt)) {
      continue;
    }

    await writeClient.patch(article._id).set({ excerpt: nextExcerpt }).commit();
    updated += 1;
  }

  return NextResponse.json({ ok: true, updated });
}
