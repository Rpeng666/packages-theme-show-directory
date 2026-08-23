import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    open: true,
    onOpenChange: () => {},
    title: "Confirm action",
    description: "Are you sure you want to continue?",
    children: "This action cannot be undone.",
    footer: <span className="text-sm">Footer slot</span>,
  };
