import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type PolicySection = {
  id: string;
  label: string;
  title: string;
  content: React.ReactNode;
};

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    label: "01",
    title: "Introduction",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          FourthWave Media Pvt. Ltd., the owner and operator of CosmeTech
          ("we", "us", or "our"), is committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website cosmetech.co.in, including
          any other media form, media channel, or mobile website related to it.
        </p>
        <p className="type-paragraph-large text-foreground/70">
          Please read this policy carefully. If you disagree with its terms,
          please discontinue use of the site. We reserve the right to make
          changes to this policy at any time, and we will alert you here when
          we do.
        </p>
      </>
    ),
  },
  {
    id: "collection",
    label: "02",
    title: "Information We Collect",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          We may collect information about you in a variety of ways. The
          information we may collect on the site includes:
        </p>
        <ul className="space-y-4">
          {[
            {
              term: "Personal Data",
              desc: "Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give us when you register on the site, subscribe to our newsletter, or when you choose to participate in various activities related to the site.",
            },
            {
              term: "Derivative Data",
              desc: "Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.",
            },
            {
              term: "Financial Data",
              desc: "Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, or request information about our services. We store only very limited financial information that we need to fulfil your transaction.",
            },
            {
              term: "Marketing & Communications Data",
              desc: "Your preferences in receiving marketing communications from us and our third parties, and your communication preferences.",
            },
          ].map(({ term, desc }) => (
            <li key={term}>
              <p className="type-paragraph-large-medium text-foreground mb-1">
                {term}
              </p>
              <p className="type-paragraph-large text-foreground/70">{desc}</p>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "use",
    label: "03",
    title: "Use of Your Information",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customised experience. Specifically, we may use
          information collected about you via the site to:
        </p>
        <ul className="type-paragraph-large space-y-2 text-foreground/70">
          {[
            "Create and manage your account.",
            "Send you our newsletter and relevant editorial content.",
            "Fulfil and manage purchases, orders, payments, and other transactions.",
            "Generate a personal profile about you to make future visits more personalised.",
            "Increase the efficiency and operation of the site.",
            "Monitor and analyse usage and trends to improve your experience.",
            "Notify you of updates to the site.",
            "Offer new products, services, and recommendations.",
            "Perform other business activities as needed.",
            "Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.",
            "Request feedback and contact you about your use of the site.",
            "Resolve disputes and troubleshoot problems.",
            "Respond to product and customer service requests.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "disclosure",
    label: "04",
    title: "Disclosure of Your Information",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <ul className="space-y-4">
          {[
            {
              term: "By Law or to Protect Rights",
              desc: "If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.",
            },
            {
              term: "Business Transfers",
              desc: "We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.",
            },
            {
              term: "Third-Party Service Providers",
              desc: "We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.",
            },
            {
              term: "Marketing Communications",
              desc: "With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.",
            },
          ].map(({ term, desc }) => (
            <li key={term}>
              <p className="type-paragraph-large-medium text-foreground mb-1">
                {term}
              </p>
              <p className="type-paragraph-large text-foreground/70">{desc}</p>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    label: "05",
    title: "Cookies & Tracking",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          We may use cookies, web beacons, tracking pixels, and other tracking
          technologies on the site to help customise the site and improve your
          experience. For more information on how we use cookies, please refer
          to our Cookie Policy.
        </p>
        <p className="type-paragraph-large text-foreground/70">
          Most browsers are set to accept cookies by default. You can usually
          choose to set your browser to remove or reject browser cookies. If you
          choose to remove or reject cookies, this could affect certain features
          or services of our site.
        </p>
      </>
    ),
  },
  {
    id: "security",
    label: "06",
    title: "Security of Your Information",
    content: (
      <p className="type-paragraph-large text-foreground/70">
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse.
      </p>
    ),
  },
  {
    id: "contact",
    label: "07",
    title: "Contact Us",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          If you have questions or comments about this Privacy Policy, please
          contact us at:
        </p>
        <div className="type-paragraph-large space-y-1 text-foreground/70">
          <p className="type-paragraph-large-medium text-foreground">
            FourthWave Media Pvt. Ltd.
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:editor@cosmetech.co.in"
              className="text-primary underline"
            >
              editor@cosmetech.co.in
            </a>
          </p>
          <p>Phone: +91 8879735111</p>
        </div>
      </>
    ),
  },
];

export function PrivacyPolicyPageContent() {
  return (
    <div className="mx-auto my-16 flex w-full max-w-6xl flex-col py-10 md:py-16">
      {/* Page header */}
      <div className="px-0 pb-12 md:px-8 lg:px-0">
        <p className="type-monospaced mb-3 text-primary">Legal</p>
        <h1 className="type-heading-1 max-w-xl text-foreground">
          Privacy Policy
        </h1>
        <p className="type-paragraph mt-4 text-foreground/50">
          Last updated: March 2026
        </p>
      </div>

      <Separator />

      <section className="px-0 md:px-8 lg:px-0">
        {POLICY_SECTIONS.map((section, index) => (
          <div key={section.id}>
            <div className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[280px_1fr]">
              {/* Label column */}
              <div className="flex flex-col gap-3">
                <span className="type-monospaced text-primary">
                  {section.label}
                </span>
                <h2 className="type-heading-3 text-foreground">
                  {section.title}
                </h2>
              </div>
              {/* Content column */}
              <div>{section.content}</div>
            </div>
            {index < POLICY_SECTIONS.length - 1 && <Separator />}
          </div>
        ))}

        {/* CTA */}
        <div className="py-16">
          <Separator />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-10">
            <p className="type-paragraph-large text-foreground">
              Have a privacy concern?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[18px] leading-6.75 text-primary underline"
            >
              Contact us
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
