import type * as React from 'react'

/**
 * Button contract — the semantic vocabulary both themes implement.
 *
 * The variant/size words are inherited from the shadcn template (which was
 * already a stable semantic layer above both shadcn and pxlkit): keeping them
 * avoids churning ~70 call sites. Each theme maps these words onto its own
 * implementation (shadcn cva / pxlkit tone+variant+size).
 */
export type ButtonVariant =
  | 'default' // 主 CTA，强调色实底
  | 'secondary' // 次强调，弱实底
  | 'destructive' // 危险操作，红色
  | 'outline' // 描边
  | 'ghost' // 幽灵，hover 显背景
  | 'link' // 文字链接

export type ButtonSize =
  | 'default'
  | 'sm'
  | 'md'
  | 'lg'
  | 'icon' // size-9 方形
  | 'icon-sm' // size-7 方形

/**
 * Theme-native color tone (pixel vocabulary). Default theme ignores it and
 * derives color from `variant`; pixel forwards it to PixelButton so workbench
 * call sites can pick an accent directly. Shares the pxlkit Tone union.
 */
export type ButtonTone =
  | 'green' | 'cyan' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral'

/**
 * Pixel-native solid button — used by the pixel workbench (cleaner). The
 * shadcn vocabulary has no solid secondary accent, so pxlkit's solid tones
 * live here instead of being shoehorned into `ButtonVariant`.
 */
export type PixelButtonVariant = 'solid' | 'outline' | 'ghost'

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'color' | 'className'
  > {
  /** 语义变体，默认 `default` */
  variant?: ButtonVariant | PixelButtonVariant
  /** 尺寸，默认 `default` */
  size?: ButtonSize
  /** 渲染为子元素根节点（Radix Slot 语义），用于 `<Link>`/`<a>` 包裹 */
  asChild?: boolean
  /** 转圈 + 禁用 */
  loading?: boolean
  /** 强调色 tone（pixel 原生；default 忽略，由 variant 决定颜色） */
  tone?: ButtonTone
  /** 前置图标（pixel 原生，loading 时替换为 spinner；default 忽略） */
  iconLeft?: React.ReactNode
  /** 后置图标（pixel 原生；default 忽略） */
  iconRight?: React.ReactNode
  /** 铺满父容器宽（pixel 原生；default 忽略） */
  fullWidth?: boolean
  className?: string
  children?: React.ReactNode
}
