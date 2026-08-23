import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  links: [
    { href: "#", label: "App Store", icon: "apple" },
    { href: "#", label: "Google Play", icon: "android" },
  ],
  t: (key: string) => key,
};
