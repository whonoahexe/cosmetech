# CosmeTech

Next.js + Sanity publication site.

## Setup

1. Copy `.env.example` into `.env.local`.
2. Add required tokens and keys.
3. Start local dev:

```bash
npm install
npm run dev
```

## Seed Baseline Content

Populate fixed starter docs into Sanity:

```bash
npm run sanity:seed-categories
npm run sanity:seed-events
```

## AI Excerpt Automation

This repo now supports publish-time excerpt generation for articles.

- Endpoint: `POST /api/ai/excerpts`
- Auth: `x-webhook-secret` header must match `SANITY_EXCERPT_WEBHOOK_SECRET`
- Input: Sanity webhook payload with one or more article IDs
- Output: Updates each article `excerpt` to a punchy 24-34 word, two-sentence summary

Behavior:

- If `GEMINI_API_KEY` exists, it uses Gemini Flash to generate excerpt text.
- If AI is unavailable, it falls back to deterministic 30-word excerpting from title/body text.
- It only patches documents when content is actually different.

### Suggested Sanity Webhook

Configure a Sanity webhook for article create/update events:

- URL: `https://<your-domain>/api/ai/excerpts`
- Method: `POST`
- Header: `x-webhook-secret: <SANITY_EXCERPT_WEBHOOK_SECRET>`
- Projection payload example:

```json
{
	"_id": _id
}
```

### Backfill Existing Articles

Run once to refresh legacy excerpts:

```bash
npm run ai:backfill-excerpts
```

## Image Quality Boost

`SanityImage` now routes all images through a central loader with quality controls.

- Default mode (`NEXT_PUBLIC_IMAGE_ENHANCE_MODE=sanity`):
  - Adds width-aware transforms
  - Applies `auto=format`, `fit=max`, `q=80`, and responsive variants
- Optional mode (`cloudinary`):
  - Uses Cloudinary fetch URLs for sharpening/contrast boosts on top of responsive delivery
- Fallback mode (`off`):
  - Uses source image URL directly

Switch modes with env vars, no component rewrites needed.

The enhancement is applied by converting source URLs before rendering (instead of passing a loader function prop), which avoids Next.js RSC function-serialization runtime errors.
