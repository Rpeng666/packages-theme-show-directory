'use client';

import { ArrowRight } from 'lucide-react';

import { SmartIcon } from '../../../components/smart-icon';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { cn } from '../../../lib/utils';
import type { FeaturesStepProps } from '../../../contracts/sections/features-step';

/**
 * Default (shadcn) features-step — numbered steps from the section's items.
 * Ordered list so SEO/AI engines can extract the numbered steps (kept column
 * layout via list-none). Ported from the app's default block.
 */
export function FeaturesStep({ section, className }: FeaturesStepProps) {
  const items = section.items || [];

  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-24', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            {section.label && (
              <span className="bg-accent text-accent-foreground inline-block rounded-full px-3 py-1 text-xs font-medium">
                {section.label}
              </span>
            )}
            <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg text-balance">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          {/* Ordered list so SEO/AI engines can extract the numbered steps
              (kept column layout via list-none; styling identical to the old
              div row). */}
          <ol className="mt-14 flex list-none flex-col items-center justify-center gap-8 md:flex-row md:items-start">
            {items.map((item, idx) => (
              <li
                className="relative flex max-w-xs flex-1 flex-col items-center text-center"
                key={idx}
              >
                {/* Step number */}
                <div className="from-[#6B8B5E] to-[#8FAB7E] shadow-[#6B8B5E]/20 flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white shadow-lg">
                  {idx + 1}
                </div>

                {/* Icon */}
                <div className="mt-5 text-[#5a7c4f]">
                  {item.icon && <SmartIcon name={item.icon as string} size={24} />}
                </div>

                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-balance">
                  {item.description}
                </p>

                {/* Arrow between steps */}
                {idx < items.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="text-border absolute top-6 -right-6 size-5" />
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Named sources with outbound links (Citations & Quotations). */}
          {section.sources && section.sources.length > 0 && (
            <ul className="text-muted-foreground mx-auto mt-8 max-w-6xl space-y-1 text-xs">
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
        </ScrollAnimation>
      </div>
    </section>
  );
}
