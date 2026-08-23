import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  section: {
    id: "features-flow",
    title: "Flow",
    description: "A step-by-step feature walkthrough.",
    items: [
      { title: "Define", description: "Shape your Section data.", icon: "pencil" },
      { title: "Render", description: "Forward it through a block.", icon: "monitor" },
      { title: "Ship", description: "Theme it however you like.", icon: "rocket" },
    ],
  },
};
