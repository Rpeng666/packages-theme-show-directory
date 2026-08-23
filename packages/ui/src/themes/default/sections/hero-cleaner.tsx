'use client';

import { cn } from '../../../lib/utils';
import type { HeroCleanerProps } from '../../../contracts/sections/hero-cleaner';

/**
 * Default hero-cleaner — the centered H1 block below the cleaner workbench.
 * Restrained style: quiet eyebrow with a primary dot, semibold headline with
 * a primary-colored highlight, one-line description, and a muted trust row.
 */
export function HeroCleaner({ section, className, trustText }: HeroCleanerProps) {
  const highlightText = section.highlight_text ?? '';
  let texts: string[] | null = null;
  if (highlightText) {
    texts = (section.title?.split(highlightText, 2) ?? [section.title]).filter(
      Boolean
    ) as string[];
  }

  return (
    <section
      id={section.id || 'hero-cleaner'}
      className={cn('relative flex flex-col bg-background', className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col items-center text-center">
          {section.label && (
            <span className="border-border text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]">
              <span className="size-1.5 rounded-full bg-primary" />
              {section.label}
            </span>
          )}

          {texts && texts.length > 0 ? (
            <h1 className="text-foreground max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {texts[0]}
              <span className="text-primary">{highlightText}</span>
              {texts[1]}
            </h1>
          ) : (
            <h1 className="text-foreground max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {section.title}
            </h1>
          )}

          {section.description && (
            <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          )}

          {trustText && (
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="bg-border h-px w-6" />
              {trustText}
              <span className="bg-border h-px w-6" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
