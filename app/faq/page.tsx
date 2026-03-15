import { getFaqPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { FaqPageContent } from "@/components/pages/faq/faq-page-content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFaqPageData();
  return buildMetadata(data?.seo, { title: "FAQ | Cosmetech" });
}

export default async function FaqPage() {
  const data = await getFaqPageData();

  const categories = (data?.sections ?? []).map((section, index) => ({
    id: section.title.toLowerCase().replace(/\s+/g, "-"),
    label: String(index + 1).padStart(2, "0"),
    title: section.title,
    items: section.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  }));

  return <FaqPageContent categories={categories} />;
}
