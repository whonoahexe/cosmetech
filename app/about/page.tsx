import { PageTransition } from "@/components/page-transition";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PortableTextBody } from "@/components/shared/portable-text-body";
import { getAboutPageData, getSiteSettings } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();
  return buildMetadata(data?.seo, { title: "About | Cosmetech" });
}

export default async function AboutPage() {
  const [data, settings] = await Promise.all([getAboutPageData(), getSiteSettings()]);

  const socialLinks = settings?.socialLinks ?? [];

  return (
    <PageTransition>
    <div className="mx-auto my-16 flex w-full max-w-6xl flex-col py-10 md:py-16">
      <section className="space-y-4 px-0 md:px-8 lg:px-0">
        <div className="space-y-16 py-16">
          <div className="flex flex-wrap items-center gap-6">
            <p className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px] md:text-[30px]!">
              Cosmetech / About
            </p>
            <Button
              variant="outline"
              className="h-8 rounded-full border-primary px-3 text-primary w-16"
            >
              <Sparkles className="size-4" />
            </Button>
          </div>

          <PortableTextBody value={data?.cosmetechBody} />

          <div className="type-monospaced flex flex-wrap items-center gap-3 text-primary text-[30px]! leading-6 tracking-[-1.4px] md:text-[30px]!">
            [
            <Link href="/contact#advertise" className="hover:underline">
              advertise
            </Link>
            ] / [
            <Link href="/contact" className="hover:underline">
              contact
            </Link>
            ]
          </div>

          <Separator />
        </div>

        <div className="space-y-16 py-16">
          <div className="flex flex-wrap items-center gap-6">
            <p className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px] md:text-[30px]!">
              Fourthwave / About
            </p>
            <Button
              variant="outline"
              className="h-8 w-auto rounded-full border-primary px-3 text-primary"
            >
              <Sparkles className="size-4" />
            </Button>
          </div>

          <PortableTextBody value={data?.fourthWaveBody} />

          <Link
            href="https://www.fourthwave.co.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[18px] leading-6.75 text-primary underline"
          >
            www.fourthwave.co.in
            <ArrowUpRight className="size-5" />
          </Link>

          <Separator />
        </div>

        <div className="type-monospaced flex flex-wrap items-center gap-4 text-primary text-[30px]! leading-6 tracking-[-1.4px] md:text-[30px]! py-16">
          {socialLinks.map((social, index) => (
            <span key={social.platform}>
              [{" "}
              <Link href={social.href} target="_blank" rel="noreferrer" className="hover:underline">
                {social.label ?? social.platform}
              </Link>{" "}
              ]{index < socialLinks.length - 1 ? " /" : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
