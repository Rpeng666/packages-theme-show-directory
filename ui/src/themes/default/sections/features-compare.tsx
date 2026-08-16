'use client';

import { ArrowRight } from 'lucide-react';

import { Badge } from '../../../themes/default/badge';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { cn } from '../../../lib/utils';
import type { FeaturesCompareProps } from '../../../contracts/sections/features-compare';

interface CompareCardData {
  label: string;
  badge: string;
  badgeColor?: 'red' | 'green' | string;
  text: string;
}

const badgeStyles: Record<string, string> = {
  red: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950 dark:text-red-300 dark:border-red-900',
  green:
    'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900',
};

export function FeaturesCompare({ section, className, ...rest }: FeaturesCompareProps) {
  const before = (section.before ?? {}) as CompareCardData;
  const after = (section.after ?? {}) as CompareCardData;

  return (
    <section {...rest}
      id={section.id}
      className={cn('py-16 md:py-24', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollAnimation>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-16">
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg text-balance">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <div className="flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-center">
            <CompareCard data={before} />

            <div
              className="flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[#6B8B5E] text-white shadow-lg shadow-[#6B8B5E]/20 transition-transform hover:scale-105 md:size-12">
                <ArrowRight className="size-5" />
              </div>
            </div>

            <CompareCard data={after} />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

function CompareCard({ data }: { data: CompareCardData }) {
  return (
    <div className="flex-1 rounded-2xl border border-border bg-card p-3 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{data.label}</span>
        <Badge
          variant="outline"
          className={cn(
            'text-xs font-semibold',
            badgeStyles[data.badgeColor ?? ''] ?? ''
          )}
        >
          {data.badge}
        </Badge>
      </div>
      <p className="text-muted-foreground leading-relaxed break-words">
        {data.text}
      </p>
    </div>
  );
}
