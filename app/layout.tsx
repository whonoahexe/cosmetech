import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RootShell } from "@/components/layout";
import { getSiteSettings } from "@/sanity/lib/loaders";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmetech.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cosmetech",
  description: "Leading B2B cosmetics magazine and resource for industry professionals in Asia.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  verification: {
    google: "ckpbXA7tZkgxB9hjVKgkOMtHpsajPreJjgtKb3Go5cE",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={cn("font-body")}>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} antialiased`}
      >
        <RootShell socialLinks={settings?.socialLinks}>{children}</RootShell>
      </body>
    </html>
  );
}
