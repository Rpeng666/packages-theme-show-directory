'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelButton } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerSelectionArea {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface PerlerSelectionOverlayProps {
  /** Whether the selection tool is active (drawing allowed). */
  isActive: boolean;
  /** The result canvas (for coordinate mapping). */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  gridDimensions: { N: number; M: number } | null;
  /** Current selection (null = none). */
  selection: PerlerSelectionArea | null;
  /** Emit a newly drawn selection. */
  onSelectionChange: (area: PerlerSelectionArea) => void;
  /** Clear the selection. */
  onClear: () => void;
  /** Actions on the selected region (fill / erase / copy / paste). */
  onFill?: () => void;
  onErase?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  /** Whether a copied block exists (enables paste). */
  canPaste?: boolean;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
  className?: string;
}

/**
 * PerlerSelectionOverlay — rubber-band region selection over the pixel
 * canvas (reuses the magnifier-selection-overlay drag pattern). Renders the
 * dashed box mapped to screen coords + a small floating action toolbar
 * (fill / erase / copy / paste / clear).
 */
export function PerlerSelectionOverlay({
  isActive,
  canvasRef,
  gridDimensions,
  selection,
  onSelectionChange,
  onClear,
  onFill,
  onErase,
  onCopy,
  onPaste,
  canPaste = false,
  t = defaultPerlerT,
  className,
}: PerlerSelectionOverlayProps) {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ row: number; col: number } | null>(null);
  const [dragEnd, setDragEnd] = React.useState<{ row: number; col: number } | null>(null);

  const clientToGrid = React.useCallback(
    (clientX: number, clientY: number): { row: number; col: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas || !gridDimensions) return null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.max(0, Math.min(canvas.width, (clientX - rect.left) * scaleX));
      const y = Math.max(0, Math.min(canvas.height, (clientY - rect.top) * scaleY));
      const cellW = canvas.width / gridDimensions.N;
      const cellH = canvas.height / gridDimensions.M;
      const col = Math.max(0, Math.min(gridDimensions.N - 1, Math.floor(x / cellW)));
      const row = Math.max(0, Math.min(gridDimensions.M - 1, Math.floor(y / cellH)));
      return { row, col };
    },
    [canvasRef, gridDimensions],
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (!isActive) return;
      const grid = clientToGrid(event.clientX, event.clientY);
      if (!grid) return;
      setIsSelecting(true);
      setDragStart(grid);
      setDragEnd(grid);
      event.preventDefault();
    },
    [isActive, clientToGrid],
  );

  React.useEffect(() => {
    if (!isSelecting) return;
    const handleMove = (event: MouseEvent) => {
      if (!dragStart) return;
      const grid = clientToGrid(event.clientX, event.clientY);
      if (grid) setDragEnd(grid);
    };
    const handleUp = () => {
      if (dragStart && dragEnd) {
        onSelectionChange({
          startRow: Math.min(dragStart.row, dragEnd.row),
          startCol: Math.min(dragStart.col, dragEnd.col),
          endRow: Math.max(dragStart.row, dragEnd.row),
          endCol: Math.max(dragStart.col, dragEnd.col),
        });
      }
      setIsSelecting(false);
      setDragStart(null);
      setDragEnd(null);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isSelecting, dragStart, dragEnd, clientToGrid, onSelectionChange]);

  // Map a grid rect to screen coords for the dashed box.
  // Compute the dashed-box screen rect in an effect (reading the canvas DOM
  // only outside render) and store it in state.
  const [box, setBox] = React.useState<{ left: number; top: number; width: number; height: number } | null>(null);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const area = selection ?? (dragStart && dragEnd ? { startRow: Math.min(dragStart.row, dragEnd.row), startCol: Math.min(dragStart.col, dragEnd.col), endRow: Math.max(dragStart.row, dragEnd.row), endCol: Math.max(dragStart.col, dragEnd.col) } : null);
    if (!canvas || !gridDimensions || !area) {
      setBox(null);
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const cellW = rect.width / gridDimensions.N;
    const cellH = rect.height / gridDimensions.M;
    const left = rect.left + area.startCol * cellW;
    const top = rect.top + area.startRow * cellH;
    const width = (area.endCol - area.startCol + 1) * cellW;
    const height = (area.endRow - area.startRow + 1) * cellH;
    setBox({ left, top, width, height });
  }, [canvasRef, gridDimensions, selection, dragStart, dragEnd]);

  if (!isActive && !selection) return null;

  return (
    <>
      {/* Drag capture (only while actively drawing) */}
      {isActive && (
        <div
          className="fixed inset-0 z-[60] cursor-crosshair"
          onMouseDown={handleMouseDown}
          aria-hidden
        />
      )}

      {/* Dashed selection box */}
      {box && (
        <div
          className="pointer-events-none fixed z-[60] border-2 border-dashed border-retro-cyan bg-retro-cyan/10"
          style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
          aria-hidden
        />
      )}

      {/* Selection action toolbar */}
      {selection && (
        <div
          className={cn(
            'fixed z-[61] flex items-center gap-1 border-2 border-foreground/15 bg-retro-surface/80 p-1.5 pxl-corner-sm shadow-xl backdrop-blur-sm',
            className,
          )}
          style={{
            left: Math.max(8, Math.min(box ? box.left : 8, window.innerWidth - 340)),
            top: Math.max(8, (box ? box.top : 8) - 46),
          }}
        >
          {onFill ? (
            <PixelButton size="sm" tone="cyan" variant="soft" onClick={onFill} iconLeft={<PixelIcon name="paint-bucket" size={12} />}>
              {t('selFill')}
            </PixelButton>
          ) : null}
          {onErase ? (
            <PixelButton size="sm" tone="red" variant="soft" onClick={onErase} iconLeft={<PixelIcon name="eraser" size={12} />}>
              {t('selErase')}
            </PixelButton>
          ) : null}
          {onCopy ? (
            <PixelButton size="sm" tone="neutral" variant="soft" onClick={onCopy} iconLeft={<PixelIcon name="copy" size={12} />}>
              {t('selCopy')}
            </PixelButton>
          ) : null}
          {onPaste ? (
            <PixelButton size="sm" tone="green" variant="soft" onClick={onPaste} disabled={!canPaste} iconLeft={<PixelIcon name="upload" size={12} />}>
              {t('selPaste')}
            </PixelButton>
          ) : null}
          <PixelButton size="sm" tone="neutral" variant="ghost" onClick={onClear} iconLeft={<PixelIcon name="close" size={12} />}>
            {t('selClear')}
          </PixelButton>
        </div>
      )}
    </>
  );
}
