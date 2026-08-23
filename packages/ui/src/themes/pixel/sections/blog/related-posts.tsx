'use client'

import { ArrowRight } from 'lucide-react'

import { PixelCard } from '@pxlkit/ui-kit'
import { cn } from '../../../../lib/utils'
import type { RelatedPostsProps } from '../../../../contracts/sections/blog-cta'

/*
 * Pixel related-posts — related article cards on the blog detail page, built
 * from the pxlkit PixelCard (chamfered, hard-offset shadow). Client component
 * (pxlkit), but the titles/descriptions/images render into SSR HTML — no
 * mounted gates. Posts are injected from the app's DB layer; Link is injected
 * (LinkComponent) so the package has no Next dependency.
 */
export function RelatedPosts({ posts,
  LinkComponent,
  className, ...rest }: RelatedPostsProps) {
  const Link = LinkComponent ?? defaultLink

  if (posts.length === 0) return null

  return (
    <div {...rest} className={cn('not-prose mx-auto my-16 w-full max-w-7xl space-y-4 px-6 md:px-8', className)}>
      <h3 className="font-display text-retro-text text-sm font-normal uppercase tracking-wider">
        Related Guides
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <PixelCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            description={post.description}
            descriptionLines={2}
            media={
              post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-video w-full rounded-lg bg-muted object-cover"
                />
              ) : undefined
            }
            footer={
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs text-retro-green"
              >
                Read more <ArrowRight className="size-3" />
              </Link>
            }
            className="group h-full"
          />
        ))}
      </div>
    </div>
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
