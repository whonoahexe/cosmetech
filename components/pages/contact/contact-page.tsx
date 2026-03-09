import Link from "next/link";
import { ArrowUpRight, Mail, PenLine, SendHorizontal, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ADVERTISING_POINTS = [
  "Strategically placed display banners",
  "Sponsored articles and content features",
  "Sponsored newsletters",
  "Custom email and SMS campaigns",
  "Social media promotions",
  "Event and partnership opportunities",
];

const ADVERTISING_CONTACTS = [
  { label: "sriram@cosmetech.co.in", href: "mailto:sriram@cosmetech.co.in" },
  { label: "sales@cosmetech.co.in", href: "mailto:sales@cosmetech.co.in" },
  { label: "call: +91 8879735111", href: "tel:+918879735111" },
];

function ContactHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <p className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px]">
        {title}
      </p>
      <Button variant="outline" className="h-8 w-16 rounded-full border-primary px-3 text-primary">
        <Sparkles className="size-4" />
      </Button>
    </div>
  );
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[18px] leading-6.75 text-primary underline"
    >
      {label}
      <ArrowUpRight className="size-5" />
    </Link>
  );
}

export function ContactPageContent() {
  return (
    <div className="mx-auto my-16 flex w-full max-w-6xl flex-col py-10 md:py-16">
      <section className="space-y-4 px-0 md:px-8 lg:px-0">
        <div className="grid gap-8 py-16 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-12">
            <ContactHeader title="Cosmetech / General Contact" />
            <p className="type-paragraph-large text-foreground">
              Have a question, idea, or collaboration in mind? Reach out to our team and we&apos;ll
              make sure your enquiry finds the right person.
            </p>
          </div>

          <form className="space-y-6 lg:pt-0">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative shadow-2xl">
                <PenLine className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Your Name"
                  className="h-14 rounded-full pl-10 border-b border-border"
                />
              </div>

              <div className="relative shadow-2xl">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Your Email"
                  type="email"
                  className="h-14 rounded-full pl-10 border-b border-border"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="h-8 w-16 rounded-full border border-[#f7dbd4] px-3"
              >
                <SendHorizontal className="size-4" />
              </Button>
            </div>
          </form>

          <div className="lg:col-span-2">
            <Separator />
          </div>
        </div>

        <div className="space-y-16 py-16">
          <ContactHeader title="Cosmetech / Editorial Contact" />

          <p className="type-paragraph-large max-w-162 text-foreground">
            Share your press releases, product launches, and industry announcements with our
            editorial team at:
          </p>

          <ContactLink href="mailto:editor@cosmetech.co.in" label="editor@cosmetech.co.in" />

          <Separator />
        </div>

        <div id="advertise" className="scroll-mt-28 space-y-16 py-16">
          <ContactHeader title="Cosmetech / Why advertise with us?" />

          <div className="max-w-324 space-y-4 text-foreground">
            <p className="type-paragraph-large">
              Advertising with CosmeTech enables targeted visibility across a highly relevant
              professional audience. Our integrated print, digital, and event platforms allow your
              message to reach qualified readers in a cost-effective and credible environment.
            </p>
            <p className="type-paragraph-large">
              Whether you&apos;re launching a product, building brand awareness, or sharing industry
              expertise, we help position your content where it matters most.
            </p>
            <ul className="type-paragraph-large list-disc space-y-0.5 pl-6">
              {ADVERTISING_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-16 gap-y-4">
            {ADVERTISING_CONTACTS.map((contact) => (
              <ContactLink key={contact.label} href={contact.href} label={contact.label} />
            ))}
          </div>

          <Separator />
        </div>
      </section>
    </div>
  );
}
