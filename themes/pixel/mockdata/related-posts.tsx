import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  posts: [
    { slug: "registry", title: "The registry, explained", description: "How the filesystem becomes the registry.", image: "" },
    { slug: "forwarders", title: "Forwarders deep dive", description: "Thin adapters over registered blocks.", image: "" },
    { slug: "fallback", title: "Fallback chains", description: "Requested → default → any → empty.", image: "" },
  ],
};
