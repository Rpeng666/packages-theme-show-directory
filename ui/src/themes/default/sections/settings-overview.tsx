'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import { ConsoleLink } from '../../../components/console/bridge';
import { SmartIcon } from '../../../components/smart-icon';
import type {
  SettingsOverviewItem,
  SettingsOverviewProps,
} from '../../../contracts/sections/settings-overview';

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
 * Default (shadcn) SettingsOverview - fallback rendering of the settings
 * center home grid. Kept lightweight; the semi theme is the reference
 * implementation.
 */
function SettingsCard({ item }: { item: SettingsOverviewItem }) {
  const tone = (item.tone && TONE[item.tone]) || DEFAULT_TONE;
  return (
    <div className="flex h-full items-start gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary/30">
      {item.icon ? (
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            tone.bg,
            tone.text,
          )}
        >
          <SmartIcon name={item.icon} className="size-5" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">{item.title}</span>
          {item.badge ? (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                tone.bg,
                tone.text,
              )}
            >
              {item.badge}
            </span>
          ) : null}
        </div>
        {item.description ? (
          <div className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {item.description}
          </div>
        ) : null}
      </div>
      <span className="text-muted-foreground mt-2" aria-hidden>
        ›
      </span>
    </div>
  );
}

export function SettingsOverview({
  title,
  description,
  items,
  className = '',
}: SettingsOverviewProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {title || description ? (
        <div>
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
          {description ? (
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ConsoleLink
            key={item.key}
            href={item.url}
            className="block h-full"
          >
            <SettingsCard item={item} />
          </ConsoleLink>
        ))}
      </div>
    </div>
  );
}
