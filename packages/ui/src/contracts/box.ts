import type * as React from 'react'

/**
 * Box contract — a surface container with tone/variant/padding/radius chrome.
 * pxlkit's PixelBox is the pixel implementation (chamfered, hard border);
 * default renders a shadcn-styled div. Consumers get theme-switchable
 * containers through `useThemeComponent('Box')`.
 */
export type BoxTone = 'green' | 'cyan' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral'
export type BoxVariant = 'solid' | 'soft' | 'ghost' | 'outline'
export type BoxPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BoxRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type BoxAs =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 色调（影响边框/背景） */
  tone?: BoxTone
  /** 视觉变体 */
  variant?: BoxVariant
  /** 内边距 */
  padding?: BoxPadding
  /** 圆角 */
  radius?: BoxRadius
  /** 是否渲染边框 */
  border?: boolean
  /** 硬偏移阴影 */
  shadow?: boolean
  /** 渲染为的 HTML 元素 */
  as?: BoxAs
}
