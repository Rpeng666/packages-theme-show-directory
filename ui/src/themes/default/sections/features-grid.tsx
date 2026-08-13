'use client';

import { SmartIcon } from '../../../components/smart-icon';
import { cn } from '../../../lib/utils';
import type { FeaturesGridProps } from '../../../contracts/sections/features-grid';

/**
 * Responsive grid of icon + title + description cards.
 * Used by the homepage "why-choose" section (block: features-grid).
 */
export function FeaturesGrid({ section, className }: FeaturesGridProps) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-24', section.className, className)}
    >
      <div className="container space-y-8 md:space-y-16">
          <div className="mx-auto max-w-4xl text-center text-balance">
            {section.label ? (
              <span className="text-primary mb-4 block text-sm font-medium tracking-wide">
                {section.label}
              </span>
            ) : null}
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {section.title}
            </h2>
            {section.description ? (
              <p className="text-muted-foreground mb-6 md:mb-12 lg:mb-16">
                {section.description}
              </p>
            ) : null}
          </div>

          {/* Semantic list so SEO/AI engines can extract structure (kept grid
              layout via list-none; styling is identical to the old div grid). */}
          <ul className="grid min-w-0 list-none gap-4 break-words sm:grid-cols-2 lg:grid-cols-3">
            {section.items?.map((item, idx) => (
              <li
                className="border-border bg-card min-w-0 space-y-3 rounded-2xl border p-6 shadow-sm break-words"
                key={idx}
              >
                <div className="flex min-w-0 items-center gap-2">
                  {item.icon && (
                    <SmartIcon
                      name={item.icon as string}
                      size={24}
                      className="text-primary shrink-0"
                    />
                  )}
                  <h3 className="min-w-0 text-sm font-medium break-words">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground min-w-0 text-sm break-words">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Named sources with outbound links (Citations & Quotations). */}
          {section.sources && section.sources.length > 0 && (
            <ul className="space-y-1 text-xs text-muted-foreground">
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
