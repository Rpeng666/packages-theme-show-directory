'use client'

import { ArrowRight, Zap } from 'lucide-react'

import { PixelBox } from '@pxlkit/ui-kit'
import { cn } from '../../../../lib/utils'
import type { BlogToolCtaProps } from '../../../../contracts/sections/blog-cta'

/*
 * Pixel blog CTA — article-page tool callout panel, rebuilt from pxlkit
 * (PixelBox chrome). Client component (pxlkit), but the headline/sub render
 * into SSR HTML. CTA data is injected from the app's config; Link is injected
 * (LinkComponent) so the package has no Next dependency.
 */
export function BlogToolCta({
  cta,
  LinkComponent,
  className,
}: BlogToolCtaProps) {
  const Link = LinkComponent ?? defaultLink

  return (
    <PixelBox
      tone="green"
      variant="soft"
      radius="md"
      padding="md"
      className={cn(
        'not-prose mx-auto my-10 flex max-w-2xl flex-col items-start gap-4 sm:flex-row sm:items-center',
        className
      )}
    >
      <div className="pxl-corner-sm flex size-10 shrink-0 items-center justify-center border-2 border-retro-green/30 bg-retro-green/15 text-retro-green">
        <Zap className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-retro-text text-sm font-normal uppercase tracking-wider">
          {cta.headline}
        </p>
        <p className="text-retro-muted mt-0.5 text-sm">{cta.sub}</p>
      </div>
      <Link
        href={cta.href}
        className="pxl-corner-sm inline-flex shrink-0 items-center gap-1.5 border-2 border-retro-green/30 bg-retro-green/18 px-4 py-2 text-sm font-medium text-retro-green transition-all duration-150 hover:bg-retro-green/25"
      >
        {cta.ctaLabel || 'Try it free'} <ArrowRight className="size-4" />
      </Link>
    </PixelBox>
  )
}

function defaultLink({
  href,
  target,
  children,
  className,
}: {
  href: string
  target?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={href} target={target} className={cn(className)}>
      {children}
    </a>
  )
}
