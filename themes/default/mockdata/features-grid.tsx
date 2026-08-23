import type { Section } from "@template/ui";


export const featuresGridSection = {
  id: "features-grid",
  title: "Feature grid",
  description: "A responsive grid of features.",
  items: [
    { title: "Fast", description: "Rendered server-side, hydrated instantly.", icon: "zap" },
    { title: "Portable", description: "Package owns no Next dependency.", icon: "package" },
    { title: "Typed", description: "Contracts give full autocomplete.", icon: "type" },
  ],
};

export const props = { section: featuresGridSection };
