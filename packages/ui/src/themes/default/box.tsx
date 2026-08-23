'use client'

import { cn } from '../../lib/utils'
import type { BoxProps, BoxTone, BoxVariant, BoxPadding, BoxRadius } from '../../contracts/box'

/**
 * Default Box — shadcn-styled surface container (div). Maps the pxlkit-ish
 * Box contract to shadcn tokens so the default theme reads consistently.
 */
const toneClasses: Record<BoxTone, string> = {
  green: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40',
  cyan: 'border-cyan-200 bg-cyan-50 dark:border-cyan-900 dark:bg-cyan-950/40',
  gold: 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40',
  red: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40',
  purple: 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/40',
  pink: 'border-pink-200 bg-pink-50 dark:border-pink-900 dark:bg-pink-950/40',
  neutral: 'border-border bg-card',
}

const variantClasses: Record<BoxVariant, string> = {
  solid: 'bg-card',
  soft: 'bg-muted/50',
  ghost: 'bg-transparent',
  outline: 'bg-transparent',
}

const paddingClasses: Record<BoxPadding, string> = {
  none: 'p-0',
  xs: 'px-2 py-1',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
  xl: 'px-8 py-6',
}

const radiusClasses: Record<BoxRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function Box({
  tone = 'neutral',
  variant = 'solid',
  padding = 'md',
  radius = 'md',
  border = false,
  shadow = false,
  as,
  className,
  ...rest
}: BoxProps) {
  const Comp = (as ?? 'div') as 'div'
  return (
    <Comp
      className={cn(
        toneClasses[tone],
        variantClasses[variant],
        paddingClasses[padding],
        radiusClasses[radius],
        border && 'border',
        shadow && 'shadow-sm',
        className
      )}
      {...rest}
    />
  )
}
