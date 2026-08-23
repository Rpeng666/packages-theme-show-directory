import type { ReactNode } from 'react'

/**
 * Timeline contract — a vertical sequence of events with optional time stamps.
 * semi → Semi Timeline (dataSource), default → dot list.
 */
export interface TimelineItem {
  content: ReactNode
  time?: ReactNode
  color?: string
  type?: 'default' | 'ongoing' | 'success' | 'warning' | 'error'
  dot?: ReactNode
  extra?: ReactNode
}

export interface TimelineProps {
  items: TimelineItem[]
  mode?: 'left' | 'right' | 'center' | 'alternate'
  className?: string
}
