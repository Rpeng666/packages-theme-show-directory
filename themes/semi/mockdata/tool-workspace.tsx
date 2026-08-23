import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  title: "Workspace",
  badge: <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand">Beta</span>,
  footer: <span className="text-xs text-muted-foreground">Footer note</span>,
  children: (
    <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
      Workspace body
    </div>
  ),
};
