"use client";
import React from "react";
import { resolveComponent } from "@template/ui";
import { Theme } from "@themes/lib/theme";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { Raycast } from "@themes/components/raycast";

const WorkbenchThemeSwitcher = resolveComponent("WorkbenchThemeSwitcher");
const WorkbenchThemeCard = resolveComponent("WorkbenchThemeCard");

export function ThemeSwitcher({ themes }: { themes: Theme[] }) {
  const { activeTheme, setActiveTheme } = useRaycastTheme();

  const visibleThemes =
    activeTheme?.appearance === "dark"
      ? themes.filter((rayTheme) => rayTheme.appearance === "dark")
      : themes.filter((rayTheme) => rayTheme.appearance === "light");

  return (
    <WorkbenchThemeSwitcher
      themes={visibleThemes}
      activeSlug={activeTheme?.slug}
      renderCard={(theme, selected) => (
        <WorkbenchThemeCard
          theme={theme}
          selected={selected}
          onSelect={() => setActiveTheme(theme as Theme)}
          preview={
            <div className="absolute left-3 top-3">
              <Raycast theme={theme as Theme} disableLoadingAnimation={!selected} thumbnail />
            </div>
          }
        />
      )}
    />
  );
}
