import type { Section } from "@template/ui";


export const featuresAccordionSection = {
  id: "features-accordion",
  title: "FAQ-ish features",
  description: "Expandable rows for detailed copy.",
  items: [
    { title: "What is the registry?", description: "The filesystem is the registry — drop a file and it resolves." },
    { title: "How do themes fall back?", description: "Requested theme → default → any theme → empty." },
    { title: "Can I mix themes?", description: "Yes — resolve any component for any theme." },
  ],
};

export const props = { section: featuresAccordionSection };
