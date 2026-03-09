"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ArticleCard, type ArticleCardData } from "@/components/pages/home/article-card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type ArticleSection = {
  id: string;
  label: string;
  paragraphs: string[];
};

const ARTICLE_SECTIONS: ArticleSection[] = [
  {
    id: "p1",
    label: "Section 1",
    paragraphs: [
      "People don't search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational.",
    ],
  },
  {
    id: "p2",
    label: "Section 2",
    paragraphs: [
      "I keep opening analytics dashboards like they're going to confess something. Organic search still sends traffic, sure. But the vibe shifted. Queries look less like caveman keyword stacks and more like late-night DMs. Full sentences. Context. Opinions baked in. Users treating the internet like a colleague who owes them a thoughtful reply. The search bar used to be a vending machine. Now it's a chat window with trust issues.",
    ],
  },
  {
    id: "p3",
    label: "Section 3",
    paragraphs: [
      "This isn't just a UX tweak. It's a cognitive rewrite. For twenty years we trained ourselves to think like robots so robots could find stuff for us. Strip verbs. Drop articles. Jam nouns together. best laptop 2024 budget student. We all became weirdly fluent in keyword pidgin. Then chat-first interfaces showed up and people snapped back into human language overnight. Turns out nobody wanted to think like a parser. We just tolerated it.",
    ],
  },
  {
    id: "p4",
    label: "Section 4",
    paragraphs: [
      "Asking is different from searching. Searching assumes the answer exists somewhere static and indexed. Asking assumes the answer might need synthesis. Interpretation. Maybe even judgment. When someone asks an AI or a community thread, they're not just retrieving data. They're outsourcing thinking. That's a huge shift in how authority gets constructed online. The top result used to win. Now the most convincing response wins. And convincing is messy. It's tone, clarity, relevance, timing, social proof. Sometimes it's just whoever replied first with decent formatting and a strong opinion.",
    ],
  },
  {
    id: "p5",
    label: "Section 5",
    paragraphs: [
      "Forums are weirdly back from the dead because of this. Reddit, Discord servers, private Slack groups, niche communities. People want answers from entities that feel situated. A search result feels anonymous. A reply feels accountable, even when it isn't. You ask a question in a group chat and someone who has been burned by the exact same problem gives you a story plus a solution. That hits differently than a 2,000-word SEO article that opens with a definition you didn't need.",
    ],
  },
  {
    id: "p6",
    label: "Section 6",
    paragraphs: [
      "Forums are weirdly back from the dead because of this. Reddit, Discord servers, private Slack groups, niche communities. People want answers from entities that feel situated. A search result feels anonymous. A reply feels accountable, even when it isn't. You ask a question in a group chat and someone who has been burned by the exact same problem gives you a story plus a solution. That hits differently than a 2,000-word SEO article that opens with a definition you didn't need.",
    ],
  },
  {
    id: "p7",
    label: "Section 7",
    paragraphs: [
      "AI slots right into this behavioral groove. It feels like a supercharged forum where the replies are instant and the thread never derails into keyboard warfare. You ask for recommendations, clarifications, step-by-step help. You refine. You push back. You iterate. It's a conversation, not a query. The mental model shifts from find the page to work through the problem. That's sticky. Once people get used to that loop, going back to ten blue links feels like using a map after GPS spoiled you.",
    ],
  },
  {
    id: "p8",
    label: "Section 8",
    paragraphs: [
      "From an editorial and publishing standpoint, this is both terrifying and kind of exciting. The old playbook was simple. Pick keywords. Structure content to rank. Win the snippet. Capture traffic. Monetize attention. Now traffic leaks into chat interfaces where attribution is fuzzy and brand visibility gets abstracted. Your article might inform an AI answer without anyone ever seeing your logo. Brutal. Also kind of inevitable.",
    ],
  },
];

const NAV_TICK_COUNT = 19;

const PROMO_ARTICLE: ArticleCardData = {
  title: "Minimalism Was a Phase. We Want Texture Again",
  excerpt:
    "Clean design ruled for a decade. Now people want personality, clutter, and interfaces that feel human.",
  category: "Regulations",
  isSponsored: true,
  readTime: 6,
  image: null,
};

export function ArticlePageContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeTick = Math.round(
    (activeIndex / Math.max(ARTICLE_SECTIONS.length - 1, 1)) * (NAV_TICK_COUNT - 1)
  );

  useEffect(() => {
    const onScroll = () => {
      const body = bodyRef.current;
      if (!body) return;

      const rect = body.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = window.scrollY + rect.top;
      const end = start + body.offsetHeight - viewport;
      const current = window.scrollY;

      if (end <= start) {
        setProgress(100);
        return;
      }

      const raw = ((current - start) / (end - start)) * 100;
      const clamped = Math.max(0, Math.min(100, raw));
      setProgress(clamped);

      const pivot = current + viewport * 0.35;
      let nextActive = 0;
      for (let i = 0; i < sectionRefs.current.length; i += 1) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (pivot >= top) nextActive = i;
      }
      setActiveIndex(nextActive);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id: string, index: number) => {
    setActiveIndex(index);
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col mt-4 gap-4 mb-32">
      <div className="lg:hidden sticky top-0 z-40 h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="py-4">
        <div className="h-65 w-full rounded-3xl bg-[#D9D9D9] md:h-105 lg:h-150" />
      </section>

      <section className="flex flex-col items-center gap-3 py-8 text-center">
        <h1 className="type-heading-2 text-foreground">Search Is Dead. Long Live Asking.</h1>
        <p className="type-paragraph-medium max-w-130 text-muted-foreground">
          People do not search anymore. They ask. AI, forums, group chats. Information retrieval
          just turned conversational.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="default">Fragrance</Badge>
          <span className="type-paragraph text-foreground">&bull;</span>
          <span className="type-paragraph-mini text-muted-foreground whitespace-nowrap">
            6 min read
          </span>
        </div>
      </section>

      <section className="relative py-16 lg:px-32 xl:px-64" ref={bodyRef}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-center gap-8">
            <Breadcrumb>
              <BreadcrumbList className="type-monospaced text-primary text-[30px]! leading-6 tracking-[-1.4px]">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/categories">Categories</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/categories">Fragrance</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary text-[30px] [&>svg]:hidden">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="type-monospaced text-primary text-[30px]!">
                    01
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Button
              variant="outline"
              className="rounded-full border-primary px-3 text-primary w-16"
            >
              <Sparkles className="size-4" />
            </Button>
          </div>

          <div className="lg:pr-20 pt-16">
            <div className="space-y-12">
              {ARTICLE_SECTIONS.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className="scroll-mt-28 space-y-6"
                >
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={`${section.id}-${pIndex}`}
                      className="type-paragraph-large text-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <Separator className="my-16" />

            <ArticleCard
              {...PROMO_ARTICLE}
              variant="list"
              className="[&_h3]:text-primary"
              showSeparator={false}
            />
          </div>
        </div>

        {/* <aside className="hidden lg:block absolute right-0 top-20">
          <div className="sticky top-40 flex h-126 w-9">
            <div className="relative z-10 flex h-full w-full flex-col justify-between">
              {Array.from({ length: NAV_TICK_COUNT }).map((_, tickIndex) => {
                const mappedSectionIndex = Math.round(
                  (tickIndex / Math.max(NAV_TICK_COUNT - 1, 1)) * (ARTICLE_SECTIONS.length - 1)
                );
                const mappedSection = ARTICLE_SECTIONS[mappedSectionIndex];

                return (
                  <button
                    key={`tick-${tickIndex}`}
                    type="button"
                    onClick={() => scrollToSection(mappedSection.id, mappedSectionIndex)}
                    aria-label={`Jump to ${mappedSection.label}`}
                    className={cn(
                      "h-0.5 w-full rounded-full transition-all duration-200",
                      activeTick === tickIndex ? "bg-border" : "bg-border/25 hover:bg-border/60"
                    )}
                  />
                );
              })}
            </div>
          </div>
        </aside> */}
      </section>
    </div>
  );
}
