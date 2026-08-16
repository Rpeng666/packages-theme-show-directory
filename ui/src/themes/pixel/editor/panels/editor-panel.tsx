'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelIconButton } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';

export interface EditorPanelProps {
  /** Panel title shown in the header bar. */
  title: string;
  /** Optional leading icon name (pixel-icon registry kebab name). */
  icon?: string;
  /** Callback fired when the panel is collapsed. */
  onCollapse?: () => void;
  /** Optional right-side slot (e.g. a reset button). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * EditorPanel — a titled, collapsible panel body used inside an editor
 * sidebar. Retro chrome: hard border, mono title bar, corner accents.
 */
export function EditorPanel({
  title,
  icon,
  onCollapse,
  action,
  children,
  className,
}: EditorPanelProps) {
  return (
    <section className={cn('flex h-full w-full flex-col border-2 border-foreground/10 bg-background', className)}>
      <header className="flex items-center justify-between gap-2 border-b-2 border-foreground/10 bg-retro-surface/40 px-3 py-2.5">
        <h3 className="flex min-w-0 items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
          {icon ? <PixelIcon name={icon} size={14} /> : null}
          <span className="truncate">{title}</span>
        </h3>
        <div className="flex shrink-0 items-center gap-1">
          {action}
          {onCollapse ? (
            <PixelIconButton
              label="collapse"
              size="sm"
              tone="neutral"
              icon={<PixelIcon name="close" size={12} />}
              onClick={onCollapse}
            />
          ) : null}
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-3">{children}</div>
    </section>
  );
}
