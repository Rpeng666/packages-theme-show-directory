import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    cols: 3,
    gap: 3,
    children: (
      <div className="grid grid-cols-3 gap-3">
        <div className="h-12 rounded bg-gray-4" />
        <div className="h-12 rounded bg-gray-4" />
        <div className="h-12 rounded bg-gray-4" />
      </div>
    ),
  };
