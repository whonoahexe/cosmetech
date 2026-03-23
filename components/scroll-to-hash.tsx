"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = decodeURIComponent(hash.slice(1));
      const selector = `#${CSS.escape(targetId)}`;
      const el = document.querySelector(selector);
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Try immediately, then retry briefly for cases where the target mounts after transitions.
    scrollToCurrentHash();
    const retryA = window.setTimeout(scrollToCurrentHash, 80);
    const retryB = window.setTimeout(scrollToCurrentHash, 220);

    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => {
      window.clearTimeout(retryA);
      window.clearTimeout(retryB);
      window.removeEventListener("hashchange", scrollToCurrentHash);
    };
  }, [pathname]);

  return null;
}
