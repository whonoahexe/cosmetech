"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ArticleSection = {
  id: string;
  label: string;
  paragraphs: string[];
};

type ArticleContentProps = {
  sections: ArticleSection[];
};

const NAV_TICK_COUNT = 19;

export function ArticleContent({ sections }: ArticleContentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeTick = Math.round(
    (activeIndex / Math.max(sections.length - 1, 1)) * (NAV_TICK_COUNT - 1)
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
    <>
      <div className="lg:hidden sticky top-0 z-40 h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-12" ref={bodyRef}>
        {sections.map((section, index) => (
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

      {/* <aside className="hidden lg:block absolute right-0 top-20">
        <div className="sticky top-40 flex h-126 w-9">
          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            {Array.from({ length: NAV_TICK_COUNT }).map((_, tickIndex) => {
              const mappedSectionIndex = Math.round(
                (tickIndex / Math.max(NAV_TICK_COUNT - 1, 1)) * (sections.length - 1)
              );
              const mappedSection = sections[mappedSectionIndex];

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
    </>
  );
}
