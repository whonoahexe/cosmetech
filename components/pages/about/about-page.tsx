import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SOCIAL_LINKS = ["linkedin", "facebook", "instagram", "twitter"];

export function AboutPageContent() {
  return (
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

          <div className="space-y-4">
            <p className="type-paragraph-large text-foreground">
              <span className="type-paragraph-large-bold">CosmeTech</span> is a B2B knowledge
              platform spanning print, digital, and industry events, created to serve the evolving
              information needs of the cosmetics and personal care sector. Owned by
              <span className="type-paragraph-large-bold"> FourthWave Media</span> and launched in
              2009, it has grown into a trusted source for industry insight, technical expertise,
              and business perspectives across the value chain.
            </p>
            <p className="type-paragraph-large text-foreground">
              At its core, CosmeTech has always focused on delivering credible, high-quality content
              for professionals working across formulation, fragrance, packaging, manufacturing, and
              marketing. Our aim is to foster a connected industry community where members can
              exchange ideas, stay informed on emerging developments, and collaborate on innovations
              that drive both product advancement and business growth.
            </p>
          </div>

          <div className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px] md:text-[30px]!">
            [ advertise ] / [ contact ]
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

          <div className="space-y-4">
            <p className="type-paragraph-large text-foreground">
              <span className="type-paragraph-large-bold">FourthWave Media</span> was founded in
              2005 by media professional Sheela Iyer with the objective of strengthening networks
              across the Indian beauty and wellness industry. Built around the principles of
              content, community, conversation, and commerce, the company develops integrated media
              platforms and initiatives that connect stakeholders across the value chain.
            </p>
            <p className="type-paragraph-large text-foreground">
              Over the years, FourthWave Media has launched a range of publications, digital
              platforms, projects, and industry programs designed to support knowledge exchange,
              collaboration, and business growth. From established trade publications and digital
              platforms to conferences, networking events, and strategic consulting for marketing
              and product development, each initiative is intended to help industry professionals
              stay informed, connected, and competitive.
            </p>
          </div>

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
          {SOCIAL_LINKS.map((social, index) => (
            <span key={social}>
              [{" "}
              <Link href="#" className="hover:underline">
                {social}
              </Link>{" "}
              ]{index < SOCIAL_LINKS.length - 1 ? " /" : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
