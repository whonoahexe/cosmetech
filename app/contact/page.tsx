import { ContactForm, ContactHeader, ContactLink } from "@/components/pages/contact";
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

export default function ContactPage() {
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
