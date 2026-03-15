"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { InputGroup } from "@/components/ui/input-group";
import type { SearchResultItem, SearchResultType } from "@/app/api/search/route";

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

const RESULT_GROUPS: { label: string; types: SearchResultType[] }[] = [
  { label: "Articles", types: ["article"] },
  { label: "News & Press Releases", types: ["news", "pressRelease"] },
  { label: "Events", types: ["event"] },
];

function ResultGroup({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: SearchResultItem[];
  onSelect: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
        {label}
      </p>
      {items.map((result) => (
        <Link
          key={result.id}
          href={result.href}
          onClick={onSelect}
          className="flex items-center justify-between gap-4 px-4 py-2.5 hover:bg-muted/60 transition-colors group"
        >
          <span className="text-sm font-medium text-foreground truncate leading-snug group-hover:text-foreground">
            {result.title}
          </span>
          <span className="text-xs text-muted-foreground shrink-0 capitalize">
            {result.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

function SearchDropdown({
  searching,
  results,
  onSelect,
}: {
  searching: boolean;
  results: SearchResultItem[];
  onSelect: () => void;
}) {
  const hasResults = results.length > 0;

  return (
    <div className="py-1 max-h-[420px] overflow-y-auto divide-y divide-border/50">
      {searching && (
        <p className="px-4 py-3 text-sm text-muted-foreground">Searching…</p>
      )}

      {!searching && !hasResults && (
        <p className="px-4 py-3 text-sm text-muted-foreground">No results found</p>
      )}

      {!searching && hasResults && RESULT_GROUPS.map((group) => (
        <ResultGroup
          key={group.label}
          label={group.label}
          items={results.filter((r) => group.types.includes(r.type))}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export const Navbar = () => {
  const router = useRouter();
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Responsive search widths — avoids overflow at md
  const [searchWidth, setSearchWidth] = useState({ collapsed: 240, expanded: 460 });

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 1024) setSearchWidth({ collapsed: 180, expanded: 290 });
      else if (w < 1280) setSearchWidth({ collapsed: 210, expanded: 370 });
      else setSearchWidth({ collapsed: 240, expanded: 460 });
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // Desktop search
  const [desktopQuery, setDesktopQuery] = useState("");
  const [desktopFocused, setDesktopFocused] = useState(false);
  const [desktopResults, setDesktopResults] = useState<SearchResultItem[]>([]);
  const [desktopSearching, setDesktopSearching] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Mobile search
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileResults, setMobileResults] = useState<SearchResultItem[]>([]);
  const [mobileSearching, setMobileSearching] = useState(false);

  // Debounced fetch — desktop
  useEffect(() => {
    if (!desktopQuery.trim()) { setDesktopResults([]); return; }
    setDesktopSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(desktopQuery.trim())}`);
        const data = await res.json();
        setDesktopResults(data.results ?? []);
      } finally { setDesktopSearching(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [desktopQuery]);

  // Debounced fetch — mobile
  useEffect(() => {
    if (!mobileQuery.trim()) { setMobileResults([]); return; }
    setMobileSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(mobileQuery.trim())}`);
        const data = await res.json();
        setMobileResults(data.results ?? []);
      } finally { setMobileSearching(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [mobileQuery]);

  // Click outside — close desktop dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target as Node)) {
        setDesktopFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeDesktop = () => {
    setDesktopFocused(false);
    setDesktopQuery("");
    setDesktopResults([]);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileQuery("");
    setMobileResults([]);
  };

  const goToFirstResult = (results: SearchResultItem[]) => {
    if (results[0]) router.push(results[0].href);
  };

  const showDesktopDropdown = desktopFocused && desktopQuery.trim().length > 0;
  const showMobileResults = mobileOpen && mobileQuery.trim().length > 0;

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
            className="w-[130px] md:w-[180px] xl:w-[310px] h-auto object-contain"
          />
        </Link>

        {/* Desktop search — centered in remaining space */}
        <div
          ref={desktopRef}
          className="hidden flex-1 mx-8 md:flex items-center justify-center relative"
        >
          <motion.div
            className="relative"
            animate={{ width: desktopFocused ? searchWidth.expanded : searchWidth.collapsed }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <InputGroup className="relative shadow-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none z-10" />
              {!desktopQuery && (
                <div className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-sm text-foreground select-none">
                  Discover <span className="font-semibold">anything</span>
                </div>
              )}
              <Input
                type="search"
                value={desktopQuery}
                onChange={(e) => setDesktopQuery(e.target.value)}
                onFocus={() => setDesktopFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToFirstResult(desktopResults);
                  if (e.key === "Escape") closeDesktop();
                }}
                aria-label="Search"
                placeholder=""
                className="pl-12 rounded-full border-border bg-input py-7"
              />
            </InputGroup>

            {/* Dropdown */}
            <AnimatePresence>
              {showDesktopDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <SearchDropdown
                    searching={desktopSearching}
                    results={desktopResults}
                    onSelect={closeDesktop}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>

          <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-full border-border"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={12}
              className="w-[calc(100vw-3rem)] max-w-120 rounded-2xl border border-border bg-primary p-0 text-primary-foreground shadow-2xl ring-0"
            >
              <div className="rounded-t-2xl border-b border-border px-3 py-2">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                  <div aria-hidden="true" />
                  <span className="font-display text-2xl leading-none tracking-tight text-primary-foreground">
                    Cosmetech
                  </span>
                  <div className="justify-self-end">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-md border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                      aria-label="Close menu"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-8 px-6 py-8">
                <nav className="flex flex-col items-center gap-1 text-center">
                  {PRIMARY_NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-display text-[2.5rem] leading-none tracking-tight text-primary-foreground transition-opacity duration-200 hover:opacity-75"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="text-center">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/65">
                    Explore
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    {SECONDARY_NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs text-primary-foreground/90 transition-opacity duration-200 hover:opacity-70"
                        onClick={() => setMobileMenuOpen(false)}
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
      </div>

      {/* Mobile expandable search */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="md:hidden overflow-hidden border-b border-border"
          >
            <div className="px-6 py-3 flex flex-col gap-2">
              <div className="relative shadow-sm rounded-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { goToFirstResult(mobileResults); closeMobile(); }
                    if (e.key === "Escape") closeMobile();
                  }}
                  placeholder="Discover anything"
                  className="pl-9 rounded-full border-border bg-input"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {showMobileResults && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
                  >
                    <SearchDropdown
                      searching={mobileSearching}
                      results={mobileResults}
                      onSelect={closeMobile}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
