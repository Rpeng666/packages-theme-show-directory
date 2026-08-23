import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ArticleLink {
  title: string;
  href: string;
  description?: string;
}

interface ArticleGroup {
  label: string;
  articles: ArticleLink[];
}

interface RelatedArticlesProps {
  groups: ArticleGroup[];
  browseAll?: ArticleLink;
}

function ArticleCard({ title, href, description }: ArticleLink) {
  return (
    <a
      href={href}
      className={cn(
        'group flex flex-col gap-1 rounded-lg border bg-card p-4 shadow-sm',
        'transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5',
        'no-underline'
      )}
    >
      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
        {title}
      </span>
      {description && (
        <span className="text-xs text-muted-foreground leading-relaxed">{description}</span>
      )}
      <span className="mt-1 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Read article <ArrowRightIcon className="size-3" />
      </span>
    </a>
  );
}

export function RelatedArticles({ groups, browseAll }: RelatedArticlesProps) {
  return (
    <div className="not-prose mt-12 border-t pt-10">
      <h2 className="mb-6 text-xl font-bold text-foreground">Related Articles</h2>
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.articles.map((article) => (
                <ArticleCard key={article.href} {...article} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {browseAll && (
        <div className="mt-6">
          <a
            href={browseAll.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline no-underline"
          >
            {browseAll.title} <ArrowRightIcon className="size-4" />
          </a>
        </div>
      )}
    </div>
  );
}
