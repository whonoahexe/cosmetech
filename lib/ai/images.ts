function simpleHash(s: string): number {
  return Math.abs(s.split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0));
}

export function buildGeneratedImageUrl(title: string, category: string, excerpt?: string): string {
  const excerptAddition =
    excerpt && !excerpt.toLowerCase().startsWith(title.toLowerCase().slice(0, 40))
      ? ` - ${excerpt.slice(0, 60)}`
      : "";
  const prompt = `editorial cover image: ${title}${excerptAddition}, ${category} industry, professional photography, clean modern aesthetic`;
  const seed = simpleHash(title);
  const params = new URLSearchParams({ prompt, seed: String(seed) });
  return `/api/ai/cover-image?${params}`;
}
