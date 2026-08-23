'use client'

import { Calendar } from 'lucide-react'

import { PixelAvatar } from '@pxlkit/ui-kit'
import { PixelCard } from '@pxlkit/ui-kit'
import { cn } from '../../../../lib/utils'
import type { BlogDetailProps } from '../../../../contracts/sections/blog-detail'

/*
 * Pixel blog-detail — article page rebuilt from pxlkit components. Client
 * component (pxlkit needs the boundary), BUT the article title / cover /
 * author / date / related posts render into the SSR HTML (no mounted gates).
 * Heavy app dependencies (fumadocs TOC, Markdown rendering) are injected as
 * `tocSlot` / `contentSlot` ReactNodes — the package owns only the pxlkit
 * chrome. Business data (post/relatedPosts) comes from the app's DB layer.
 * Link is injected (LinkComponent) so the package has no Next dependency.
 */
export function BlogDetail({
  post,
  relatedPosts,
  tocSlot,
  contentSlot,
  LinkComponent,
}: BlogDetailProps) {
  const Link = LinkComponent ?? defaultLink
  const showToc = !!tocSlot
  const showAuthor = post.author_name || post.author_image || post.author_role

  const mainColSpan =
    showToc && showAuthor
      ? 'lg:col-span-6'
      : showToc || showAuthor
        ? 'lg:col-span-9'
        : 'lg:col-span-12'

  return (
    <section id={post.id}>
      <div className="bg-background py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          {/* Header */}
          <div className="mt-16 text-center">
            <h1 className="font-display text-foreground mx-auto mb-4 w-full text-2xl font-normal uppercase tracking-wider md:max-w-4xl md:text-3xl">
              {post.title}
            </h1>
            {post.created_at && (
              <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                <Calendar className="size-4" /> {post.created_at}
              </div>
            )}
          </div>

          {/* Cover image */}
          {post.image && (
            <div className="pxl-corner-md border-2 border-foreground/15 bg-card mx-auto mt-12 w-full max-w-5xl overflow-hidden p-2 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title || ''}
                className="aspect-16/9 w-full object-cover"
              />
            </div>
          )}

          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-12">
            {/* TOC rail (injected slot) */}
            {tocSlot && (
              <div className="lg:col-span-3">
                <div className="sticky top-24 hidden md:block">
                  <div className="pxl-corner-md border-2 border-foreground/15 bg-muted/30 p-4 shadow-sm">
                    {tocSlot}
                  </div>
                </div>
              </div>
            )}

            {/* Main content (injected slot) */}
            <div className={cn(mainColSpan)}>{contentSlot}</div>

            {/* Author card (pxlkit) */}
            {showAuthor && (
              <div className="lg:col-span-3">
                <div className="sticky top-24">
                  <div className="pxl-corner-md border-2 border-foreground/15 bg-muted/30 p-6 text-center shadow-sm">
                    {post.author_image && (
                      <div className="mx-auto mb-4 flex justify-center">
                        <PixelAvatar
                          name={post.author_name || 'A'}
                          src={post.author_image}
                          size="lg"
                          shape="rounded"
                        />
                      </div>
                    )}
                    {post.author_name && (
                      <p className="font-display text-foreground mb-1 text-sm font-normal uppercase tracking-wider">
                        {post.author_name}
                      </p>
                    )}
                    {post.author_role && (
                      <p className="text-muted-foreground mb-4 text-sm">
                        {post.author_role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related posts (pxlkit cards) */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-foreground mb-6 text-center text-lg font-normal uppercase tracking-wider">
                Related Guides
              </h2>
              <div className="flex flex-wrap items-start">
                {relatedPosts.map((item, idx) => (
                  <div key={idx} className="w-full p-4 md:w-1/3">
                    <PixelCard
                      href={`/blog/${item.slug}`}
                      title={item.title}
                      description={item.description}
                      descriptionLines={3}
                      media={
                        item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt={item.title}
                            className="aspect-16/9 h-full w-full object-cover"
                          />
                        ) : undefined
                      }
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
