'use client';

import { Sparkles } from 'lucide-react';

import { cn } from '../../../lib/utils';
import type { HeroCleanerProps } from '../../../contracts/sections/hero-cleaner';

/**
 * Default hero-cleaner — the title/headline block that sits BELOW the cleaner
 * workbench. The workbench itself is a standalone `cleaner` section rendered
 * first via config (show_sections: ['cleaner', 'hero-cleaner', ...]); this
 * block only carries the H1 + copy + trust line. Ported from the app's default
 * block; the trust line is injected (trustText) so the package has no
 * hardcoded copy.
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
      {/* H1 + copy, directly below the workbench. Carries the SEO title and
          keyword highlight; the below-fold blocks (Why Choose, How It Works,
          FAQ) follow with their own H2s. */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col items-center text-center">
          {section.label && (
            <span className="border-border text-foreground mb-3 inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-[11px] font-medium">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              {section.label}
            </span>
          )}

          {texts && texts.length > 0 ? (
            <h1 className="text-foreground max-w-4xl text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {texts[0]}
              <span className="text-foreground relative rounded-lg bg-secondary px-2 py-0.5">
                {highlightText}
                <svg
                  className="text-accent-foreground absolute -bottom-1 left-1 h-1.5 w-[calc(100%-0.5rem)]"
                  viewBox="0 0 100 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2,5 Q15,1 25,4 T50,5 T75,4 T98,5"
                    strokeDasharray="200"
                    className="animate-hero-draw"
                  />
                </svg>
              </span>
              {texts[1]}
            </h1>
          ) : (
            <h1 className="text-foreground max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {section.title}
            </h1>
          )}

          {section.description && (
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          )}

          {trustText && (
            <p className="text-muted-foreground mt-2 text-xs">{trustText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
