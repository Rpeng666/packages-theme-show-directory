import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  tipsTitle: "Tips",
  tips: [
    { scene: "feed", label: "Check the feed scene" },
    { scene: "search", label: "Try the search layout" },
    { href: "#", label: "Read the docs" },
  ],
  scene: "feed",
  onSceneChange: () => {},
};
