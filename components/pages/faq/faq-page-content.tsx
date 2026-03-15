"use client";

import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { PortableTextBody } from "@/components/shared/portable-text-body";

type FaqItem = {
  question: string;
  answer?: unknown[];
};

type FaqCategory = {
  id: string;
  label: string;
  title: string;
  items: FaqItem[];
};

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
          <div className="max-w-3xl pb-6 text-foreground/70">
            <PortableTextBody value={item.answer} />
          </div>
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

type FaqPageContentProps = {
  categories: FaqCategory[];
};

export function FaqPageContent({ categories }: FaqPageContentProps) {
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
        {categories.map((category, index) => (
          <div key={category.id}>
            <FaqCategorySection category={category} />
            {index < categories.length - 1 && <Separator />}
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
