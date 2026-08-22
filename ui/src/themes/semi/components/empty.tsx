'use client'

import * as React from 'react'
import { Empty as SemiEmpty } from '@douyinfe/semi-ui'
import type { EmptyProps } from '@template/ui'

/**
 * Semi Empty — maps the shared EmptyProps onto Semi Empty. Children render
 * below the description (Semi Empty supports children as extra action area).
 */
export function Empty({ description, image, children, className = '' }: EmptyProps) {
  return (
    <SemiEmpty description={description} image={image} className={className}>
      {children}
    </SemiEmpty>
  )
}
