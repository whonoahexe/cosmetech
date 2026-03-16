"use client";

import { createPortal } from "react-dom";
import { motion } from "motion/react";

function ProgressBar() {
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

      <div className="flex items-center justify-center min-h-[70vh] gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </>
  );
}
