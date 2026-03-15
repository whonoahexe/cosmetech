import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "upki2e2x";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-04";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const docs = JSON.parse(readFileSync(resolve(__dirname, "../sanity/seeds/events.json"), "utf-8"));

const tx = client.transaction();
for (const doc of docs) {
  tx.createOrReplace(doc);
}

await tx.commit();
console.log(`✓ Upserted ${docs.length} documents`);
