"use client";

import { useThemeComponent } from "@template/ui";

const shortcuts = [
  { label: "Add to Raycast", keys: ["⌘", "⏎"] },
  { label: "Toggle Export Menu", keys: ["⌘", "K"] },
  { label: "Download JSON", keys: ["⌘", "D"] },
  { label: "Copy JSON", keys: ["⌘", "⌥", "C"] },
  { label: "Copy URL", keys: ["⌘", "⇧", "C"] },
  { label: "Select Next", keys: ["→"] },
  { label: "Select Previous", keys: ["←"] },
  { label: "Open shortcuts", keys: ["?"] },
];

export default function KeyboardShortcuts() {
  const WorkbenchKeyboardShortcutsDialog = useThemeComponent("WorkbenchKeyboardShortcutsDialog");
  return <WorkbenchKeyboardShortcutsDialog shortcuts={shortcuts} />;
}
