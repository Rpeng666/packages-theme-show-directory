import type { Section } from "@template/ui";
import * as React from "react";

/** Stack — a flex container driven by direction/gap/align/justify. */
const item = (title: string, desc: string, emoji: string) => (
  <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm">
      {emoji}
    </span>
    <div className="min-w-0">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  </div>
);

export const props = {
  direction: "col" as const,
  gap: 3,
  className: "w-full max-w-md",
  children: (
    <>
      {item("Direction", "flex-col stacks children vertically", "↕️")}
      {item("Gap", "gap-3 spaces items evenly", "↔️")}
      {item("Align / justify", "items and distribution control", "🎯")}
      {item("Wrap & inline", "responsive wrapping for clusters", "🪢")}
    </>
  ),
};
