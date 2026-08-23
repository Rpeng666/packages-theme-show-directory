import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  cards: [
    { id: "c1", title: "Template 1", thumbnail: "" },
    { id: "c2", title: "Template 2", thumbnail: "" },
    { id: "c3", title: "Template 3", thumbnail: "" },
  ],
  onPick: () => {},
  hint: "Pick a template",
  t: (key: string) => key,
};
