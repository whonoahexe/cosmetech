// Gradients built exclusively from the site's blue/orange design-system palette.
// Static string literals so Tailwind v4 can scan and emit the classes.

const DARK_GRADIENTS = [
  "from-blue-900 to-blue-700",
  "from-orange-900 to-orange-700",
  "from-blue-800 to-blue-600",
  "from-orange-800 to-orange-600",
  "from-blue-950 to-blue-800",
  "from-blue-700 to-orange-800",
  "from-orange-700 to-blue-800",
  "from-blue-800 to-orange-700",
];

const LIGHT_GRADIENTS = [
  "from-blue-50 to-blue-100",
  "from-orange-50 to-orange-100",
  "from-blue-50 to-orange-100",
  "from-orange-50 to-blue-100",
  "from-blue-100 to-blue-200",
  "from-orange-100 to-orange-200",
  "from-blue-50 to-blue-200",
  "from-orange-50 to-orange-200",
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Dark brand gradient — for image placeholder areas (no text directly on it) */
export function darkGradient(seed: string): string {
  return `bg-gradient-to-br ${DARK_GRADIENTS[hash(seed) % DARK_GRADIENTS.length]}`;
}

/** Subtle light gradient — for card backgrounds with text on top */
export function lightGradient(seed: string): string {
  return `bg-gradient-to-br ${LIGHT_GRADIENTS[hash(seed) % LIGHT_GRADIENTS.length]}`;
}
