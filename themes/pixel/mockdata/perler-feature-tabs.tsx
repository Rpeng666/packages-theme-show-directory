import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  tabs: [
    {
      id: "colors",
      labelKey: "colors",
      titleKey: "colors_title",
      descriptionKey: "colors_desc",
      bulletsKey: ["c1", "c2"],
      icon: <span className="text-xl">🎨</span>,
    },
    {
      id: "patterns",
      labelKey: "patterns",
      titleKey: "patterns_title",
      descriptionKey: "patterns_desc",
      bulletsKey: ["p1"],
      icon: <span className="text-xl">🧩</span>,
    },
    {
      id: "export",
      labelKey: "export",
      titleKey: "export_title",
      descriptionKey: "export_desc",
      bulletsKey: ["e1"],
      icon: <span className="text-xl">📦</span>,
    },
  ],
  ariaLabel: "App features",
  t: (key: string) => key,
};
