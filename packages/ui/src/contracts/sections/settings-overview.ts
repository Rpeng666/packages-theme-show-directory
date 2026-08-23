import type { ReactNode } from 'react'

/** One entry card on the settings overview grid. */
export interface SettingsOverviewItem {
  /** Stable key used as React key */
  key: string
  /** Card title, e.g. "Profile" */
  title: string
  /** One-line helper copy under the title */
  description?: string
  /** SmartIcon name (semi maps the shared icon vocabulary) */
  icon?: string
  /** Optional small badge, e.g. "PRO" */
  badge?: string
  /** Accent tone for the icon chip */
  tone?: 'blue' | 'green' | 'gold' | 'red' | 'purple' | 'neutral'
  /** Target URL - the whole card is a link */
  url: string
}

/**
 * SettingsOverview - the settings-center home grid. Each item renders as a
 * tappable card (icon chip + title + description + arrow) so the user can
 * scan every account area at a glance. Registered as a section so each theme
 * renders its own overview visuals; the app page feeds the items from i18n.
 *
 * Layout (designed):
 *   - optional header block (title + description)
 *   - responsive card grid (auto-fill, 1 col mobile / 2-3 cols desktop)
 */
export interface SettingsOverviewProps {
  title?: ReactNode
  description?: ReactNode
  items: SettingsOverviewItem[]
  className?: string
}
