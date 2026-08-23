'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import type { EditorT } from './editor-i18n';
import { defaultEditorT } from './editor-i18n';

export interface EditorShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Top toolbar (EditorToolbar or custom). */
  toolbar?: React.ReactNode;
  /** Left sidebar (EditorSidebar or custom). */
  left?: React.ReactNode;
  /** Center pane (EditorCanvas or custom). */
  center?: React.ReactNode;
  /** Right sidebar (EditorSidebar or custom). */
  right?: React.ReactNode;
  /** Bottom status bar (optional). */
  status?: React.ReactNode;
  t?: EditorT;
  className?: string;
  children?: React.ReactNode;
}

/**
 * EditorShell — the full three-pane image-editor frame.
 *
 * Layout:
 * ```
 * ┌──────────────────────────────┐
 * │ toolbar (h-14)               │
 * ├────────┬───────────┬─────────┤
 * │ left   │  center   │  right  │
 * │ (flex) │  (flex-1) │ (flex)  │
 * ├────────┴───────────┴─────────┤
 * │ status (optional)            │
 * └──────────────────────────────┘
 * ```
 *
 * Pure layout chrome — the app injects each pane. `children` is an alias for
 * `center` (either works). Reusable across image-design SaaS.
 */
export function EditorShell({
  toolbar,
  left,
  center,
  right,
  status,
  className,
  children,
  ...rest
}: EditorShellProps) {
  return (
    <div
      {...rest}
      className={cn('flex h-full w-full flex-col overflow-hidden bg-background text-foreground', className)}
    >
      {toolbar}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {left}
        <div className="flex min-w-0 flex-1 overflow-hidden">
          {center ?? children}
        </div>
        {right}
      </div>
      {status}
    </div>
  );
}
