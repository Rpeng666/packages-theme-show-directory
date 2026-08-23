import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  section: {
    id: "showcases-flow",
    title: "Showcases",
    description: "Filter projects by category.",
    groups: [
      { id: "all", label: "All" },
      { id: "apps", label: "Apps" },
      { id: "websites", label: "Websites" },
    ],
    items: [
      { id: "s1", title: "Pixel App", description: "Built with pxlkit", group: "apps", url: "#" },
      { id: "s2", title: "Retro Site", description: "Pixel landing", group: "websites", url: "#" },
      { id: "s3", title: "Game Shell", description: "Arcade UI", group: "apps", url: "#" },
    ],
  },
};
