'use client'

import { PixelAccordion } from '@pxlkit/ui-kit'

import { ScrollAnimation } from '../../../components/scroll-animation'
import { cn } from '../../../lib/utils'
import type { FaqProps } from '../../../contracts/sections/faq'

/*
 * Pixel FAQ — retro accordion built on the pxlkit PixelAccordion. Same data
 * contract as before (section.items of question/answer, optional tip), with
 * the pxlkit chamfered accordion chrome instead of the hand-rolled shadcn
 * accordion. The pixel surface is injected by the registry's AmbientProvider.
 */
export function Faq({ section, className }: FaqProps) {
  const items =
    section.items?.map((item, idx) => ({
      id: String(idx),
      title: item.question || item.title || '',
      content: (
        <p className="text-sm leading-relaxed text-retro-muted">
          {item.answer || item.description || ''}
        </p>
      ),
    })) ?? []

  return (
    <section
      id={section.id}
      className={cn('bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center text-balance">
            <h2 className="font-display text-foreground text-xl font-normal uppercase tracking-wider md:text-2xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:mb-12">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mx-auto mt-12 w-full">
            <PixelAccordion items={items} collapsedByDefault />
            {section.tip && (
              <p
                className="text-muted-foreground mt-6 px-8 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.tip }}
              />
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
