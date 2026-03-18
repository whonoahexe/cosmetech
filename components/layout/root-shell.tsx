"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import type { SocialLink } from "@/sanity/lib/types";

type RootShellProps = {
  children: React.ReactNode;
  socialLinks?: SocialLink[];
};

export function RootShell({ children, socialLinks }: RootShellProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-14">{children}</div>
      <Footer socialLinks={socialLinks} />
    </>
  );
}
