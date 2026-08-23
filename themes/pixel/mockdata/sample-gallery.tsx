import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  items: [
    { id: "s1", name: "Cat", image: <div className="h-16 w-16 rounded bg-muted" /> },
    { id: "s2", name: "Dog", image: <div className="h-16 w-16 rounded bg-muted" /> },
    { id: "s3", name: "Flower", image: <div className="h-16 w-16 rounded bg-muted" /> },
  ],
  onSelect: () => {},
  onUpload: () => {},
  label: "Samples",
  t: (key: string) => key,
};
