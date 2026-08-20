'use client'

import * as React from 'react'
import { Timeline as SemiTimeline } from '@douyinfe/semi-ui'
import type { TimelineProps } from '@template/ui'

/**
 * Semi Timeline — dataSource = shared TimelineItems mapped to Semi's
 * Data shape (TimelineItemProps + content).
 */
export function Timeline({ items, mode, className = '' }: TimelineProps) {
  return (
    <SemiTimeline
      dataSource={items.map((item) => ({
        content: item.content,
        time: item.time,
        color: item.color,
        type: item.type,
        dot: item.dot,
        extra: item.extra,
      }))}
      mode={mode}
      className={className}
    />
  )
}
