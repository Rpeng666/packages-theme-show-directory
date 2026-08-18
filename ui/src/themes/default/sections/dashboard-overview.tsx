 'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import { ConsoleLink } from '../../../components/console/bridge';
import { SmartIcon } from '../../../components/smart-icon';
import type {
  DashboardOverviewProps,
  DashboardStat,
} from '../../../contracts/sections/dashboard-overview';

const TONE: Record<string, { text: string; bg: string }> = {
  blue: { text: 'text-primary', bg: 'bg-primary/10' },
  green: { text: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  gold: { text: 'text-amber-600', bg: 'bg-amber-500/10' },
  red: { text: 'text-red-600', bg: 'bg-red-500/10' },
  purple: { text: 'text-violet-600', bg: 'bg-violet-500/10' },
  neutral: { text: 'text-muted-foreground', bg: 'bg-muted' },
};

const DEFAULT_TONE = TONE.blue;

/**
 * Default (shadcn) DashboardOverview - fallback rendering of the admin
 * overview block. Kept lightweight; the semi theme is the reference
 * implementation.
 */
function StatCard({ stat }: { stat: DashboardStat }) {
  const tone = (stat.tone && TONE[stat.tone]) || DEFAULT_TONE;
  const card = (
    <div className="flex h-full flex-col gap-1.5 rounded-xl border bg-card p-5 transition-colors hover:border-primary/30">
      {stat.icon ? (
        <div
          className={cn(
            'mb-2 inline-flex size-9 items-center justify-center rounded-lg',
            tone.bg,
            tone.text,
          )}
        >
          <SmartIcon name={stat.icon} className="size-[18px]" />
        </div>
      ) : null}
      <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
      {stat.hint ? (
        <div className="mt-1 text-xs text-muted-foreground/80">{stat.hint}</div>
      ) : null}
    </div>
  );
  return stat.url ? (
    <ConsoleLink href={stat.url} className="block h-full">
      {card}
    </ConsoleLink>
  ) : (
    card
  );
}

export function DashboardOverview({
  stats,
  activities,
  quickActions,
  className = '',
}: DashboardOverviewProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {activities && activities.items?.length ? (
          <div className="rounded-xl border bg-card lg:col-span-2">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-sm font-semibold">{activities.title}</h2>
              {activities.viewAllUrl ? (
                <ConsoleLink
                  href={activities.viewAllUrl}
                  className="text-muted-foreground text-sm hover:text-foreground"
                >
                  View all
                </ConsoleLink>
              ) : null}
            </div>
            <div className="divide-y">
              {activities.items.map((item) => {
                const tone = item.badge?.tone
                  ? (TONE[item.badge.tone] ?? DEFAULT_TONE)
                  : DEFAULT_TONE;
                const row = (
                  <div className="flex items-center gap-3 px-5 py-3.5" key={item.id}>
                    {item.icon ? (
                      <div
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-full',
                          tone.bg,
                          tone.text,
                        )}
                      >
                        <SmartIcon name={item.icon} className="size-4" />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{item.title}</div>
                      {item.description ? (
                        <div className="text-muted-foreground truncate text-xs">
                          {item.description}
                        </div>
                      ) : null}
                    </div>
                    {item.badge ? (
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          tone.bg,
                          tone.text,
                        )}
                      >
                        {item.badge.label}
                      </span>
                    ) : null}
                    {item.time ? (
                      <div className="text-muted-foreground shrink-0 text-xs">
                        {item.time}
                      </div>
                    ) : null}
                  </div>
                );
                return item.url ? (
                  <ConsoleLink key={item.id} href={item.url} className="block">
                    {row}
                  </ConsoleLink>
                ) : (
                  row
                );
              })}
            </div>
          </div>
        ) : null}

        {quickActions && quickActions.items?.length ? (
          <div className="rounded-xl border bg-card">
            <div className="border-b px-5 py-4">
              <h2 className="text-sm font-semibold">{quickActions.title}</h2>
            </div>
            <div className="p-2">
              {quickActions.items.map((action) => (
                <ConsoleLink
                  key={action.key}
                  href={action.url}
                  className="hover:bg-secondary/60 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                >
                  {action.icon ? (
                    <span className="text-muted-foreground bg-muted flex size-8 shrink-0 items-center justify-center rounded-lg">
                      <SmartIcon name={action.icon} className="size-4" />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{action.title}</span>
                    {action.description ? (
                      <span className="text-muted-foreground block truncate text-xs">
                        {action.description}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-muted-foreground" aria-hidden>
                    ›
                  </span>
                </ConsoleLink>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
