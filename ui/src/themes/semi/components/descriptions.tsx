'use client'

import * as React from 'react'
import { Descriptions as SemiDescriptions } from '@douyinfe/semi-ui'
import type { DescriptionsProps } from '@template/ui'

/**
 * Semi Descriptions — maps the items-based DescriptionsProps onto Semi
 * Descriptions via its `data` prop (label/value pairs, optional span).
 */
export function Descriptions({
  items,
  column = 1,
  size = 'medium',
  className = '',
}: DescriptionsProps) {
  return (
    <SemiDescriptions
      data={items.map((it) => ({ label: it.label, value: it.content, span: it.span })) as any}
      column={column}
      size={size as any}
      className={className}
    />
  )
}
