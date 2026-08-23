import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  items: [
    {
      id: "layers",
      icon: "layers",
      label: "Layers",
      render: () => (
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>Background</div>
          <div>Shape</div>
        </div>
      ),
    },
    {
      id: "colors",
      icon: "palette",
      label: "Colors",
      render: () => (
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>Primary — #7c4fff</div>
          <div>Secondary — #4ecdc4</div>
        </div>
      ),
    },
    {
      id: "export",
      icon: "download",
      label: "Export",
      render: () => (
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>PNG · 4×</div>
          <div>WebP · 2×</div>
        </div>
      ),
    },
  ],
  activeId: "colors",
  onItemSelect: () => {},
};
