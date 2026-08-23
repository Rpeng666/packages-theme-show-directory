import type { Section } from "@template/ui";
import * as React from "react";

/** Grid — a CSS grid container driven by the cols/gap props. */
const cell = (title: string, desc: string) => (
  <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
    <span className="text-sm font-semibold text-foreground">{title}</span>
    <span className="text-xs text-muted-foreground">{desc}</span>
  </div>
);

export const props = {
  cols: { base: 1, sm: 2, md: 3 },
  gap: 4,
  children: (
    <>
      {cell("Theme registry", "The filesystem is the registry.")}
      {cell("Forwarders", "Blocks delegate to implementations.")}
      {cell("Fallback chain", "Requested → default → any.")}
      {cell("Theme-able", "Each theme overrides blocks.")}
      {cell("Data-driven", "Sections render from Section data.")}
      {cell("Open source", "Drop a file to register.")}
    </>
  ),
};
