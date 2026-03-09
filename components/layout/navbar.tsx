"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { InputGroup } from "@/components/ui/input-group";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
            {!desktopSearch && (
              <div className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-sm text-foreground peer-focus:opacity-0">
                Discover <span className="font-semibold">anything</span>
              </div>
            )}
            <Input
              type="search"
              value={desktopSearch}
              onChange={(e) => setDesktopSearch(e.target.value)}
              aria-label="Search"
              placeholder=""
              className="peer pl-12 rounded-full border-border bg-input py-7"
            />
          </InputGroup>
        </div>

        {/* Desktop hamburger */}
        <div className="hidden md:flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-14 rounded-full border-border cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="size-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 pt-8 px-2">
                <p>This is a temporary navbar</p>
                <Link
                  href="/"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  News
                </Link>
                <Link
                  href="/events"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
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
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 pt-8 px-2">
                <Link
                  href="/"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  News
                </Link>
                <Link
                  href="/events"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  Contact
                </Link>
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            {!mobileSearch && (
              <div className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground peer-focus:opacity-0">
                Discover <span className="font-semibold">anything</span>
              </div>
            )}
            <Input
              type="search"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              aria-label="Search"
              placeholder=""
              className="peer pl-9 rounded-full border-border bg-transparent"
              autoFocus={searchOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
