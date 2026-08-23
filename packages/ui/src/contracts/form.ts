import type * as React from 'react'
import type { FieldTone } from './field'

/**
 * Select contract — dropdown select with options. pixel → PixelSelect,
 * default → native/shadcn select.
 */
export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  label?: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** 强调色 tone（pixel 原生；default 忽略） */
  tone?: FieldTone
  className?: string
}

/**
 * Toggle contract — a pressed/active toggle button (used inside ToggleGroup).
 * pixel → PixelToggle, default → button.
 */
export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  pressed?: boolean
}

/**
 * ToggleGroup contract — single/multiple selectable toggle group.
 * pixel → PixelToggleGroup, default → button group.
 *
 * Widened to a single interface (not a discriminated union): the two modes
 * only differ in the value/onChange shape, which consumers already cast at the
 * call site. This keeps `ThemeComponents[K]` indexed access cheap enough for
 * the registry's resolveComponent signature.
 */
export interface ToggleGroupProps {
  /** `single`（默认）单选，`multiple` 多选 */
  type?: 'single' | 'multiple'
  /** 受控值：single → string，multiple → string[] */
  value?: string | string[]
  /** 非受控初始值：single → string，multiple → string[] */
  defaultValue?: string | string[]
  /** 变化回调：single → (next: string)，multiple → (next: string[]) */
  onChange?: (next: string | string[]) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'soft' | 'outline' | 'ghost'
  className?: string
  children?: React.ReactNode
  'aria-label'?: string
}

/**
 * BareTextarea contract — unstyled textarea passthrough. pixel → PixelBareTextarea,
 * default → <textarea>.
 */
export type BareTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>
