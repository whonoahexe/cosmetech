import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type TermsSection = {
  id: string;
  label: string;
  title: string;
  content: React.ReactNode;
};

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "agreement",
    label: "01",
    title: "Agreement to Terms",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          These Terms and Conditions constitute a legally binding agreement made
          between you, whether personally or on behalf of an entity ("you"), and
          FourthWave Media Pvt. Ltd. ("we", "us", or "our"), concerning your
          access to and use of the cosmetech.co.in website as well as any other
          media form, media channel, or website related or connected thereto.
        </p>
        <p className="type-paragraph-large text-foreground/70">
          You agree that by accessing the site, you have read, understood, and
          agreed to be bound by all of these Terms and Conditions. If you do not
          agree with all of these Terms and Conditions, then you are expressly
          prohibited from using the site and you must discontinue use immediately.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    label: "02",
    title: "Intellectual Property",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          Unless otherwise indicated, the site is our proprietary property and
          all source code, databases, functionality, software, website designs,
          audio, video, text, photographs, and graphics on the site (collectively,
          the "Content") and the trademarks, service marks, and logos contained
          therein (the "Marks") are owned or controlled by us or licensed to us.
        </p>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          The Content and Marks are provided on the site "AS IS" for your
          information and personal use only. Except as expressly provided in these
          Terms, no part of the site and no Content or Marks may be copied,
          reproduced, aggregated, republished, uploaded, posted, publicly
          displayed, encoded, translated, transmitted, distributed, sold, licensed,
          or otherwise exploited for any commercial purpose whatsoever, without
          our express prior written permission.
        </p>
        <p className="type-paragraph-large text-foreground/70">
          Provided that you are eligible to use the site, you are granted a
          limited licence to access and use the site and to download or print a
          copy of any portion of the Content to which you have properly gained
          access solely for your personal, non-commercial use.
        </p>
      </>
    ),
  },
  {
    id: "user-representations",
    label: "03",
    title: "User Representations",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          By using the site, you represent and warrant that:
        </p>
        <ul className="type-paragraph-large space-y-2 text-foreground/70">
          {[
            "All registration information you submit will be true, accurate, current, and complete.",
            "You will maintain the accuracy of such information and promptly update such information as necessary.",
            "You have the legal capacity and you agree to comply with these Terms and Conditions.",
            "You are not a minor in the jurisdiction in which you reside.",
            "You will not access the site through automated or non-human means, whether through a bot, script, or otherwise.",
            "You will not use the site for any illegal or unauthorised purpose.",
            "Your use of the site will not violate any applicable law or regulation.",
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
    id: "prohibited",
    label: "04",
    title: "Prohibited Activities",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          You may not access or use the site for any purpose other than that for
          which we make the site available. As a user of the site, you agree not to:
        </p>
        <ul className="type-paragraph-large space-y-2 text-foreground/70">
          {[
            "Systematically retrieve data or other content from the site to create or compile, directly or indirectly, a collection, compilation, database, or directory.",
            "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
            "Circumvent, disable, or otherwise interfere with security-related features of the site.",
            "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the site.",
            "Use any information obtained from the site in order to harass, abuse, or harm another person.",
            "Make improper use of our support services or submit false reports of abuse or misconduct.",
            "Use the site in a manner inconsistent with any applicable laws or regulations.",
            "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material that interferes with any party's uninterrupted use and enjoyment of the site.",
            "Copy or adapt the site's software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.",
            "Delete the copyright or other proprietary rights notice from any Content.",
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
    id: "submissions",
    label: "05",
    title: "Submissions & Contributions",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          You acknowledge and agree that any questions, comments, suggestions,
          ideas, feedback, or other information regarding the site ("Submissions")
          provided by you to us are non-confidential and shall become our sole
          property.
        </p>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          We shall own exclusive rights, including all intellectual property
          rights, and shall be entitled to the unrestricted use and dissemination
          of these Submissions for any lawful purpose, commercial or otherwise,
          without acknowledgment or compensation to you.
        </p>
        <p className="type-paragraph-large text-foreground/70">
          If you submit editorial contributions such as articles or opinion pieces
          to CosmeTech, you grant us a non-exclusive, royalty-free, perpetual,
          and worldwide licence to publish, reproduce, modify, and distribute
          such content across our platforms. You retain authorship credit for your
          contributions.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    label: "06",
    title: "Disclaimer & Limitation of Liability",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          The site is provided on an as-is and as-available basis. You agree
          that your use of the site and our services will be at your sole risk.
          To the fullest extent permitted by law, we disclaim all warranties,
          express or implied, in connection with the site and your use thereof.
        </p>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          We will not be liable to you or any third party for any direct, indirect,
          consequential, exemplary, incidental, special, or punitive damages,
          including lost profit, lost revenue, loss of data, or other damages
          arising from your use of the site, even if we have been advised of
          the possibility of such damages.
        </p>
        <p className="type-paragraph-large text-foreground/70">
          The content published on CosmeTech is intended for informational
          purposes. Nothing on this site constitutes professional, legal, medical,
          or financial advice, and you should seek appropriate counsel before
          acting on any information found here.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    label: "07",
    title: "Governing Law",
    content: (
      <p className="type-paragraph-large text-foreground/70">
        These Terms and Conditions and your use of the site are governed by and
        construed in accordance with the laws of India applicable to agreements
        made and to be entirely performed within India, without regard to its
        conflict of law or choice of law provisions. Any legal action or
        proceeding arising under these Terms will be brought exclusively in the
        courts of Mumbai, Maharashtra, and the parties hereby consent to personal
        jurisdiction and venue therein.
      </p>
    ),
  },
  {
    id: "contact",
    label: "08",
    title: "Contact Us",
    content: (
      <>
        <p className="type-paragraph-large text-foreground/70 mb-5">
          In order to resolve a complaint regarding the site or to receive
          further information regarding use of the site, please contact us at:
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

export function TermsPageContent() {
  return (
    <div className="mx-auto my-16 flex w-full max-w-6xl flex-col py-10 md:py-16">
      {/* Page header */}
      <div className="px-0 pb-12 md:px-8 lg:px-0">
        <p className="type-monospaced mb-3 text-primary">Legal</p>
        <h1 className="type-heading-1 max-w-xl text-foreground">
          Terms & Conditions
        </h1>
        <p className="type-paragraph mt-4 text-foreground/50">
          Last updated: March 2026
        </p>
      </div>

      <Separator />

      <section className="px-0 md:px-8 lg:px-0">
        {TERMS_SECTIONS.map((section, index) => (
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
            {index < TERMS_SECTIONS.length - 1 && <Separator />}
          </div>
        ))}

        {/* CTA */}
        <div className="py-16">
          <Separator />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-10">
            <p className="type-paragraph-large text-foreground">
              Questions about our terms?
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
