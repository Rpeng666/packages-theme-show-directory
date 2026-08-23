import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    children: [
      <div key="1" className="flex h-32 items-center justify-center rounded-lg bg-gray-4 text-gray-9">Slide 1</div>,
      <div key="2" className="flex h-32 items-center justify-center rounded-lg bg-gray-4 text-gray-9">Slide 2</div>,
      <div key="3" className="flex h-32 items-center justify-center rounded-lg bg-gray-4 text-gray-9">Slide 3</div>,
    ],
    showArrow: true,
    showIndicator: true,
    autoPlay: false,
  };
