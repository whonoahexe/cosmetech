import type { CategoryCardData } from "@/components/pages/home/category-card";
import type { EventCardData } from "@/components/pages/home/event-card";

export const FALLBACK_CATEGORIES: CategoryCardData[] = [
  {
    name: "Ingredients & Formulation",
    description: "Raw materials, actives, and the science behind what goes into every product.",
    slug: "ingredients-formulation",
  },
  {
    name: "Fragrance",
    description: "The art and chemistry of scent, from raw materials to the finished bottle.",
    slug: "fragrance",
  },
  {
    name: "Packaging",
    description: "Design, materials, and sustainability shaping the future of cosmetic packaging.",
    slug: "packaging",
  },
  {
    name: "R&D",
    description: "Research, clinical testing, and innovations powering the next generation of formulas.",
    slug: "r-and-d",
  },
  {
    name: "Regulations",
    description: "Compliance, safety standards, and global frameworks every brand must navigate.",
    slug: "regulations",
  },
  {
    name: "Springboard",
    description: "Startups, new launches, and emerging ideas shaping the industry.",
    slug: "springboard",
  },
  {
    name: "Marketing",
    description: "Brand strategy, consumer trends, and the business of beauty.",
    slug: "marketing",
  },
  {
    name: "AI & Technology",
    description: "How machine learning, automation, and digital tools are reshaping the cosmetics space.",
    slug: "ai-technology",
  },
];

/** Map from Sanity category ref ID slug to display name */
export const CATEGORY_REF_TO_NAME: Record<string, string> = {
  "ingredients-formulation": "Ingredients & Formulation",
  "fragrance": "Fragrance",
  "packaging": "Packaging",
  "r-and-d": "R&D",
  "regulations": "Regulations",
  "springboard": "Springboard",
  "marketing": "Marketing",
  "ai-technology": "AI & Technology",
};

export const PLACEHOLDER_EVENTS: EventCardData[] = [
  {
    title: "Cosmetech Formulation Summit 2026",
    location: "Mumbai",
    date: "19 March 2026",
    category: "conference",
    href: "/events",
  },
  {
    title: "Fragrance & Sensory Forum",
    location: "Dubai",
    date: "12 April 2026",
    category: "workshop",
    href: "/events",
  },
  {
    title: "Sustainable Packaging",
    location: "Singapore",
    date: "6 May 2026",
    category: "expo",
    href: "/events",
  },
  {
    title: "BeautyTech & AI Innovation Expo",
    location: "Bengaluru",
    date: "22 June 2026",
    isSponsored: true,
    category: "expo",
    href: "/events",
  },
  {
    title: "Regulatory & Compliance Workshop: Asia-Pacific",
    location: "Virtual",
    date: "19 March 2026",
    isVirtual: true,
    category: "webinar",
    href: "/events",
  },
];
