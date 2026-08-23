import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  title: "Adjustments",
  icon: "sliders",
  onCollapse: () => {},
  action: <span className="text-xs text-muted-foreground">Reset</span>,
  children: (
    <div className="space-y-2 text-xs text-muted-foreground">
      <div>Brightness — 65</div>
      <div>Contrast — 80</div>
    </div>
  ),
};
