'use client'

import { useThemeComponent } from './context'
import type { TooltipProps } from './contracts/tooltip'

/**
 * Theme-aware thin Tooltip — resolves the active theme's tooltip through the
 * registry. Use this where theme switching matters (theme blocks); the
 * composite default tooltip sub-components (TooltipProvider/Trigger/Content)
 * stay for app-side composable call sites.
 */
export function Tooltip(props: TooltipProps) {
  const ThemeTooltip = useThemeComponent('Tooltip')
  return <ThemeTooltip {...props} />
}
