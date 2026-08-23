import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  section: {
    id: "features-list",
    title: "Feature list",
    description: "A column of features with icons.",
    items: [
      { title: "Theme-able", description: "Each theme overrides blocks." },
      { title: "Data-driven", description: "Sections render from Section data." },
      { title: "Typed contracts", description: "Full autocomplete for props." },
    ],
  },
};
