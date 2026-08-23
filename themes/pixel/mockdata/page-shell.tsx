import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  header: {
    brand: "Pixel App",
    nav: [
      { title: "Home", url: "#" },
      { title: "Features", url: "#" },
      { title: "Pricing", url: "#" },
    ],
  },
  children: (
    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
      Page content goes here
    </div>
  ),
};
