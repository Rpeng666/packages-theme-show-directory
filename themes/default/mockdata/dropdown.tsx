import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    trigger: <span className="text-sm font-medium">Actions</span>,
    items: [
      { value: "edit", children: "Edit" },
      { value: "share", children: "Share" },
      { value: "sep", separator: true },
      { value: "delete", children: "Delete" },
    ],
  };
