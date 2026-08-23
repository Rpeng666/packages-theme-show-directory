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
  red: 'border-destructive/20 bg-destructive/10 text-destructive',
  green: 'border-border bg-primary/10 text-primary',
};

/**
 * FeaturesCompare — before/after comparison.
 *
 * Restrained editor style: two quiet cards with a hairline border, a
 * semantic badge, and a neutral arrow connector. No hard-coded brand color.
 */
export function FeaturesCompare({ section, className, ...rest }: FeaturesCompareProps) {
  const before = (section.before ?? {}) as CompareCardData;
  const after = (section.after ?? {}) as CompareCardData;

  return (
    <section {...rest}
      id={section.id}
      className={cn('py-16 md:py-24', section.className, className)}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <ScrollAnimation>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 className="text-foreground mb-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground text-base text-balance md:text-lg">
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
              <div className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground md:size-11">
                <ArrowRight className="size-4 md:size-5" />
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
    <div className="flex-1 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">
          {data.label}
        </span>
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
      <p className="text-sm leading-relaxed text-muted-foreground">
        {data.text}
      </p>
    </div>
  );
}
