"use client";
import { resolveComponent } from "@template/ui";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";

const WorkbenchDock = resolveComponent("WorkbenchDock");

export function Dock() {
  const { activeTheme } = useRaycastTheme();

  return (
    <WorkbenchDock
      name={activeTheme?.name}
      author={activeTheme?.author || activeTheme?.authorUsername}
      colors={activeTheme?.colors}
    />
  );
}