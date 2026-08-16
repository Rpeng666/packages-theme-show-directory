'use client';

import { ArrowRight } from 'lucide-react';

import { PixelBadge, PixelIconFrame } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { cn } from '../../../../lib/utils';
import type { FeaturesStepProps } from '../../../../contracts/sections/features-step';

/*
 * Pixel "How It Works" — numbered retro steps rebuilt from pxlkit primitives:
 * a chamfered PixelIconFrame holds each step's pixel icon with the step number
 * as a gold PixelBadge accent; pixel display-face headings, retro surface chrome.
 * Same data contract as the app block (label/title/description/items/sources),
 * now rendered in-package so the section is a real registry consumer.
 */
export function FeaturesStep({ section, className, ...rest }: FeaturesStepProps) {
  const items = section.items || [];

  return (
    <section {...rest}
      id={section.id}
      className={cn('bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {section.label && (
            <span className="pxl-corner-sm border-2 border-foreground/15 bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary-foreground">
              {section.label}
            </span>
          )}
          <h2 className="font-display text-foreground mt-5 text-xl font-normal uppercase tracking-wider text-balance md:text-2xl">
            {section.title}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:text-base">
            {section.description}
          </p>
        </div>

        {/* Ordered list so SEO/AI engines can extract the numbered steps
            (kept column layout via list-none; styling from pxlkit). */}
        <ol className="mt-14 flex list-none flex-col items-center justify-center gap-8 md:flex-row md:items-start">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="relative flex max-w-xs flex-1 flex-col items-center text-center"
            >
              {/* Icon frame with step-number accent */}
              <PixelIconFrame
                icon={
                  item.icon ? (
                    <PixelIcon name={item.icon as string} size={26} />
                  ) : undefined
                }
                size={56}
                shape="square"
                accent={{
                  icon: (
                    <PixelBadge tone="gold" variant="solid" size="sm" className="h-4 min-w-4 px-0.5">
                      {idx + 1}
                    </PixelBadge>
                  ),
                }}
              />

              <div className="mt-4 flex flex-col items-center gap-2 text-center">
                <h3 className="font-display text-foreground text-[13px] font-normal uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-balance">
                  {item.description}
                </p>
              </div>

              {/* Arrow between steps */}
              {idx < items.length - 1 && (
                <div className="hidden md:block">
                  <ArrowRight className="absolute top-6 -right-6 size-5 text-retro-border" />
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* Named sources with outbound links (Citations & Quotations). */}
        {section.sources && section.sources.length > 0 && (
          <ul className="mx-auto mt-8 max-w-6xl space-y-1 text-xs text-muted-foreground">
            {section.sources.map((source, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span aria-hidden="true">•</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
