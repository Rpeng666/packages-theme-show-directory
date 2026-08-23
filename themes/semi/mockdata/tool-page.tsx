import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  id: "tool-page",
  hero: {
    id: "hero",
    eyebrow: "AI Cleaner",
    title: "Clean up any image",
    description: "Remove backgrounds in one click.",
    buttons: [{ title: "Try it free", url: "#", variant: "default" }],
  },
  workspace: {
    title: "Workspace",
    children: (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
        Workspace body
      </div>
    ),
  },
  steps: {
    id: "steps",
    title: "How it works",
    items: [
      { title: "Upload", description: "Add your image" },
      { title: "Clean", description: "AI removes the background" },
      { title: "Export", description: "Download the result" },
    ],
  },
  benefits: {
    id: "benefits",
    title: "Benefits",
    items: [
      { title: "Fast", description: "Runs in seconds" },
      { title: "Private", description: "In-browser only" },
    ],
  },
  faq: {
    id: "faq",
    title: "FAQ",
    items: [
      { title: "Is it free?", description: "Yes, no signup." },
    ],
  },
  cta: {
    id: "cta",
    title: "Ready to try it?",
    buttons: [{ title: "Start now", url: "#", variant: "default" }],
  },
  children: null,
};
