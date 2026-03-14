const hfToken = process.env.HF_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const seed = Number(searchParams.get("seed") ?? "0");

  if (!prompt) {
    return new Response("Missing prompt", { status: 400 });
  }

  if (!hfToken) {
    return new Response("Missing HF_TOKEN", { status: 503 });
  }

  const hfResponse = await fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { seed, num_inference_steps: 4 },
      }),
    }
  );

  if (!hfResponse.ok) {
    return new Response("Image generation failed", { status: 502 });
  }

  const imageBuffer = await hfResponse.arrayBuffer();

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      // Deterministic output — cache forever at the CDN/browser layer
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
