import React from 'react';
import { cn } from '../../lib/utils';

interface StepItem {
  title?: string;
  children: React.ReactNode;
}

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn('not-prose my-6 space-y-0', className)}>
      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="border-b px-5 py-3">
          <h3 className="text-base font-semibold text-foreground">Instructions</h3>
        </div>
        <ol className="divide-y divide-border">
          {React.Children.map(children, (child, i) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, { _index: i + 1 })
              : child
          )}
        </ol>
      </div>
    </div>
  );
}

export function Step({
  title,
  children,
  _index,
}: StepItem & { _index?: number }) {
  return (
    <li className="flex gap-4 px-5 py-4">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
        {_index}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="mb-1 font-semibold text-sm text-foreground">{title}</p>
        )}
        <div className="text-sm text-muted-foreground leading-relaxed [&>p]:m-0">
          {children}
        </div>
      </div>
    </li>
  );
}
