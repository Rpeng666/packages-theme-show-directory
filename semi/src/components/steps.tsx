'use client'

import * as React from 'react'
import { Steps as SemiSteps } from '@douyinfe/semi-ui'
import type { StepsProps } from '@template/ui'

/**
 * Semi Steps — maps the item-based StepsProps onto Semi Steps + Steps.Step.
 * `current` is 0-based like the contract; Semi Steps.Step accepts title,
 * description and an optional status override.
 */
export function Steps({
  items,
  current = 0,
  direction = 'horizontal',
  size = 'default',
  className = '',
}: StepsProps) {
  return (
    <SemiSteps current={current} direction={direction} size={size} className={className}>
      {items.map((it, i) => (
        <SemiSteps.Step
          key={i}
          title={it.title}
          description={it.description}
          status={it.status}
        />
      ))}
    </SemiSteps>
  )
}
