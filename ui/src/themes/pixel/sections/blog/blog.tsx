'use client'

import { Calendar } from 'lucide-react'

import { PixelAvatar } from '@pxlkit/ui-kit'
import { PixelCard } from '@pxlkit/ui-kit'
import { cn } from '../../../../lib/utils'
import type { BlogProps } from '../../../../contracts/sections/blog'

/*
 * Pixel blog — chamfered post cards on a blueprint grid backdrop, rebuilt
 * from pxlkit components (PixelCard + PixelAvatar). Client component (pxlkit
 * components need the client boundary), BUT the post titles / descriptions /
 * images / authors / dates render into the SSR HTML — there are no mounted
 * gates or client-only branches, so search engines see the full content.
 * Business data (posts/categories/currentCategory) is injected from the app's
 * DB layer. Link is injected (LinkComponent) so the package has no Next
 * dependency.
 */
export function Blog({
  section,
  className,
  categories,
  currentCategory,
  posts,
  LinkComponent,
}: BlogProps) {
  const Link = LinkComponent ?? defaultLink

  return (
    <section
      id={section.id}
      className={cn(
        'relative bg-background py-24 md:py-36',
        section.className,
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 scanlines"
        aria-hidden="true"
      />

      <div className="relative mx-auto mb-12 text-center">
        {section.sr_only_title && (
          <h1 className="sr-only">{section.sr_only_title}</h1>
        )}
        <h2 className="font-display mb-6 text-xl font-normal uppercase tracking-wider text-pretty lg:text-2xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground mb-4 max-w-xl text-sm leading-relaxed lg:max-w-none lg:text-base">
          {section.description}
        </p>
      </div>

      <div className="container relative flex flex-col items-center gap-8 lg:px-16">
        {categories && categories.length > 0 && (
          <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const isActive = currentCategory?.slug === category.slug
              const href =
                !category.slug || category.slug === 'all'
                  ? '/blog'
                  : `/blog/category/${category.slug}`
              return (
                <Link
                  key={category.slug || category.id || category.title}
                  href={href}
                  className={cn(
                    'pxl-corner-sm border-2 px-3 py-1.5 font-mono text-xs transition-all duration-150',
                    isActive
                      ? 'border-retro-green/40 bg-retro-green/18 text-retro-green pxl-shadow'
                      : 'border-retro-border bg-retro-surface/40 text-retro-muted hover:text-retro-text hover:bg-retro-surface/60'
                  )}
                >
                  {category.title}
                </Link>
              )
            })}
          </div>
        )}

        {posts && posts.length > 0 ? (
          <div className="flex w-full flex-wrap items-start">
            {posts?.map((item, idx) => (
              <div key={idx} className="w-full p-4 md:w-1/3">
                <PixelCard
                  href={item.url || ''}
                  target={item.target || '_self'}
                  title={item.title || ''}
                  description={item.description || ''}
                  descriptionLines={3}
                  media={
                    item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title || ''}
                        className="aspect-16/9 h-full w-full object-cover object-center"
                      />
                    ) : undefined
                  }
                  footer={
                    <div className="flex items-center gap-2 text-xs text-retro-muted">
                      {item.created_at && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="size-3.5" />
                          {item.created_at}
                        </span>
                      )}
                      <span className="flex-1" />
                      {(item.author_name || item.author_image) && (
                        <span className="inline-flex items-center gap-1.5">
                          <PixelAvatar
                            name={item.author_name || 'U'}
                            src={item.author_image}
                            size="xs"
                            shape="rounded"
                          />
                          {item.author_name}
                        </span>
                      )}
                    </div>
                  }
                  className="group h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-md py-8">
            {section.tip || 'No posts yet.'}
          </div>
        )}
      </div>
    </section>
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
    <a href={href} target={target} className={className}>
      {children}
    </a>
  )
}
