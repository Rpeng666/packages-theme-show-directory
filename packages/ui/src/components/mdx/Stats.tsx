import React from 'react';
import { cn } from '../../lib/utils';

interface StatItem {
  value: string | number;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface StatsProps {
  items: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const trendColor = {
  up: 'text-green-600 dark:text-green-400',
  down: 'text-red-600 dark:text-red-400',
  neutral: 'text-muted-foreground',
};

const trendSymbol = { up: '↑', down: '↓', neutral: '' };

const colClass: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

export function Stats({ items, columns = 3, className }: StatsProps) {
  return (
    <div className={cn('not-prose my-6 grid gap-4', colClass[columns] ?? colClass[3], className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border bg-card px-5 py-4 shadow-sm text-center"
        >
          <p className={cn('text-3xl font-bold tabular-nums', item.trend ? trendColor[item.trend] : 'text-primary')}>
            {item.trend && item.trend !== 'neutral' && (
              <span className="mr-1 text-xl">{trendSymbol[item.trend]}</span>
            )}
            {item.value}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{item.label}</p>
          {item.description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
