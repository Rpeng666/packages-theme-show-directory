'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import { PixelTooltip } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../components/pixel-icon';
import type { EditorT } from './editor-i18n';
import { defaultEditorT } from './editor-i18n';

export interface EditorSidebarItem {
  /** Stable id — the active-panel key. */
  id: string;
  /** Icon name for the collapsed rail + panel header. */
  icon: string;
  /** Tooltip / panel title. */
  label: string;
  /** Panel content renderer; receives `closePanel` to collapse the rail. */
  render: (ctx: { closePanel: () => void }) => React.ReactNode;
}

export interface EditorSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar items (icon rail when collapsed, panel when expanded). */
  items: EditorSidebarItem[];
  /** Currently expanded item id, or null for collapsed rail. */
  activeId: string | null;
  /** Select an item (toggle on/off). */
  onItemSelect: (id: string | null) => void;
  /** Fixed expanded width (default 288px). */
  expandedWidth?: number;
  t?: EditorT;
  className?: string;
}

/**
 * EditorSidebar — a Photoroom-style collapsible icon rail.
 *
 * Collapsed: a vertical w-14 rail of icon buttons (tooltip on hover). Expanded:
 * the active item's panel content at `expandedWidth`. One panel at a time;
 * clicking the active rail icon collapses it back.
 */
export function EditorSidebar({
  items,
  activeId,
  onItemSelect,
  expandedWidth = 288,
  className,
  ...rest
}: EditorSidebarProps) {
  const active = items.find((i) => i.id === activeId);

  return (
    <div
      {...rest}
      className={cn(
        'flex h-full shrink-0 border-r-2 border-foreground/10 bg-retro-surface/20',
        className,
      )}
      style={{ width: activeId ? expandedWidth : undefined }}
    >
      {/* Collapsed icon rail */}
      <div className="flex h-full w-14 shrink-0 flex-col items-center gap-1.5 py-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <PixelTooltip
              key={item.id}
              content={item.label}
              position="right"
              trigger="hover"
              delay={150}
            >
              <button
                type="button"
                onClick={() => onItemSelect(isActive ? null : item.id)}
                aria-pressed={isActive}
                aria-label={item.label}
                title={item.label}
                className={cn(
                  'grid size-10 place-items-center border-2 pxl-corner-sm transition-colors',
                  isActive
                    ? 'border-retro-cyan/60 bg-retro-cyan/15 text-retro-cyan'
                    : 'border-foreground/10 bg-retro-surface/30 text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                )}
              >
                <PixelIcon name={item.icon} size={18} />
              </button>
            </PixelTooltip>
          );
        })}
      </div>

      {/* Expanded panel */}
      {active ? (
        <div className="min-w-0 flex-1">
          {active.render({ closePanel: () => onItemSelect(null) })}
        </div>
      ) : null}
    </div>
  );
}
