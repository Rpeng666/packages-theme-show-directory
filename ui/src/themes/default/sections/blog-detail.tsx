'use client'

import { CalendarIcon } from 'lucide-react'

import { cn } from '../../../lib/utils'
import type { BlogDetailProps } from '../../../contracts/sections/blog-detail'

/*
 * Default (shadcn) blog-detail — article chrome (title / cover / author card /
 * responsive grid). Heavy app dependencies (fumadocs TOC, Crumb, Markdown
 * rendering) are injected as `tocSlot` / `contentSlot` ReactNodes — the
 * package owns only the default-theme chrome. Business data (post) comes from
 * the app's DB layer.
 */
export function BlogDetail({
  post,
  tocSlot,
  contentSlot,
}: BlogDetailProps) {
  const showToc = !!tocSlot
  const showAuthor = post.author_name || post.author_image || post.author_role

  const getMainColSpan = () => {
    if (showToc && showAuthor) return 'lg:col-span-6'
    if (showToc || showAuthor) return 'lg:col-span-9'
    return 'lg:col-span-12'
  }

  return (
    <section id={post.id}>
      <div className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          {/* Header Section */}
          <div className="mt-16 text-center">
            <h1 className="text-foreground mx-auto mb-4 w-full text-3xl font-bold md:max-w-4xl md:text-4xl">
              {post.title}
            </h1>
            <div className="text-muted-foreground text-md mb-8 flex items-center justify-center gap-4">
              {post.created_at && (
                <div className="flex items-center justify-center gap-2">
                  <CalendarIcon className="size-4" /> {post.created_at}
                </div>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {post.image && (
            <div className="border-border mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-2xl border shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title || ''}
                className="aspect-16/9 w-full object-cover"
              />
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-12">
            {/* Table of Contents - Left Sidebar (injected slot) */}
            {tocSlot && (
              <div className="lg:col-span-3">
                <div className="sticky top-24 hidden md:block">
                  <div className="bg-muted/30 rounded-lg p-4">{tocSlot}</div>
                </div>
              </div>
            )}

            {/* Main Content - Center (injected slot) */}
            <div className={cn(getMainColSpan())}>
              <div className="p-0">{contentSlot}</div>
            </div>

            {/* Author Info - Right Sidebar */}
            {showAuthor && (
              <div className="lg:col-span-3">
                <div className="sticky top-24">
                  <div className="bg-muted/30 rounded-lg p-6 text-center">
                    {post.author_image && (
                      <div className="ring-foreground/10 mx-auto mb-4 aspect-square size-20 overflow-hidden rounded-xl border border-transparent shadow-md ring-1 shadow-black/15">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.author_image}
                          alt={post.author_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    {post.author_name && (
                      <p className="text-foreground mb-1 text-lg font-semibold">
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
        </div>
      </div>
    </section>
  )
}
