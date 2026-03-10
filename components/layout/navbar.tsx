"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { InputGroup } from "@/components/ui/input-group";

const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SECONDARY_NAV_LINKS = [
  { href: "/categories", label: "Categories" },
  { href: "/contact#advertise", label: "Advertise with us" },
  { href: "/faq", label: "Frequently Asked Questions" },
];

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  iconClassName: string;
  placeholderClassName: string;
  inputClassName: string;
  autoFocus?: boolean;
};

const SearchBar = ({
  value,
  onChange,
  iconClassName,
  placeholderClassName,
  inputClassName,
  autoFocus,
}: SearchBarProps) => (
  <>
    <Search
      className={cn(
        "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
        iconClassName
      )}
    />
    {!value && (
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm peer-focus:opacity-0",
          placeholderClassName
        )}
      >
        Discover <span className="font-semibold">anything</span>
      </div>
    )}
    <Input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search"
      placeholder=""
      className={cn("peer", inputClassName)}
      autoFocus={autoFocus}
    />
  </>
);

export const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-6 md:px-14 py-5">
        {/* Logo */}
        <Link href="/" className="select-none shrink-0">
          <Image
            src="/brand.svg"
            alt="Cosmetech Logo"
            width={310}
            height={48}
            className="object-contain"
          />
        </Link>

        {/* Desktop search */}
        <div className="hidden flex-1 max-w-sm mx-8 md:flex items-center">
          <InputGroup className="relative w-60 shadow-2xl">
            <SearchBar
              value={desktopSearch}
              onChange={setDesktopSearch}
              iconClassName="left-4 size-5"
              placeholderClassName="left-12 text-foreground"
              inputClassName="pl-12 rounded-full border-border bg-input py-7"
            />
          </InputGroup>
        </div>

        {/* Desktop hamburger */}
        <div className="hidden md:flex items-center gap-3">
          <DropdownMenu open={desktopMenuOpen} onOpenChange={setDesktopMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-14 rounded-full border-border cursor-pointer"
                aria-label={desktopMenuOpen ? "Close menu" : "Open menu"}
              >
                {desktopMenuOpen ? (
                  <X className="size-5 text-foreground" />
                ) : (
                  <Menu className="size-5 text-foreground" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={14}
              className="w-120 rounded-2xl border border-border bg-primary p-0 text-primary-foreground shadow-2xl ring-0 mt-4"
            >
              <div className="rounded-3xl border-b border-border px-4 py-2">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                  <div aria-hidden="true" />
                  <span className="font-display text-3xl leading-none tracking-tight text-primary-foreground">
                    Cosmetech
                  </span>
                </div>
              </div>

              <div className="space-y-12 px-10 py-12">
                <nav className="flex flex-col items-center gap-1 text-center">
                  {PRIMARY_NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-display text-5xl leading-none tracking-tight text-primary-foreground transition-opacity duration-200 hover:opacity-75"
                      onClick={() => setDesktopMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="text-center">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/65">
                    Explore
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    {SECONDARY_NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm text-primary-foreground/90 transition-opacity duration-200 hover:opacity-70"
                        onClick={() => setDesktopMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-full"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-full border-border"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72" title="Mobile navigation menu">
              <nav className="flex flex-col gap-4 pt-8 px-2">
                {PRIMARY_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile expandable search */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200",
          searchOpen ? "max-h-16 border-b border-border" : "max-h-0"
        )}
      >
        <div className="px-6 py-3">
          <div className="relative shadow-2xl rounded-full">
            <SearchBar
              value={mobileSearch}
              onChange={setMobileSearch}
              iconClassName="left-3 size-4"
              placeholderClassName="left-9 text-muted-foreground"
              inputClassName="pl-9 rounded-full border-border bg-transparent"
              autoFocus={searchOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
