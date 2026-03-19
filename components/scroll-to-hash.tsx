"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}
