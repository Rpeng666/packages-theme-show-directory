import type { ReactNode } from 'react'

/** Accent tone used across activity cards (matches dashboard/settings tones). */
export type ActivityTone = 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'neutral'

/** One stat card on the activity overview. */
export interface ActivityStat {
  /** Stable key used as React key */
  key: string
  /** Short label under the value, e.g. "AI tasks" */
  label: string
  /** Formatted value, e.g. "128" */
  value: string
  /** SmartIcon name */
  icon?: string
  /** Accent tone for the icon chip */
  tone?: ActivityTone
  /** Optional one-line helper under the label */
  hint?: string
  /** Optional target URL - the whole card becomes a link */
  url?: string
}

/** One recent AI-task row in the activity feed. */
export interface ActivityTaskItem {
  /** Stable key */
  id: string
  /** Row title, e.g. "Music generation" */
  title: string
  /** Optional second line, e.g. provider · model */
  description?: string
  /** SmartIcon name, e.g. Music/Image/Video */
  icon?: string
  /** Status badge (label + tone) */
  badge?: { label: string; tone?: ActivityTone }
  /** Relative time string, e.g. "3 min ago" */
  time?: string
  /** Optional target URL */
  url?: string
}

/** One launch card in the quick-start rail. */
export interface ActivityQuickAction {
  /** Stable key */
  key: string
  /** Action title, e.g. "New chat" */
  title: string
  /** One-line helper copy */
  description?: string
  /** SmartIcon name */
  icon?: string
  /** Accent tone for the icon chip */
  tone?: ActivityTone
  /** Target URL - the whole card is a link */
  url: string
}

/**
 * ActivityOverview - the activity-center home block.
 *
 * Designed as a creative launchpad for a user's AI activity:
 *   - a welcome strip (gradient banner + optional meta chip, e.g. credits)
 *   - a row of stat cards (tasks by status, chats, credits)
 *   - a two-column grid: recent AI-task feed (left) + quick-start rail (right)
 *
 * All links flow through the console bridge so the section stays
 * theme-package-local. Registered as a section; each theme renders its own
 * visuals.
 */
export interface ActivityOverviewProps {
  /** Welcome strip title, e.g. a greeting */
  welcomeTitle?: ReactNode
  /** Welcome strip helper copy */
  welcomeDescription?: ReactNode
  /** Optional right-aligned meta content (e.g. credits balance chip) */
  welcomeMeta?: ReactNode
  stats: ActivityStat[]
  recentTasks?: {
    title?: ReactNode
    emptyText?: ReactNode
    viewAllLabel?: ReactNode
    viewAllUrl?: string
    items: ActivityTaskItem[]
  }
  quickActions?: {
    title?: ReactNode
    items: ActivityQuickAction[]
  }
  className?: string
}
