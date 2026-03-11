"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

type RootShellProps = {
  children: React.ReactNode;
};

export function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-14">{children}</div>
      <Footer />
    </>
  );
}
