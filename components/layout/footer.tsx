import Link from "next/link";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "News", href: "/news" },
  { label: "Sponsored", href: "/sponsored" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

const COMPANY_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Advertise With Us", href: "/advertise" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground px-6 md:px-14 py-28 mt-12">
      {/* 8-col grid */}
      <div className="grid grid-cols-8 gap-5 h-full min-h-144">
        {/* Col 1–4: Brand + copyright */}
        <div className="col-span-4 flex flex-col justify-between">
          <Link href="/" className="select-none shrink-0">
            <Image
              src="/brand.svg"
              alt="Cosmetech Logo"
              width={640}
              height={96}
              className="object-contain"
            />
          </Link>
          <p className="type-paragraph-large-medium">
            © 2026. COSMETECH, INC. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Col 5–6: Nav links + FAQ + Socials */}
        <div className="col-span-2 flex flex-col justify-between">
          {/* Nav */}
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-paragraph-large-medium hover:opacity-70 transition-opacity uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* FAQ */}
          <Link
            href="/faq"
            className="type-paragraph-large-medium hover:opacity-70 transition-opacity uppercase"
          >
            FAQ
          </Link>

          {/* Socials */}
          <ul className="flex flex-col gap-1">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-paragraph-large-medium hover:opacity-70 transition-opacity uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 7–8: Company links, newsletter, legal */}
        <div className="col-span-2 flex flex-col justify-between">
          {/* Company links */}
          <ul className="flex flex-col gap-1">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-paragraph-large-medium hover:opacity-70 transition-opacity uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Newsletter */}
          <div className="flex flex-col gap-2">
            <p className="type-paragraph-large-medium uppercase">
              Stay in touch | Subscribe to our newsletter
            </p>
            <InputGroup className="bg-input border-border h-15 rounded-lg">
              <InputGroupAddon align="inline-start">
                <Mail className="size-6 text-muted-foreground pr-2" />
              </InputGroupAddon>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                aria-label="Newsletter email"
              />
            </InputGroup>
          </div>

          {/* Legal */}
          <ul className="flex flex-col gap-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-paragraph-large-medium hover:opacity-70 transition-opacity uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
