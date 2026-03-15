"use client";

import { useEffect } from "react";

export function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "1");
    fetch("/api/articles/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
