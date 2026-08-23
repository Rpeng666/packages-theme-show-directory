import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    dataSource: [
      { name: "Ada Lovelace", role: "Mathematician" },
      { name: "Grace Hopper", role: "Computer scientist" },
      { name: "Linus Torvalds", role: "Software engineer" },
    ],
    renderItem: (item: any) => (
      <div className="flex items-center justify-between py-2">
        <span className="font-medium">{item.name}</span>
        <span className="text-gray-11">{item.role}</span>
      </div>
    ),
  };
