/**
 * shadcn token-class stripping — used by pixel-theme component impls to remove
 * template (shadcn) colour/surface classes a caller may pass that would fight
 * the pxlkit component's own colour/surface system (pxlkit's cn is a plain
 * join, no tailwind-merge). Radius and shadow tokens are also themed-owned.
 * Everything else (layout, spacing, hover:translate, …) passes through.
 *
 * Moved verbatim from src/shared/components/ui/theme-component.ts as part of
 * the contracts/themes/registry refactor.
 */
const templateTokenClass =
  /^(?:bg-primary|bg-background|bg-secondary|bg-destructive|bg-card|bg-muted|bg-accent|bg-border|bg-input|bg-popover|bg-white|bg-black|bg-foreground|text-primary|text-primary-foreground|text-foreground|text-muted-foreground|text-secondary-foreground|text-accent-foreground|text-card-foreground|text-popover-foreground|text-destructive|text-background|text-muted|text-white|text-black|border-border|border-foreground|border-primary|border-input|border-destructive|border-background|border-secondary|border-accent|border-muted|border-card|border-popover|border-white|border-black|rounded-none|rounded-sm|rounded|rounded-md|rounded-lg|rounded-xl|rounded-2xl|rounded-3xl|rounded-full|shadow-xs|shadow-sm|shadow-md|shadow-lg|shadow-xl|shadow-2xl|shadow-none)(?:\/[0-9.]+)?$/

export function stripTemplateTokens(className?: string): string | undefined {
  if (!className) return className
  return className
    .split(/\s+/)
    .filter((cls) => {
      // last ':'-segment is the base class; prefix chains (hover:, dark:,
      // data-[…]:, [&_…]:) ride along and drop with it.
      const base = cls.split(':').pop() ?? cls
      return !templateTokenClass.test(base)
    })
    .join(' ')
}
