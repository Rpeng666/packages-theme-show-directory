/**
 * Shared catalog — the list of component keys each theme directory entry
 * showcases, plus their display labels and directory descriptions.
 */
export interface CatalogEntry {
  key: string;
  label: string;
  children: string[];
}

export const THEME_NAMES: readonly string[] = ["default", "pixel", "semi", "raycast"];

/** Components rendered in the showcase, grouped by directory section. */
export const COMPONENT_GROUPS: CatalogEntry[] = [
  {
    key: "primitives",
    label: "Primitives",
    children: ["Button", "Badge", "Card", "Input", "Switch", "Avatar"],
  },
  {
    key: "feedback",
    label: "Feedback & Progress",
    children: ["Progress", "Skeleton"],
  },
];

/** Flattened list of component keys for sidebar navigation. */
export function componentKeys(): string[] {
  return COMPONENT_GROUPS.flatMap((g) => g.children);
}

/** Resolve an active theme name from the route segment, falling back to "default". */
export function resolveTheme(theme: string): string {
  return THEME_NAMES.includes(theme) ? theme : "default";
}