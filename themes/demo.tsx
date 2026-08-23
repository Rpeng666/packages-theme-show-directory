/**
 * Demo props — theme-scoped mock data.
 *
 * Each theme that has demo data keeps it under themes/{theme}/mockdata
 * (one file per block, exporting `props`). `getDemoProps(theme, block)`
 * looks up the active theme first and falls back to `default`.
 */
import { DEMO_PROPS as DEFAULT_PROPS } from "./default/mockdata";
import { DEMO_PROPS as PIXEL_PROPS } from "./pixel/mockdata";
import { DEMO_PROPS as SEMI_PROPS } from "./semi/mockdata";

const REGISTRIES: Record<string, Record<string, any>> = {
  default: DEFAULT_PROPS,
  pixel: PIXEL_PROPS,
  semi: SEMI_PROPS,
};

export const DEMO_PROPS = DEFAULT_PROPS;

/** Resolve demo props for a block in a theme, falling back to default. */
export function getDemoProps(theme: string, block: string): Record<string, any> | undefined {
  const scoped = REGISTRIES[theme]?.[block];
  if (scoped !== undefined) return scoped;
  return REGISTRIES.default?.[block];
}
