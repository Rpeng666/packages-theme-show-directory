'use client';

import * as React from 'react';

import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerImageCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 原图（真实照片 / 合成原图） */
  beforeSrc: string | null;
  /** 像素化图纸（画布快照） */
  afterSrc: string | null;
  beforeLabel?: string;
  afterLabel?: string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads image compare modal — drag slider that reveals the original
 * photo vs the pixelated bead pattern. Pure presentation; both image sources
 * are injected by the app.
 */
export function ImageCompareModal({
  isOpen,
  onClose,
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  t = defaultPerlerT,
}: PerlerImageCompareModalProps) {
  const [pos, setPos] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);

  if (!isOpen) return null;

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const resolvedBeforeLabel = beforeLabel ?? t('shCompareBefore');
  const resolvedAfterLabel = afterLabel ?? t('shCompareAfter');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseUp={onPointerUp}>
      <div className="w-full max-w-3xl border-2 border-foreground/15 bg-background pxl-corner-md shadow-2xl">
        <div className="flex items-center justify-between border-b-2 border-foreground/10 px-4 py-3">
          <h3 className="font-display text-lg uppercase tracking-wider">{t('shCompare')}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground/70 hover:text-foreground"
            aria-label={t('close')}
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {!beforeSrc || !afterSrc ? (
            <p className="py-10 text-center font-mono text-sm text-muted-foreground">
              {t('shNoCompare')}
            </p>
          ) : (
            <div
              ref={containerRef}
              className="relative select-none overflow-hidden border-2 border-foreground/20 pxl-corner-md bg-retro-bg"
              style={{ aspectRatio: '1 / 1', maxHeight: '60vh' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
            >
              {/* 原图（底层，完整） */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beforeSrc}
                alt={resolvedBeforeLabel}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
              {/* 图纸（上层，裁切到右侧 pos%） */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={afterSrc}
                alt={resolvedAfterLabel}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                draggable={false}
              />

              {/* 分隔线 */}
              <div
                className="absolute inset-y-0 w-1 cursor-ew-resize bg-retro-cyan shadow-lg"
                style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-retro-cyan bg-background shadow-lg">
                  <svg className="size-4 text-retro-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5m8-10l4 5-4 5" />
                  </svg>
                </div>
              </div>

              {/* 标签 */}
              <span className="absolute left-2 top-2 rounded-sm bg-background/80 px-2 py-0.5 font-mono text-xs text-foreground pxl-corner-sm">
                {resolvedBeforeLabel}
              </span>
              <span className="absolute right-2 top-2 rounded-sm bg-retro-cyan/20 px-2 py-0.5 font-mono text-xs text-retro-cyan pxl-corner-sm">
                {resolvedAfterLabel}
              </span>
            </div>
          )}

          <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
            {t('shCompareHint')}
          </p>
        </div>
      </div>
    </div>
  );
}
