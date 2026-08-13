import type * as React from 'react'

/**
 * Avatar contract — user avatar with image + initials fallback.
 * pixel → PixelAvatar (pxlkit), default → shadcn Avatar.
 */
export interface AvatarProps {
  /** 显示名（用于缩略 + 无障碍标签） */
  name: string
  /** 头像图片源 */
  src?: string
  /** 尺寸语义 */
  size?: 'sm' | 'md' | 'lg'
  /** 形状（pixel 默认 rounded，default 默认 circle） */
  shape?: 'circle' | 'rounded'
  className?: string
}
