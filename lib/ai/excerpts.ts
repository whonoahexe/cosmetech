const EXCERPT_TARGET_WORDS = 24;
const EXCERPT_MIN_WORDS = 20;
const EXCERPT_MAX_WORDS = 28;

function toWords(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);
}

function truncateToWords(text: string, maxWords: number): string {
  const words = toWords(text);
  return words.slice(0, maxWords).join(" ");
}

function normalizeSpacing(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function buildFallbackExcerpt(input: { title?: string; plainText?: string }): string {
  const merged = [input.title, input.plainText].filter(Boolean).join(". ");
  const base = truncateToWords(merged, EXCERPT_TARGET_WORDS);
  return normalizeSpacing(base);
}

export function enforceExcerptLength(text: string): string {
  const words = toWords(text);
  if (words.length === 0) return "";

  if (words.length > EXCERPT_MAX_WORDS) {
    return words.slice(0, EXCERPT_TARGET_WORDS).join(" ");
  }

  return normalizeSpacing(text);
}

export async function generateExcerptWithGemini(input: {
  apiKey: string;
  title?: string;
  plainText?: string;
}): Promise<string | null> {
  const articleText = normalizeSpacing(input.plainText || "");
  if (!articleText) return null;

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const prompt = [
    "Write a concise article excerpt in plain English.",
    `Use exactly two short sentences. The total must be ${EXCERPT_MIN_WORDS}-${EXCERPT_MAX_WORDS} words.`,
    `Do not write more than ${EXCERPT_MAX_WORDS} words under any circumstances.`,
    "Avoid hype, clickbait, emojis, and hashtags.",
    "Preserve factual claims from the source text.",
    "Return ONLY the excerpt text with no labels, quotes, or extra punctuation.",
    input.title ? `Title: ${input.title}` : "",
    `Body: ${articleText.slice(0, 800)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`${endpoint}?key=${encodeURIComponent(input.apiKey)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 80,
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const raw = payload.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!raw) return null;

  // Hard-cap at the second sentence boundary to guard against model overrun
  const sentences = raw.match(/[^.!?]+[.!?]+/g) ?? [];
  return sentences.slice(0, 2).join(" ").trim() || enforceExcerptLength(raw);
}
