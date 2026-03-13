import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PortableTextBody } from "./portable-text-body";

type LegalSection = {
  label: string;
  title: string;
  body: unknown[];
};

function splitBodyIntoSections(body: unknown[] | undefined | null): LegalSection[] {
  if (!body || body.length === 0) return [];

  const sections: LegalSection[] = [];
  let currentBlocks: unknown[] = [];
  let currentTitle = "";
  let sectionIndex = 0;

  for (const block of body) {
    const b = block as { _type?: string; style?: string; children?: { text?: string }[] };
    if (b._type === "block" && b.style === "h2") {
      // Flush previous section
      if (currentTitle && currentBlocks.length > 0) {
        sectionIndex++;
        sections.push({
          label: String(sectionIndex).padStart(2, "0"),
          title: currentTitle,
          body: currentBlocks,
        });
      }
      currentTitle = b.children?.map((c) => c.text ?? "").join("") ?? "";
      currentBlocks = [];
    } else {
      currentBlocks.push(block);
    }
  }

  // Flush last section
  if (currentTitle && currentBlocks.length > 0) {
    sectionIndex++;
    sections.push({
      label: String(sectionIndex).padStart(2, "0"),
      title: currentTitle,
      body: currentBlocks,
    });
  }

  return sections;
}

type LegalPageLayoutProps = {
  label: string;
  title: string;
  body: unknown[] | undefined | null;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
};

export function LegalPageLayout({
  label,
  title,
  body,
  ctaText,
  ctaHref,
  ctaLabel,
}: LegalPageLayoutProps) {
  const sections = splitBodyIntoSections(body);

  return (
    <div className="mx-auto my-16 flex w-full max-w-6xl flex-col py-10 md:py-16">
      {/* Page header */}
      <div className="px-0 pb-12 md:px-8 lg:px-0">
        <p className="type-monospaced mb-3 text-primary">{label}</p>
        <h1 className="type-heading-1 max-w-xl text-foreground">{title}</h1>
        <p className="type-paragraph mt-4 text-foreground/50">Last updated: March 2026</p>
      </div>

      <Separator />

      <section className="px-0 md:px-8 lg:px-0">
        {sections.map((section, index) => (
          <div key={section.label}>
            <div className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[280px_1fr]">
              {/* Label column */}
              <div className="flex flex-col gap-3">
                <span className="type-monospaced text-primary">{section.label}</span>
                <h2 className="type-heading-3 text-foreground">{section.title}</h2>
              </div>
              {/* Content column */}
              <div className="[&_p]:text-foreground/70">
                <PortableTextBody value={section.body} />
              </div>
            </div>
            {index < sections.length - 1 && <Separator />}
          </div>
        ))}

        {/* CTA */}
        <div className="py-16">
          <Separator />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-10">
            <p className="type-paragraph-large text-foreground">{ctaText}</p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-[18px] leading-6.75 text-primary underline"
            >
              {ctaLabel}
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
