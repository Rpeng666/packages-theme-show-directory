import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProConProps {
  pros: string[];
  cons: string[];
  proTitle?: string;
  conTitle?: string;
  className?: string;
}

export function ProCon({
  pros,
  cons,
  proTitle = 'Pros',
  conTitle = 'Cons',
  className,
}: ProConProps) {
  return (
    <div className={cn('not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
      <div className="rounded-xl border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
        <div className="border-b border-green-200 dark:border-green-800 px-4 py-3">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">{proTitle}</p>
        </div>
        <ul className="px-4 py-3 space-y-2">
          {pros.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
        <div className="border-b border-red-200 dark:border-red-800 px-4 py-3">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">{conTitle}</p>
        </div>
        <ul className="px-4 py-3 space-y-2">
          {cons.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <XIcon className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
