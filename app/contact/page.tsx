import { PageTransition } from "@/components/page-transition";
import { ContactForm, ContactHeader, ContactLink } from "@/components/pages/contact";
import { Separator } from "@/components/ui/separator";
import { getContactPageData } from "@/sanity/lib/loaders";
import { buildMetadata } from "@/lib/metadata";
import { ScrollToHash } from "@/components/scroll-to-hash";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData();
  return buildMetadata(data?.seo, { title: "Contact | Cosmetech" });
}

export default async function ContactPage() {
  const data = await getContactPageData();

  const advertisingContacts = (data?.advertisingContacts ?? []).map((c) => ({
    label: c.kind === "phone" ? `call: ${c.value}` : c.value,
    href: c.kind === "phone" ? `tel:${c.value.replace(/\s/g, "")}` : `mailto:${c.value}`,
  }));

  return (
    <PageTransition>
    <ScrollToHash />
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

          <ContactForm />

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

          {data?.editorialContactEmail && (
            <ContactLink
              href={`mailto:${data.editorialContactEmail}`}
              label={data.editorialContactEmail}
            />
          )}

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
          </div>

          <div className="flex flex-wrap items-center gap-x-16 gap-y-4">
            {advertisingContacts.map((contact) => (
              <ContactLink key={contact.label} href={contact.href} label={contact.label} />
            ))}
          </div>

          <Separator />
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
