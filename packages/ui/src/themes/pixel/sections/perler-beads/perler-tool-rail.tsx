'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelTooltip } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { defaultPerlerT, type PerlerT } from './i18n';

export type PerlerToolId =
  | 'hand'
  | 'brush'
  | 'eraser'
  | 'fill'
  | 'line'
  | 'rect'
  | 'select'
  | 'eyedropper';

export interface PerlerToolRailProps {
  /** Currently active tool. */
  activeTool: PerlerToolId;
  /** Emit the newly selected tool. */
  onToolChange: (tool: PerlerToolId) => void;
  /** Disabled (e.g. no image loaded yet). */
  disabled?: boolean;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
  className?: string;
}

const TOOLS: { id: PerlerToolId; icon: string; labelKey: string }[] = [
  { id: 'hand', icon: 'hand', labelKey: 'toolHand' },
  { id: 'brush', icon: 'pencil', labelKey: 'toolBrush' },
  { id: 'eraser', icon: 'eraser', labelKey: 'toolEraser' },
  { id: 'fill', icon: 'paint-bucket', labelKey: 'toolFill' },
  { id: 'line', icon: 'line', labelKey: 'toolLine' },
  { id: 'rect', icon: 'rectangle', labelKey: 'toolRect' },
  { id: 'select', icon: 'selection', labelKey: 'toolSelect' },
  { id: 'eyedropper', icon: 'eyedropper', labelKey: 'toolEyedropper' },
];

/**
 * PerlerToolRail — the persistent vertical tool rail (Aseprite-style) beside
 * the pixel canvas. Always visible once an image is loaded; the selected tool
 * drives how canvas clicks/drags behave. Pure presentation.
 */
export function PerlerToolRail({
  activeTool,
  onToolChange,
  disabled = false,
  t = defaultPerlerT,
  className,
}: PerlerToolRailProps) {
  return (
    <div
      className={cn(
        'flex w-14 shrink-0 flex-col items-center gap-1.5 border-r-2 border-foreground/10 bg-retro-surface/30 py-2',
        disabled && 'opacity-60',
        className,
      )}
    >
      {TOOLS.map((tool) => {
        const isActive = tool.id === activeTool;
        return (
          <PixelTooltip
            key={tool.id}
            content={t(tool.labelKey)}
            position="right"
            trigger="hover"
            delay={150}
          >
            <button
              type="button"
              onClick={() => onToolChange(tool.id)}
              aria-pressed={isActive}
              aria-label={t(tool.labelKey)}
              title={t(tool.labelKey)}
              disabled={disabled}
              className={cn(
                'grid size-10 place-items-center border-2 pxl-corner-sm transition-colors',
                isActive
                  ? 'border-retro-cyan/60 bg-retro-cyan/15 text-retro-cyan'
                  : 'border-foreground/10 bg-retro-surface/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                disabled && 'cursor-not-allowed',
              )}
            >
              <PixelIcon name={tool.icon} size={18} />
            </button>
          </PixelTooltip>
        );
      })}
    </div>
  );
}
