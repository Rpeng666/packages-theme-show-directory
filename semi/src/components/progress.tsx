'use client'

import * as React from 'react'
import { Progress as SemiProgress } from '@douyinfe/semi-ui'
import type { ProgressProps } from '@template/ui'

const TONE: Record<string, string> = {
  green: 'green',
  cyan: 'blue',
  gold: 'amber',
  red: 'red',
  purple: 'violet',
  pink: 'pink',
  neutral: 'grey',
}

export function Progress({
  value,
  tone = 'neutral',
  label,
  showValue = false,
  indeterminate,
  className = '',
}: ProgressProps) {
  // Semi Progress shows a label on top-left; we only enable when a label is given.
  const showLabel = Boolean(label)
  return (
    <SemiProgress
      percent={indeterminate ? undefined : value}
      stroke="#4cc3d9"
      showInfo={showValue}
      aria-label={typeof label === 'string' ? label : undefined}
      className={className}
      style={undefined}
    />
  )
}