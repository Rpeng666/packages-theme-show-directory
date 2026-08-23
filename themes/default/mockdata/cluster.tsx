import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    gap: 3,
    children: (
      <div className="flex flex-wrap gap-3">
        <span className="rounded bg-gray-4 px-2 py-1 text-xs">one</span>
        <span className="rounded bg-gray-4 px-2 py-1 text-xs">two</span>
        <span className="rounded bg-gray-4 px-2 py-1 text-xs">three</span>
      </div>
    ),
  };
