import React from 'react';
import { cn } from '../../lib/utils';
import { InfoIcon, LightbulbIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';

type CalloutType = 'tip' | 'note' | 'warning' | 'success';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: React.ElementType; classes: string; titleColor: string }> = {
  tip: {
    icon: LightbulbIcon,
    classes: 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800',
    titleColor: 'text-amber-800 dark:text-amber-300',
  },
  note: {
    icon: InfoIcon,
    classes: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    titleColor: 'text-blue-800 dark:text-blue-300',
  },
  warning: {
    icon: AlertTriangleIcon,
    classes: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
    titleColor: 'text-red-800 dark:text-red-300',
  },
  success: {
    icon: CheckCircleIcon,
    classes: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    titleColor: 'text-green-800 dark:text-green-300',
  },
};

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const { icon: Icon, classes, titleColor } = config[type];
  const defaultTitles: Record<CalloutType, string> = {
    tip: 'Tip',
    note: 'Note',
    warning: 'Warning',
    success: 'Good to know',
  };

  return (
    <div className={cn('my-6 rounded-lg border p-4', classes)}>
      <div className={cn('mb-1 flex items-center gap-2 font-semibold text-sm', titleColor)}>
        <Icon className="size-4 shrink-0" />
        {title ?? defaultTitles[type]}
      </div>
      <div className="text-sm text-foreground/80 [&>p]:m-0">{children}</div>
    </div>
  );
}
