import type { ReactNode } from 'react'

/** One metric card on the admin dashboard stat row. */
export interface DashboardStat {
  /** Stable key used as React key */
  key: string
  /** Label under the value, e.g. "Total users" */
  label: string
  /** Big number / value rendered on the card */
  value: ReactNode
  /** SmartIcon name (semi maps the shared icon vocabulary) */
  icon?: string
  /** Accent tone for the icon chip */
  tone?: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'neutral'
  /** Short helper line, e.g. "+12 this week" */
  hint?: string
  /** Optional target URL - makes the whole card a link */
  url?: string
}

/** One row in the recent-activity panel. */
export interface DashboardActivityItem {
  id: string
  title: string
  description?: ReactNode
  /** Relative / short time label, e.g. "2h ago" */
  time?: string
  icon?: string
  url?: string
  badge?: {
    label: string
    tone?: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'neutral'
  }
}

/** A quick-action shortcut rendered as a tappable row / card. */
export interface DashboardQuickAction {
  key: string
  title: string
  description?: string
  icon?: string
  url: string
}

/** Recent-activity panel data. */
export interface DashboardActivities {
  title: string
  items: DashboardActivityItem[]
  /** "View all" link at the panel header */
  viewAllUrl?: string
}

/** Quick-actions panel data. */
export interface DashboardQuickActions {
  title: string
  items: DashboardQuickAction[]
}

/**
 * DashboardOverview - admin home content: stat cards + recent activity +
 * quick actions. Registered as a section so each theme renders its own
 * dashboard visuals; the app page fetches data server-side and passes it in.
 *
 * Layout (designed):
 *   - stat cards row (value + label + icon chip + hint)
 *   - two-column grid: recent activity (wide) + quick actions (narrow)
 */
export interface DashboardOverviewProps {
  /** Stat cards row (4 recommended) */
  stats: DashboardStat[]
  /** Recent activity panel */
  activities?: DashboardActivities
  /** Quick actions panel */
  quickActions?: DashboardQuickActions
  className?: string
}
