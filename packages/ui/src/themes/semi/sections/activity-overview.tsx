'use client'

import * as React from 'react'
import { Card } from '../components/card'
import type {
  ActivityOverviewProps,
  ActivityQuickAction,
  ActivityStat,
  ActivityTaskItem,
  ActivityTone,
} from '@template/ui'
import { ConsoleLink } from '@template/ui'

import { SmartIcon } from '../icons'

/**
 * Semi ActivityOverview — activity-center home block.
 *
 * Designed as a creative launchpad for a user's AI activity: a gradient
 * welcome strip (with an optional credits meta chip), a row of stat cards,
 * then a two-column grid with the recent AI-task feed on the left and a
 * quick-start rail on the right. The gradient strip + tinted icon chips give
 * the console a warmer, more product-like feel than the admin dashboard.
 */

const TONE: Record<ActivityTone, { color: string; bg: string }> = {
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

const DEFAULT_TONE: ActivityTone = 'blue'

function StatCard({ stat }: { stat: ActivityStat }) {
  const tone = (stat.tone && TONE[stat.tone]) || TONE[DEFAULT_TONE]
  const card = (
    <div className="activity-stat" style={{ height: '100%' }}>
      <div
        className="activity-stat-icon"
        style={{ color: tone.color, background: tone.bg }}
      >
        {stat.icon ? <SmartIcon name={stat.icon} size={18} /> : null}
      </div>
      <div className="activity-stat-value">{stat.value}</div>
      <div className="activity-stat-label">{stat.label}</div>
      {stat.hint ? <div className="activity-stat-hint">{stat.hint}</div> : null}
    </div>
  )
  return stat.url ? (
    <ConsoleLink href={stat.url} className="activity-stat-link">
      {card}
    </ConsoleLink>
  ) : (
    card
  )
}

function TaskRow({ item }: { item: ActivityTaskItem }) {
  const tone = item.badge?.tone
    ? (TONE[item.badge.tone] ?? TONE[DEFAULT_TONE])
    : TONE[DEFAULT_TONE]
  const row = (
    <div className="activity-task">
      {item.icon ? (
        <div
          className="activity-task-icon"
          style={{ color: tone.color, background: tone.bg }}
        >
          <SmartIcon name={item.icon} size={16} />
        </div>
      ) : null}
      <div className="activity-task-body">
        <div className="activity-task-title">{item.title}</div>
        {item.description ? (
          <div className="activity-task-desc">{item.description}</div>
        ) : null}
      </div>
      {item.badge ? (
        <span
          className="activity-task-badge"
          style={{ color: tone.color, background: tone.bg }}
        >
          {item.badge.label}
        </span>
      ) : null}
      {item.time ? <div className="activity-task-time">{item.time}</div> : null}
    </div>
  )
  return item.url ? (
    <ConsoleLink key={item.id} href={item.url} className="activity-task-link">
      {row}
    </ConsoleLink>
  ) : (
    <div key={item.id}>{row}</div>
  )
}

function QuickCard({ action }: { action: ActivityQuickAction }) {
  const tone = (action.tone && TONE[action.tone]) || TONE[DEFAULT_TONE]
  return (
    <ConsoleLink href={action.url} className="activity-quick-link">
      <span className="activity-quick-item">
        {action.icon ? (
          <span
            className="activity-quick-icon"
            style={{ color: tone.color, background: tone.bg }}
          >
            <SmartIcon name={action.icon} size={18} />
          </span>
        ) : null}
        <span className="activity-quick-body">
          <span className="activity-quick-title">{action.title}</span>
          {action.description ? (
            <span className="activity-quick-desc">{action.description}</span>
          ) : null}
        </span>
        <span className="activity-quick-arrow" aria-hidden>
          ›
        </span>
      </span>
    </ConsoleLink>
  )
}

export function ActivityOverview({
  welcomeTitle,
  welcomeDescription,
  welcomeMeta,
  stats,
  recentTasks,
  quickActions,
  className = '',
}: ActivityOverviewProps) {
  return (
    <div className={`activity-overview ${className}`.trim()}>
      {welcomeTitle ? (
        <div className="activity-welcome">
          <div className="activity-welcome-glow" aria-hidden />
          <div className="activity-welcome-body">
            <h2 className="activity-welcome-title">{welcomeTitle}</h2>
            {welcomeDescription ? (
              <p className="activity-welcome-desc">{welcomeDescription}</p>
            ) : null}
          </div>
          {welcomeMeta ? (
            <div className="activity-welcome-meta">{welcomeMeta}</div>
          ) : null}
        </div>
      ) : null}

      <div className="activity-stats">
        {stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      <div className="activity-panels">
        {recentTasks && recentTasks.items?.length ? (
          <Card className="activity-panel">
            <div className="activity-panel-header">
              <div className="activity-panel-title">
                {recentTasks.title ?? 'Recent AI tasks'}
              </div>
              {recentTasks.viewAllUrl ? (
                <ConsoleLink
                  href={recentTasks.viewAllUrl}
                  className="activity-panel-more"
                >
                  {recentTasks.viewAllLabel ?? 'View all'}
                </ConsoleLink>
              ) : null}
            </div>
            <div className="activity-feed">
              {recentTasks.items.map((item) => (
                <TaskRow key={item.id} item={item} />
              ))}
            </div>
          </Card>
        ) : null}

        {quickActions && quickActions.items?.length ? (
          <Card className="activity-panel">
            <div className="activity-panel-header">
              <div className="activity-panel-title">
                {quickActions.title ?? 'Quick start'}
              </div>
            </div>
            <div className="activity-rail">
              {quickActions.items.map((action) => (
                <QuickCard key={action.key} action={action} />
              ))}
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
