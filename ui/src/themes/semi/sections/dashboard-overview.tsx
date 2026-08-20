 'use client'

import * as React from 'react'
import { Card as SemiCard } from '@douyinfe/semi-ui'
import type { DashboardOverviewProps, DashboardStat } from '@template/ui'
import { ConsoleLink } from '@template/ui'

import { SmartIcon } from '../icons'

/**
 * Semi DashboardOverview — admin home content block.
 *
 * Designed as a calm, data-first overview: a row of stat cards (icon chip +
 * value + hint), then a two-column grid with the recent-activity feed on the
 * left and quick actions on the right. All links flow through the console
 * bridge (locale-aware router), so the section stays theme-package-local.
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

function StatCard({ stat }: { stat: DashboardStat }) {
  const tone = (stat.tone && TONE[stat.tone]) || DEFAULT_TONE
  const card = (
    <div className="dashboard-stat" style={{ height: '100%' }}>
      <div
        className="dashboard-stat-icon"
        style={{
          color: tone.color,
          background: tone.bg,
        }}
      >
        {stat.icon ? <SmartIcon name={stat.icon} size={18} /> : null}
      </div>
      <div className="dashboard-stat-value">{stat.value}</div>
      <div className="dashboard-stat-label">{stat.label}</div>
      {stat.hint ? <div className="dashboard-stat-hint">{stat.hint}</div> : null}
    </div>
  )
  return stat.url ? (
    <ConsoleLink href={stat.url} className="dashboard-stat-link">
      {card}
    </ConsoleLink>
  ) : (
    card
  )
}

export function DashboardOverview({
  stats,
  activities,
  quickActions,
  className = '',
}: DashboardOverviewProps) {
  return (
    <div className={`dashboard-overview ${className}`.trim()}>
      <div className="dashboard-stats">
        {stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      <div className="dashboard-panels">
        {activities && activities.items?.length ? (
          <SemiCard className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div className="dashboard-panel-title">{activities.title}</div>
              {activities.viewAllUrl ? (
                <ConsoleLink href={activities.viewAllUrl} className="dashboard-panel-more">
                  View all
                </ConsoleLink>
              ) : null}
            </div>
            <div className="dashboard-activity-list">
              {activities.items.map((item) => {
                const tone = item.badge?.tone
                  ? (TONE[item.badge.tone] ?? DEFAULT_TONE)
                  : DEFAULT_TONE
                const row = (
                  <div className="dashboard-activity-item" key={item.id}>
                    <div
                      className="dashboard-activity-icon"
                      style={{ color: tone.color, background: tone.bg }}
                    >
                      {item.icon ? <SmartIcon name={item.icon} size={16} /> : null}
                    </div>
                    <div className="dashboard-activity-body">
                      <div className="dashboard-activity-title">{item.title}</div>
                      {item.description ? (
                        <div className="dashboard-activity-desc">{item.description}</div>
                      ) : null}
                    </div>
                    {item.badge ? (
                      <span
                        className="dashboard-activity-badge"
                        style={{ color: tone.color, background: tone.bg }}
                      >
                        {item.badge.label}
                      </span>
                    ) : null}
                    {item.time ? (
                      <div className="dashboard-activity-time">{item.time}</div>
                    ) : null}
                  </div>
                )
                return item.url ? (
                  <ConsoleLink
                    key={item.id}
                    href={item.url}
                    className="dashboard-activity-link"
                  >
                    {row}
                  </ConsoleLink>
                ) : (
                  row
                )
              })}
            </div>
          </SemiCard>
        ) : null}

        {quickActions && quickActions.items?.length ? (
          <SemiCard className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div className="dashboard-panel-title">{quickActions.title}</div>
            </div>
            <div className="dashboard-quick-list">
              {quickActions.items.map((action) => (
                <ConsoleLink
                  key={action.key}
                  href={action.url}
                  className="dashboard-quick-item"
                >
                  {action.icon ? (
                    <span className="dashboard-quick-icon">
                      <SmartIcon name={action.icon} size={16} />
                    </span>
                  ) : null}
                  <span className="dashboard-quick-body">
                    <span className="dashboard-quick-title">{action.title}</span>
                    {action.description ? (
                      <span className="dashboard-quick-desc">{action.description}</span>
                    ) : null}
                  </span>
                  <span className="dashboard-quick-arrow" aria-hidden>
                    ›
                  </span>
                </ConsoleLink>
              ))}
            </div>
          </SemiCard>
        ) : null}
      </div>
    </div>
  )
}
