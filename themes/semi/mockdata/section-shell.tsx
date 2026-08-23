import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  id: "shell",
  padding: "md" as const,
  background: "default" as const,
  children: (
    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
      Section body
    </div>
  ),
};
