'use client';

import { Sparkles } from 'lucide-react';

import { cn } from '../../../lib/utils';
import type { HeroCleanerProps } from '../../../contracts/sections/hero-cleaner';

/*
 * Pixel hero-cleaner — the title/headline block that sits BELOW the cleaner
 * workbench. The workbench itself is a standalone `cleaner` section rendered
 * first via config (show_sections: ['cleaner', 'hero-cleaner', ...]); this
 * block only carries the H1 + copy, dressed in the retro aesthetic. The trust
 * line is injected (trustText) so the package has no hardcoded copy.
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
      className={cn(
        'relative flex flex-col overflow-hidden bg-background',
        className
      )}
    >
      {/* Retro blueprint-grid + scanline overlays across the whole hero */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden="true" />

      {/* H1 + copy, directly below the workbench. Carries the SEO title and
          keyword highlight; the below-fold blocks (Why Choose, How It Works,
          FAQ) follow with their own H2s. */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col items-center text-center">
          {section.label && (
            <span className="pxl-corner-sm border-2 border-foreground/15 bg-card px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-foreground">
              <Sparkles className="mr-1.5 inline-block size-3.5" strokeWidth={2} />
              {section.label}
            </span>
          )}

          {texts && texts.length > 0 ? (
            <h1 className="font-display text-foreground max-w-4xl text-2xl font-normal leading-snug tracking-wide text-balance sm:text-3xl md:text-4xl">
              {texts[0]}
              <span className="text-accent text-glow relative inline-block px-2">
                {highlightText}
              </span>
              {texts[1]}
            </h1>
          ) : (
            <h1 className="font-display text-foreground max-w-3xl text-2xl font-normal leading-snug tracking-wide text-balance sm:text-3xl md:text-4xl">
              {section.title}
            </h1>
          )}

          {section.description && (
            <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          )}

          {trustText && (
            <p className="text-muted-foreground mt-3 font-mono text-xs uppercase tracking-wider">
              {trustText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
