'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelTooltip, PixelIconButton, PixelSlider } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { defaultPerlerT, type PerlerT } from './i18n';
import type { PerlerToolId } from './perler-tool-rail';

export interface PerlerWorkBarProps {
  /** Currently active tool. */
  activeTool: PerlerToolId;
  /** Emit the newly selected tool. */
  onToolChange: (tool: PerlerToolId) => void;
  /** Undo / redo availability. */
  canUndo: boolean;
  onUndo: () => void;
  canRedo: boolean;
  onRedo: () => void;
  /** Reset the editing (clear manual edits, keep the image). */
  onResetEdit: () => void;
  /** Count beads → toast. */
  onCountBeads: () => void;
  /** Reference-image visibility + opacity. */
  referenceVisible: boolean;
  onToggleReference: () => void;
  referenceOpacity: number;
  onReferenceOpacityChange: (next: number) => void;
  onChangeReference: () => void;
  onRemoveReference: () => void;
  hasReference: boolean;
  /** Export actions. */
  onDownload: () => void;
  onSavePattern: () => void;
  onShare: () => void;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
  className?: string;
}

/** Primary tools (always shown) + secondary (line/rect/select) after a divider. */
const PRIMARY_TOOLS: { id: PerlerToolId; icon: string; labelKey: string }[] = [
  { id: 'brush', icon: 'pencil', labelKey: 'toolBrush' },
  { id: 'eraser', icon: 'eraser', labelKey: 'toolEraser' },
  { id: 'fill', icon: 'paint-bucket', labelKey: 'toolFill' },
  { id: 'eyedropper', icon: 'eyedropper', labelKey: 'toolEyedropper' },
  { id: 'hand', icon: 'hand', labelKey: 'toolHand' },
];

const SECONDARY_TOOLS: { id: PerlerToolId; icon: string; labelKey: string }[] = [
  { id: 'line', icon: 'line', labelKey: 'toolLine' },
  { id: 'rect', icon: 'rectangle', labelKey: 'toolRect' },
  { id: 'select', icon: 'selection', labelKey: 'toolSelect' },
];

/**
 * PerlerWorkBar — the sticky work bar at the top of the center content area.
 * Groups: tools (brush/eraser/fill/eyedropper/pan + line/rect/select), edit
 * (undo/redo/reset-edit), data (count beads), reference (toggle + opacity),
 * export (download/save/share). Pure presentation; handlers injected.
 */
export function PerlerWorkBar({
  activeTool,
  onToolChange,
  canUndo,
  onUndo,
  canRedo,
  onRedo,
  onResetEdit,
  onCountBeads,
  referenceVisible,
  onToggleReference,
  referenceOpacity,
  onReferenceOpacityChange,
  onChangeReference,
  onRemoveReference,
  hasReference,
  onDownload,
  onSavePattern,
  onShare,
  t = defaultPerlerT,
  className,
}: PerlerWorkBarProps) {
  const renderTool = (tool: { id: PerlerToolId; icon: string; labelKey: string }) => {
    const isActive = tool.id === activeTool;
    return (
      <PixelTooltip key={tool.id} content={t(tool.labelKey)} position="bottom" trigger="hover" delay={150}>
        <PixelIconButton
          label={t(tool.labelKey)}
          size="sm"
          tone={isActive ? 'cyan' : 'neutral'}
          icon={<PixelIcon name={tool.icon} size={15} />}
          onClick={() => onToolChange(tool.id)}
          className={cn(isActive && 'border-current/40 bg-current/10')}
        />
      </PixelTooltip>
    );
  };

  const divider = <span className="mx-0.5 h-6 w-px shrink-0 bg-foreground/15" aria-hidden />;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1 border-b-2 border-foreground/10 bg-retro-surface/40 px-2 py-1.5',
        className,
      )}
    >
      {/* Tools */}
      {PRIMARY_TOOLS.map(renderTool)}
      {divider}
      {SECONDARY_TOOLS.map(renderTool)}

      {divider}

      {/* Edit */}
      <PixelIconButton label={t('undo')} size="sm" tone="neutral" icon={<PixelIcon name="undo" size={14} />} onClick={onUndo} disabled={!canUndo} />
      <PixelIconButton label={t('redo')} size="sm" tone="neutral" icon={<PixelIcon name="redo" size={14} />} onClick={onRedo} disabled={!canRedo} />
      <PixelIconButton label={t('wbResetEdit')} size="sm" tone="neutral" icon={<PixelIcon name="redo" size={14} />} onClick={onResetEdit} />

      {divider}

      {/* Count beads */}
      <PixelIconButton label={t('wbCount')} size="sm" tone="neutral" icon={<PixelIcon name="grid" size={14} />} onClick={onCountBeads} />

      {divider}

      {/* Reference image */}
      <PixelTooltip content={t('wbReference')} position="bottom" trigger="hover" delay={150}>
        <PixelIconButton
          label={t('wbReference')}
          size="sm"
          tone={referenceVisible ? 'gold' : 'neutral'}
          icon={<PixelIcon name="search" size={14} />}
          onClick={onToggleReference}
        />
      </PixelTooltip>
      {hasReference && (
        <>
          <div className="w-20 shrink-0">
            <PixelSlider
              label={t('refOpacity')}
              min={5}
              max={100}
              step={1}
              value={referenceOpacity}
              onChange={onReferenceOpacityChange}
              tone="gold"
              showTooltip="never"
            />
          </div>
          <PixelIconButton label={t('refChange')} size="sm" tone="neutral" icon={<PixelIcon name="upload" size={13} />} onClick={onChangeReference} />
          <PixelIconButton label={t('refRemove')} size="sm" tone="neutral" icon={<PixelIcon name="close" size={13} />} onClick={onRemoveReference} />
        </>
      )}

      {divider}

      {/* Export */}
      <PixelIconButton label={t('wbDownload')} size="sm" tone="green" icon={<PixelIcon name="download" size={14} />} onClick={onDownload} />
      <PixelIconButton label={t('wbSave')} size="sm" tone="green" icon={<PixelIcon name="copy" size={14} />} onClick={onSavePattern} />
      <PixelIconButton label={t('wbShare')} size="sm" tone="green" icon={<PixelIcon name="external-link" size={14} />} onClick={onShare} />
    </div>
  );
}
