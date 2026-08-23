import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  eyebrow: "Perler app",
  headline: "Turn any image into a bead pattern",
  subline: "Design, preview and export perler-bead patterns right in your browser.",
  storeLinks: [
    { href: "#", label: "App Store", icon: "apple" },
    { href: "#", label: "Google Play", icon: "android" },
  ],
  rows: [
    { titleKey: "row_pick", descriptionKey: "row_pick_desc", icon: <span className="text-xl">🖼️</span> },
    { titleKey: "row_tune", descriptionKey: "row_tune_desc", icon: <span className="text-xl">🎨</span> },
    { titleKey: "row_export", descriptionKey: "row_export_desc", icon: <span className="text-xl">📦</span> },
  ],
  featureTabs: [
    { id: "colors", labelKey: "colors", titleKey: "colors_title", descriptionKey: "colors_desc", bulletsKey: ["c1"], icon: <span className="text-xl">🎨</span> },
    { id: "export", labelKey: "export", titleKey: "export_title", descriptionKey: "export_desc", bulletsKey: ["e1"], icon: <span className="text-xl">📦</span> },
  ],
  finalCtaTitle: "Start creating",
  finalCtaSubtitle: "Free, no signup.",
  t: (key: string) => key,
};
