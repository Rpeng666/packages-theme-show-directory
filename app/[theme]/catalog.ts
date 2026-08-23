import { conventionIndex } from "@template/ui/convention.generated";
import { THEME_NAMES } from "@template/ui/registry";

/**
 * Shared catalog — enumerate EVERY component key the registry ships for a
 * given theme, grouped by category (components / sections / pages / ...).
 */
export interface CatalogGroup {
  category: string;
  label: string;
  keys: string[];
}

/** Category → human label for directory display. */
const CATEGORY_LABELS: Record<string, string> = {
  components: "Components",
  sections: "Sections",
  pages: "Pages",
  editor: "Editor",
};

export function themeGroups(theme: string): CatalogGroup[] {
  const record = conventionIndex?.[theme];
  if (!record || typeof record !== "object") return [];

  return Object.entries(record).map(([category, compMap]) => ({
    category,
    label: CATEGORY_LABELS[category] ?? category,
    keys: compMap && typeof compMap === "object" ? Object.keys(compMap) : [],
  }));
}

export function componentKeys(theme: string): string[] {
  return themeGroups(theme).flatMap((g) => g.keys);
}

export function resolveTheme(theme: string): string {
  return THEME_NAMES.includes(theme) ? theme : "default";
}