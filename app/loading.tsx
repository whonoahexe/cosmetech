"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

function ProgressBar() {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.body;
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--primary)] z-[9999] origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 0.35, 0.6, 0.75, 0.88] }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 0.8, 1],
      }}
    />,
    document.body
  );
}

export default function Loading() {
  return (
    <>
      <ProgressBar />

      {/* Page skeleton */}
      <div className="py-6 space-y-6 animate-pulse">
        {/* Hero / carousel placeholder */}
        <div className="w-full aspect-[16/7] rounded-2xl bg-[var(--muted)]" />

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-[3/2] rounded-xl bg-[var(--muted)]" />
              <div className="h-3 w-1/4 rounded-full bg-[var(--muted)]" />
              <div className="h-5 w-full rounded-md bg-[var(--muted)]" />
              <div className="h-3 w-3/4 rounded-full bg-[var(--muted)]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
