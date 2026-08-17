'use client'

import { Calendar } from 'lucide-react'

import { Avatar } from '../../../themes/default/avatar'
import { cn } from '../../../lib/utils'
import type {
  BlogCategory,
  BlogLink,
  BlogPost,
  BlogProps,
} from '../../../contracts/sections/blog'

/*
 * Default (shadcn) blog — category filter pills + post cards. Business data
 * (categories / currentCategory / posts) is injected as serializable props;
 * links render through the injected LinkComponent (package has no Next
 * dependency), falling back to native <a>. The empty-state label is injected
 * via emptyText so the package carries no hardcoded copy.
 */
export function Blog({
  section,
  className,
  categories,
  currentCategory,
  posts,
  LinkComponent,
  emptyText,
  ...rest
}: BlogProps) {
  const Link = LinkComponent ?? defaultLink

  return (
    <section
      {...rest}
      id={section.id}
      className={cn('py-24 md:py-36', section.className, className)}
    >
      <div className="mx-auto mb-12 text-center">
        {section.sr_only_title && (
          <h1 className="sr-only">{section.sr_only_title}</h1>
        )}
        <h2 className="mb-6 text-3xl font-bold text-pretty lg:text-4xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground mb-4 max-w-xl lg:max-w-none lg:text-lg">
          {section.description}
        </p>
      </div>

      <div className="container flex flex-col items-center gap-8 lg:px-16">
        {categories && categories.length > 0 && (
          <div className="mb-2 flex flex-wrap items-center justify-center gap-4">
            <div className="border bg-muted inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground">
              {categories.map((category: BlogCategory) => {
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
                      'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                      isActive
                        ? 'bg-background text-foreground shadow-sm'
                        : 'hover:text-foreground'
                    )}
                  >
                    {category.title}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {posts && posts.length > 0 ? (
          <div className="flex w-full flex-wrap items-start">
            {posts?.map((item: BlogPost, idx) => (
              <Link
                key={idx}
                href={item.url || ''}
                target={item.target || '_self'}
                className="w-full p-4 md:w-1/3"
              >
                <div className="border-border flex flex-col overflow-clip rounded-xl border">
                  {item.image && (
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title || ''}
                        className="aspect-16/9 h-full w-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="px-4 py-4 md:px-4 md:py-4 lg:px-4 lg:py-4">
                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 md:mb-4 lg:mb-6">
                      {item.description}
                    </p>

                    <div className="text-muted-foreground flex items-center text-xs">
                      {item.created_at && (
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          {item.created_at}
                        </div>
                      )}
                      <div className="flex-1"></div>
                      {(item.author_name || item.author_image) && (
                        <div className="flex items-center gap-2">
                          {item.author_image && (
                            <Avatar
                              name={item.author_name || ''}
                              src={item.author_image}
                              size="sm"
                            />
                          )}
                          {item.author_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-md py-8">
            {emptyText || section.tip || 'No posts yet.'}
          </div>
        )}
      </div>
    </section>
  )
}

const defaultLink: BlogLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
)
