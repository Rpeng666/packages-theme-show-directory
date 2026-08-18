'use client'

import * as React from 'react'
import type { SettingsOverviewItem, SettingsOverviewProps } from '@template/ui'
import { ConsoleLink } from '@template/ui'

import { SmartIcon } from '../icons'

/**
 * Semi SettingsOverview - settings-center home grid.
 *
 * Designed as a scannable launchpad: each item is a tappable card with an
 * icon chip, title + one-line helper, and a chevron affordance. The grid
 * auto-fills to 2-3 columns on desktop and collapses to one column on
 * mobile, so the whole account area is visible without scrolling.
 */

const TONE: Record<string, { color: string; bg: string }> = {
  blue: {
    color: 'var(--semi-color-primary)',
    bg: 'var(--semi-color-primary-light-default)',
  },
  green: { color: 'var(--semi-color-success)', bg: 'rgba(var(--semi-green-1), 0.7)' },
  gold: { color: 'var(--semi-color-warning)', bg: 'rgba(var(--semi-amber-1), 0.7)' },
  red: { color: 'var(--semi-color-danger)', bg: 'rgba(var(--semi-red-1), 0.7)' },
  purple: { color: 'rgb(var(--semi-violet-6))', bg: 'rgba(var(--semi-violet-1), 0.7)' },
  neutral: { color: 'var(--semi-color-text-2)', bg: 'var(--semi-color-fill-0)' },
}

const DEFAULT_TONE = TONE.blue

function SettingsCard({ item }: { item: SettingsOverviewItem }) {
  const tone = (item.tone && TONE[item.tone]) || DEFAULT_TONE
  return (
    <div className="settings-overview-card">
      {item.icon ? (
        <span
          className="settings-overview-icon"
          style={{ color: tone.color, background: tone.bg }}
        >
          <SmartIcon name={item.icon} size={20} />
        </span>
      ) : null}
      <span className="settings-overview-body">
        <span className="settings-overview-item-title">
          {item.title}
          {item.badge ? (
            <span
              className="settings-overview-badge"
              style={{ color: tone.color, background: tone.bg }}
            >
              {item.badge}
            </span>
          ) : null}
        </span>
        {item.description ? (
          <span className="settings-overview-item-desc">{item.description}</span>
        ) : null}
      </span>
      <span className="settings-overview-arrow" aria-hidden>
        ›
      </span>
    </div>
  )
}

export function SettingsOverview({
  title,
  description,
  items,
  className = '',
}: SettingsOverviewProps) {
  return (
    <div className={`settings-overview ${className}`.trim()}>
      {title || description ? (
        <div className="settings-overview-head">
          {title ? <h2 className="settings-overview-title">{title}</h2> : null}
          {description ? (
            <p className="settings-overview-desc">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="settings-overview-grid">
        {items.map((item) => (
          <ConsoleLink
            key={item.key}
            href={item.url}
            className="settings-overview-link"
          >
            <SettingsCard item={item} />
          </ConsoleLink>
        ))}
      </div>
    </div>
  )
}
