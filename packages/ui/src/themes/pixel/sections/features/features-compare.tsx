'use client';

import { ArrowRight } from 'lucide-react';

import { PixelBadge, PixelCard } from '@pxlkit/ui-kit';
import { ScrollAnimation } from '../../../../components/scroll-animation';
import { cn } from '../../../../lib/utils';
import type { FeaturesCompareProps } from '../../../../contracts/sections/features-compare';

/*
 * Pixel "Examples" — before/after comparison cards rendered by the pxlkit
 * PixelCard with a composite header: label on the left, gold AI-score tag on
 * the right (inline `justify-between`, layout flow — never clipped, unlike a
 * corner ribbon which overflows and gets cut by card/parent boundaries).
 */
interface CompareCardData {
  label: string;
  badge: string;
  badgeColor?: 'red' | 'green' | string;
  text: string;
}

export function FeaturesCompare({ section, className, ...rest }: FeaturesCompareProps) {
  const before = (section.before ?? {}) as CompareCardData;
  const after = (section.after ?? {}) as CompareCardData;

  return (
    <section {...rest}
      id={section.id}
      className={cn('bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollAnimation>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-16">
            <h2 className="font-display text-foreground text-xl font-normal uppercase tracking-wider text-balance md:text-2xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <div className="flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-stretch">
            <CompareCard data={before} />

            <div
              className="flex shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              <div className="pxl-corner-sm border-2 border-foreground/20 bg-secondary shadow-md flex size-11 items-center justify-center text-secondary-foreground transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none md:size-12">
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
    <PixelCard className="min-w-0 flex-1 basis-0">
      <header className="mb-2 flex items-center justify-between gap-2 border-b border-retro-border/30 pb-3">
        <h4 className="min-w-0 truncate font-mono text-sm font-semibold text-retro-text">
          {data.label}
        </h4>
        {data.badge && (
          <PixelBadge tone="gold" variant="solid" size="sm" className="shrink-0">
            {data.badge}
          </PixelBadge>
        )}
      </header>
      <p className="break-words text-sm leading-relaxed text-retro-muted">
        {data.text}
      </p>
    </PixelCard>
  );
}
