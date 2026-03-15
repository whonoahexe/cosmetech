import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "upki2e2x";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-04";
const token = process.env.SANITY_API_WRITE_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function normalizeSpacing(text) {
  return text.replace(/\s+/g, " ").trim();
}

function extractSentences(text) {
  return text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [];
}

function fallbackExcerpt({ title, plainText }) {
  const text = normalizeSpacing(plainText || title || "");
  const sentences = extractSentences(text);
  if (sentences.length >= 1) return sentences.slice(0, 2).join(" ");
  const words = text.split(" ").filter(Boolean);
  return words.slice(0, 30).join(" ") + (words.length > 30 ? "…" : "");
}

async function generateWithGemini({ title, plainText }) {
  if (!geminiApiKey || !plainText) return null;

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const prompt = [
    "Write a 1-2 sentence excerpt for this article in plain English.",
    "Every sentence must be complete and end with a period.",
    "Target around 25-35 words total. Never exceed 40 words.",
    "Be concise and informative. Preserve factual claims from the source.",
    "Avoid hype, clickbait, emojis, and hashtags.",
    "Return ONLY the excerpt text — no labels, quotes, or extra formatting.",
    title ? `Title: ${title}` : "",
    `Body: ${plainText.slice(0, 800)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`${endpoint}?key=${encodeURIComponent(geminiApiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 120 },
    }),
  });

  if (!response.ok) return null;

  const payload = await response.json();
  const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!raw) return null;

  const sentences = extractSentences(raw);
  if (sentences.length === 0) return null;

  const twoSentences = sentences.slice(0, 2).join(" ");
  const wordCount = twoSentences.split(/\s+/).length;
  return wordCount <= 40 ? twoSentences : sentences[0];
}

const articles = await client.fetch(`*[_type == "article"]{
  _id,
  title,
  excerpt,
  "plainText": pt::text(body)
}`);

let updated = 0;

for (const article of articles) {
  const aiExcerpt = await generateWithGemini(article);
  const nextExcerpt = aiExcerpt || fallbackExcerpt(article);

  if (!nextExcerpt) continue;

  const previous = (article.excerpt || "").replace(/\s+/g, " ").trim().toLowerCase();
  const incoming = nextExcerpt.replace(/\s+/g, " ").trim().toLowerCase();

  if (previous === incoming) continue;

  await client.patch(article._id).set({ excerpt: nextExcerpt }).commit();
  updated += 1;
  console.log(`Updated ${article._id}`);
}

console.log(`Done. Updated ${updated} articles.`);
