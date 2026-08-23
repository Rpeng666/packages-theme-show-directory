import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
    sider: <div className="h-full w-48 bg-gray-4/50" />,
    header: <div className="h-12 border-b px-4 text-sm flex items-center">Header</div>,
    children: <div className="p-6 text-sm">Layout body</div>,
    footer: <div className="border-t px-4 py-2 text-sm">Footer</div>,
  };
