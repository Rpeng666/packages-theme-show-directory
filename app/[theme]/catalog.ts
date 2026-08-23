import { THEME_NAMES } from "@template/ui/registry";

/** Resolve an active theme name from a route segment, falling back to "default". */
export function resolveTheme(theme: string): string {
  return THEME_NAMES.includes(theme) ? theme : "default";
}