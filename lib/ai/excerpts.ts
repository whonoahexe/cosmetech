function normalizeSpacing(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function extractSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [];
}

export function buildFallbackExcerpt(input: { title?: string; plainText?: string }): string {
  const text = normalizeSpacing(input.plainText || input.title || "");
  const sentences = extractSentences(text);
  if (sentences.length === 0) return "";

  // Pick 1-2 complete sentences staying within 35 words total.
  const result: string[] = [];
  let wordCount = 0;
  for (const sentence of sentences.slice(0, 2)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (wordCount + words > 35) break;
    result.push(sentence);
    wordCount += words;
  }

  // Always include at least the first sentence (even if it alone exceeds 35 words)
  // so the excerpt is never empty when content exists.
  return result.length > 0 ? result.join(" ") : sentences[0];
}

export async function generateExcerptWithGemini(input: {
  apiKey: string;
  title?: string;
  plainText?: string;
}): Promise<string | null> {
  const articleText = normalizeSpacing(input.plainText || "");
  if (!articleText) return null;

  const prompt = [
    "Write a 1-2 sentence excerpt for this article in plain English.",
    "Every sentence must be complete and end with a period.",
    "Target around 25-35 words total. Never exceed 40 words.",
    "Be concise and informative. Preserve factual claims from the source.",
    "Avoid hype, clickbait, emojis, and hashtags.",
    "Return ONLY the excerpt text — no labels, quotes, or extra formatting.",
    input.title ? `Title: ${input.title}` : "",
    `Body: ${articleText.slice(0, 800)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const response = await fetch(`${endpoint}?key=${encodeURIComponent(input.apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 120,
      },
    }),
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const raw = payload.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!raw) return null;

  const sentences = extractSentences(raw);
  if (sentences.length === 0) return null;

  const twoSentences = sentences.slice(0, 2).join(" ");
  const wordCount = twoSentences.split(/\s+/).length;
  // If two sentences run long, fall back to just the first
  return wordCount <= 40 ? twoSentences : sentences[0];
}
