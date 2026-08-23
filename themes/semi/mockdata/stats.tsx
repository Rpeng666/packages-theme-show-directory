import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  section: {
    id: "stats",
    title: "By the numbers",
    items: [
      { title: "128", description: "AI tasks" },
      { title: "3.4M", description: "Tokens" },
      { title: "98%", description: "Satisfaction" },
    ],
  },
};
