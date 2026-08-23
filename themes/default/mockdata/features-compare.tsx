import type { Section } from "@template/ui";


export const featuresCompareSection = {
  id: "features-compare",
  title: "Compare themes",
  description: "Side-by-side feature comparison.",
  items: [
    { title: "Default", description: "shadcn-style primitives." },
    { title: "Pixel", description: "pxlkit chunky surfaces." },
    { title: "Semi", description: "HeroUI components." },
  ],
};

export const props = { section: featuresCompareSection };
