import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    type: "single",
    defaultValue: "bold",
    children: (
      <div className="flex gap-2">
        <button className="rounded border px-3 py-1 text-sm">Bold</button>
        <button className="rounded border px-3 py-1 text-sm">Italic</button>
      </div>
    ),
  };
