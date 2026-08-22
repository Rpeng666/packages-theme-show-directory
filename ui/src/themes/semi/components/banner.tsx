'use client'

import * as React from 'react'
import { Banner as SemiBanner } from '@douyinfe/semi-ui'
import type { BannerProps } from '@template/ui'

/**
 * Semi Banner — maps the shared BannerProps onto Semi Banner. `title` maps to
 * Semi's description slot when `description` is absent (Semi has no title);
 * `closable` shows Semi's close icon.
 */
export function Banner({
  type = 'info',
  title,
  description,
  icon,
  closable,
  onClose,
  bordered = true,
  children,
  className = '',
}: BannerProps) {
  return (
    <SemiBanner
      type={type}
      description={description ?? title}
      icon={icon}
      closeIcon={closable ? undefined : null}
      onClose={onClose}
      bordered={bordered}
      className={className}
    >
      {children}
    </SemiBanner>
  )
}
