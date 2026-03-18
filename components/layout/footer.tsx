import Link from "next/link";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import Image from "next/image";
import type { SocialLink } from "@/sanity/lib/types";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "News", href: "/news" },
  { label: "Sponsored", href: "/articles?sort=Latest" },
];

const COMPANY_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Advertise With Us", href: "/contact#advertise" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: "Facebook", label: "Facebook", href: "https://facebook.com" },
  { platform: "Instagram", label: "Instagram", href: "https://instagram.com" },
  { platform: "LinkedIn", label: "LinkedIn", href: "https://linkedin.com" },
  { platform: "Twitter", label: "Twitter", href: "https://twitter.com" },
];

type FooterProps = {
  socialLinks?: SocialLink[];
};

export const Footer = ({ socialLinks }: FooterProps) => {
  const links = socialLinks && socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL_LINKS;

  return (
    <footer className="w-full bg-primary text-primary-foreground px-6 md:px-14 py-12 xl:py-28 mt-12">
      {/* 1-col (mobile) → 2-col (sm) → 4-2-2 (xl) */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-8 xl:gap-5 xl:min-h-144">
        {/* Brand + copyright — full-width until xl */}
        <div className="col-span-full sm:col-span-2 xl:col-span-4 flex flex-col justify-between gap-8 xl:gap-0">
          <div className="flex flex-col gap-6">
            <Link href="/" className="select-none">
              <Image
                src="/brand.svg"
                alt="Cosmetech Logo"
                width={640}
                height={96}
                className="h-auto w-36 sm:w-48 xl:w-120 object-contain brightness-0 invert"
              />
            </Link>
          </div>
          <p className="type-paragraph-small text-primary-foreground/50 uppercase tracking-wider">
            © 2026 Cosmetech, Inc. All rights reserved.
          </p>
        </div>

        {/* Nav + FAQ + Socials */}
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-8 xl:justify-between xl:gap-0">
          <div className="flex flex-col gap-1">
            <p className="type-paragraph-mini uppercase tracking-widest text-primary-foreground/50 mb-2">
              Navigate
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-paragraph-medium hover:opacity-70 transition-opacity uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/faq"
              className="type-paragraph-medium uppercase hover:opacity-70 transition-opacity mt-1"
            >
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <p className="type-paragraph-mini uppercase tracking-widest text-primary-foreground/50 mb-2">
              Follow Us
            </p>
            {links.map((link) => (
              <Link
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="type-paragraph-medium hover:opacity-70 transition-opacity uppercase"
              >
                {link.label ?? link.platform}
              </Link>
            ))}
          </div>
        </div>

        {/* Company + Newsletter + Legal */}
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-8 xl:justify-between xl:gap-0">
          <div className="flex flex-col gap-1">
            <p className="type-paragraph-mini uppercase tracking-widest text-primary-foreground/50 mb-2">
              Company
            </p>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-paragraph-medium hover:opacity-70 transition-opacity uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="type-paragraph-mini uppercase tracking-widest text-primary-foreground/50">
              Newsletter
            </p>
            <p className="type-paragraph-small text-primary-foreground/70">
              Stay in the loop with the latest industry news.
            </p>
            <InputGroup className="bg-input border-border rounded-lg">
              <InputGroupAddon align="inline-start">
                <Mail className="size-5 text-muted-foreground pr-1.5" />
              </InputGroupAddon>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                aria-label="Newsletter email"
              />
            </InputGroup>
          </div>

          <div className="flex flex-col gap-1">
            <p className="type-paragraph-mini uppercase tracking-widest text-primary-foreground/50 mb-2">
              Legal
            </p>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-paragraph-small hover:opacity-70 transition-opacity uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
