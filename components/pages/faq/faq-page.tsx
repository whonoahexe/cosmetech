"use client";

import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  id: string;
  label: string;
  title: string;
  items: FaqItem[];
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "about",
    label: "01",
    title: "About",
    items: [
      {
        question: "What is CosmeTech?",
        answer:
          "CosmeTech is a B2B knowledge platform spanning print, digital, and industry events, created to serve the evolving information needs of the cosmetics and personal care sector. Owned by FourthWave Media and launched in 2009, it has grown into a trusted source for industry insight, technical expertise, and business perspectives across the value chain.",
      },
      {
        question: "Who is CosmeTech for?",
        answer:
          "CosmeTech is designed for professionals working across the cosmetics and personal care industry — including formulators, fragrance specialists, packaging engineers, manufacturers, marketers, and business leaders. Our content is tailored to inform, connect, and support those who drive product innovation and business growth.",
      },
      {
        question: "What is FourthWave Media?",
        answer:
          "FourthWave Media is the parent company of CosmeTech, founded in 2005 by media professional Sheela Iyer. The company builds integrated media platforms, industry events, and knowledge initiatives that connect stakeholders across the beauty and wellness value chain.",
      },
      {
        question: "Where is CosmeTech based?",
        answer:
          "CosmeTech is based in India and covers the cosmetics and personal care industry across the region and internationally. Our editorial, events, and digital presence serve a global audience of industry professionals.",
      },
    ],
  },
  {
    id: "editorial",
    label: "02",
    title: "Content & Editorial",
    items: [
      {
        question: "How do I submit a press release or product announcement?",
        answer:
          "You can send press releases, product launches, and industry announcements directly to our editorial team at editor@cosmetech.co.in. Please include high-resolution images, key details, and a contact for follow-up queries.",
      },
      {
        question: "Can I contribute an article or opinion piece?",
        answer:
          "Yes — CosmeTech welcomes contributions from industry experts. If you have an insight, technical analysis, or perspective to share with our readership, please reach out to editor@cosmetech.co.in with a brief pitch or outline.",
      },
      {
        question: "How is editorial content curated?",
        answer:
          "Our editorial team selects content based on relevance, credibility, and value to our professional audience. We prioritise original insights, technical expertise, and developments that impact the cosmetics and personal care industry at large.",
      },
      {
        question: "How frequently is new content published?",
        answer:
          "CosmeTech publishes new articles, news, and features regularly across our digital platform. Our newsletter keeps subscribers updated with the latest industry developments delivered straight to their inbox.",
      },
    ],
  },
  {
    id: "events",
    label: "03",
    title: "Events",
    items: [
      {
        question: "How do I register for a CosmeTech event?",
        answer:
          "Event registration details are listed on the individual event pages. Visit the Events section on our website to browse upcoming events and follow the registration instructions provided for each.",
      },
      {
        question: "Can I sponsor or partner at a CosmeTech event?",
        answer:
          "Yes — sponsorship and partnership opportunities are available across our event portfolio. To discuss options and obtain a sponsorship prospectus, please contact our team at sales@cosmetech.co.in.",
      },
      {
        question: "Where do CosmeTech events take place?",
        answer:
          "CosmeTech events are held across key cities in India and, in some cases, internationally. Venue and location details are published on each event's dedicated page well in advance of the event date.",
      },
      {
        question: "How can I stay informed about upcoming events?",
        answer:
          "Subscribe to our newsletter to receive updates on upcoming events, speaker announcements, and registration openings. You can also follow us on social media or check the Events section of our website regularly.",
      },
    ],
  },
  {
    id: "advertising",
    label: "04",
    title: "Advertising & Partnerships",
    items: [
      {
        question: "What advertising options does CosmeTech offer?",
        answer:
          "CosmeTech offers a range of integrated advertising solutions including strategically placed display banners, sponsored articles and content features, sponsored newsletters, custom email and SMS campaigns, social media promotions, and event and partnership opportunities.",
      },
      {
        question: "How do I request a media kit?",
        answer:
          "To request our media kit, including readership data, ad specifications, and rate cards, please get in touch with our sales team at sales@cosmetech.co.in or call +91 8879735111.",
      },
      {
        question: "What is the size of CosmeTech's readership?",
        answer:
          "CosmeTech reaches a highly engaged professional audience across the cosmetics and personal care industry. For detailed audience demographics and reach statistics, please contact our team to obtain the latest media kit.",
      },
      {
        question: "Who do I contact to discuss an advertising partnership?",
        answer:
          "You can reach our advertising team at sriram@cosmetech.co.in or sales@cosmetech.co.in, or call us at +91 8879735111. We are happy to discuss bespoke packages tailored to your objectives.",
      },
    ],
  },
];

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <span className="type-paragraph-large-medium flex-1 leading-snug">
          {item.question}
        </span>
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-current transition-all duration-200">
          {isOpen ? (
            <Minus className="size-3.5" />
          ) : (
            <Plus className="size-3.5" />
          )}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="type-paragraph-large max-w-3xl pb-6 text-foreground/70">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqCategorySection({ category }: { category: FaqCategory }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[280px_1fr]">
      {/* Category label column */}
      <div className="flex flex-col gap-3">
        <span className="type-monospaced text-primary">{category.label}</span>
        <h2 className="type-heading-3 text-foreground">{category.title}</h2>
      </div>

      {/* Accordion column */}
      <div>
        {category.items.map((item, index) => (
          <FaqAccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </div>
  );
}

export function FaqPageContent() {
  return (
    <div className="mx-auto my-16 flex w-full max-w-6xl flex-col py-10 md:py-16">
      {/* Page header */}
      <div className="px-0 pb-12 md:px-8 lg:px-0">
        <p className="type-monospaced mb-3 text-primary">FAQ</p>
        <h1 className="type-heading-1 max-w-xl text-foreground">
          Frequently asked questions
        </h1>
      </div>

      <Separator />

      <section className="px-0 md:px-8 lg:px-0">
        {FAQ_CATEGORIES.map((category, index) => (
          <div key={category.id}>
            <FaqCategorySection category={category} />
            {index < FAQ_CATEGORIES.length - 1 && <Separator />}
          </div>
        ))}

        {/* CTA */}
        <div className="py-16">
          <Separator />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-10">
            <p className="type-paragraph-large text-foreground">
              Didn&apos;t find what you were looking for?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[18px] leading-6.75 text-primary underline"
            >
              Get in touch
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
