'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import type { EditorT } from './editor-i18n';
import { defaultEditorT } from './editor-i18n';

export interface EditorToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left zone — brand + "What's new" etc. */
  left?: React.ReactNode;
  /** Center zone — quick actions (Reset / Compare / Background / Gradient). */
  center?: React.ReactNode;
  /** Right zone — Export / Upgrade. */
  right?: React.ReactNode;
  t?: EditorT;
  className?: string;
}

/**
 * EditorToolbar — the top bar of an image editor, split into three zones
 * (left / center / right). Pure layout chrome; the app injects the actual
 * buttons. Retro hard border + mono typography.
 */
export function EditorToolbar({
  left,
  center,
  right,
  className,
  ...rest
}: EditorToolbarProps) {
  return (
    <div
      {...rest}
      className={cn(
        'flex h-14 shrink-0 items-center justify-between gap-3 border-b-2 border-foreground/10 bg-retro-surface/40 px-3',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">{left}</div>
      <div className="flex shrink-0 items-center gap-1">{center}</div>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        {right}
      </div>
    </div>
  );
}
