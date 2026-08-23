import type { Section } from "@template/ui";


export const featuresSection = {
  id: "features",
  sr_only_title: "Features",
  title: "Everything you need",
  description: "A full set of landing blocks resolved through the registry.",
  items: [
    { title: "Data-driven", description: "Sections render from plain Section data.", icon: "sparkles" },
    { title: "Theme-able", description: "Each theme overrides any block.", icon: "palette" },
    { title: "Forwarders", description: "Blocks delegate to registered implementations.", icon: "refresh" },
    { title: "Fallback chain", description: "Missing blocks fall back to default.", icon: "shield" },
  ],
};

export const props = { section: featuresSection };
