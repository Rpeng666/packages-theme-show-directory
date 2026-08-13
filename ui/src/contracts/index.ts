/**
 * Component contracts — the semantic vocabulary both themes implement.
 *
 * Each contract is pure types only (no runtime deps): the props interface +
 * the semantic variant/size words. This is the layer you reuse across themes —
 * not the visual implementation.
 */
export type { ButtonProps, ButtonVariant, ButtonSize } from './button'
export type { BadgeProps, BadgeVariant } from './badge'
export type { CardProps, CardBadge } from './card'
export type { SkeletonProps } from './skeleton'
export type { FieldTone, FieldSize } from './field'
export type { InputProps } from './input'
export type { TextareaProps } from './textarea'
export type { SwitchProps } from './switch'
export type { ProgressProps } from './progress'
export type { TooltipProps } from './tooltip'
