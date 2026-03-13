import { LegalPageLayout } from "@/components/shared/legal-page-layout";
import { getPrivacyPolicyPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacyPolicyPageData();
  return buildMetadata(data?.seo, { title: "Privacy Policy | Cosmetech" });
}

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicyPageData();

  return (
    <LegalPageLayout
      label="Legal"
      title={data?.pageTitle ?? "Privacy Policy"}
      body={data?.body}
      ctaText="Have a privacy concern?"
      ctaHref="/contact"
      ctaLabel="Contact us"
    />
  );
}
