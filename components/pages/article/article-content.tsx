"use client";

import { useEffect, useRef, useState } from "react";
import { PortableTextBody } from "@/components/shared/portable-text-body";

type ArticleContentProps = {
  body?: unknown[] | null;
};

export function ArticleContent({ body }: ArticleContentProps) {
  const [progress, setProgress] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = bodyRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = window.scrollY + rect.top;
      const end = start + el.offsetHeight - viewport;
      const current = window.scrollY;

      if (end <= start) {
        setProgress(100);
        return;
      }

      const raw = ((current - start) / (end - start)) * 100;
      setProgress(Math.max(0, Math.min(100, raw)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="lg:hidden sticky top-0 z-40 h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div ref={bodyRef}>
        <PortableTextBody value={body} />
      </div>
    </>
  );
}
