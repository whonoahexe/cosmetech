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

function toWords(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);
}

function fallbackExcerpt({ title, plainText }) {
  const merged = [title, plainText].filter(Boolean).join(". ");
  return toWords(merged).slice(0, 25).join(" ");
}

async function generateWithGemini({ title, plainText }) {
  if (!geminiApiKey || !plainText) return null;

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const prompt = [
    "Write a concise article excerpt in plain English.",
    "Use exactly two short sentences. The total must be 20-28 words.",
    "Do not write more than 28 words under any circumstances.",
    "Avoid hype, clickbait, emojis, and hashtags.",
    "Preserve factual claims from the source text.",
    "Return ONLY the excerpt text with no labels, quotes, or extra punctuation.",
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
      generationConfig: { temperature: 0.4, maxOutputTokens: 80 },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    return null;
  }

  // Hard-cap at the second sentence boundary to guard against model overrun
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [];
  const capped = sentences.slice(0, 2).join(" ").trim() || toWords(text).slice(0, 28).join(" ");
  return capped;
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
