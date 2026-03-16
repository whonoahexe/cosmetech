import { PageTransition } from "@/components/page-transition";
import { LegalPageLayout } from "@/components/shared/legal-page-layout";
import { getTermsPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTermsPageData();
  return buildMetadata(data?.seo, { title: "Terms & Conditions | Cosmetech" });
}

export default async function TermsPage() {
  const data = await getTermsPageData();

  return (
    <PageTransition>
      <LegalPageLayout
        label="Legal"
        title={data?.pageTitle ?? "Terms & Conditions"}
        body={data?.body}
        ctaText="Questions about our terms?"
        ctaHref="/contact"
        ctaLabel="Contact us"
      />
    </PageTransition>
  );
}
