export type FixedCategoryDefinition = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
};

export const fixedCategories: FixedCategoryDefinition[] = [
  {
    documentId: "category.ingredients-formulation",
    title: "Ingredients & Formulation",
    slug: "ingredients-formulation",
    description: "Raw materials, actives, and the science behind what goes into every product.",
  },
  {
    documentId: "category.fragrance",
    title: "Fragrance",
    slug: "fragrance",
    description: "The art and chemistry of scent, from raw materials to the finished bottle.",
  },
  {
    documentId: "category.packaging",
    title: "Packaging",
    slug: "packaging",
    description: "Design, materials, and sustainability shaping the future of cosmetic packaging.",
  },
  {
    documentId: "category.r-and-d",
    title: "R&D",
    slug: "r-and-d",
    description: "Research, clinical testing, and innovations powering the next generation of formulas.",
  },
  {
    documentId: "category.regulations",
    title: "Regulations",
    slug: "regulations",
    description: "Compliance, safety standards, and global frameworks every brand must navigate.",
  },
  {
    documentId: "category.springboard",
    title: "Springboard",
    slug: "springboard",
    description: "Startups, new launches, and emerging ideas shaping the industry.",
  },
  {
    documentId: "category.marketing",
    title: "Marketing",
    slug: "marketing",
    description: "Brand strategy, consumer trends, and the business of beauty.",
  },
  {
    documentId: "category.ai-technology",
    title: "AI & Technology",
    slug: "ai-technology",
    description: "How machine learning, automation, and digital tools are reshaping the cosmetics space.",
  },
];

export const fixedCategoryDocumentIds = fixedCategories.map((category) => category.documentId);