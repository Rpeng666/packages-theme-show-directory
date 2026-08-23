import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  toolbar: <div className="rounded border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">Toolbar</div>,
  left: <div className="rounded border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">Left panel</div>,
  center: <div className="flex h-40 items-center justify-center rounded border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">Canvas</div>,
  right: <div className="rounded border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">Inspector</div>,
  status: "Ready",
};
