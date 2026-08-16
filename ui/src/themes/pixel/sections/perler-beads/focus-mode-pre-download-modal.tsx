'use client';

import * as React from 'react';

import type { PerlerMappedPixel, PerlerColorSystem } from '../../../../contracts/perler-beads/types';
import { defaultPerlerT, type PerlerT } from './i18n';

export type { PerlerColorSystem } from '../../../../contracts/perler-beads/types';

export interface PerlerFocusModePreDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedWithoutDownload: () => void;
  mappedPixelData: PerlerMappedPixel[][] | null;
  gridDimensions: { N: number; M: number } | null;
  selectedColorSystem: PerlerColorSystem;
  /** 注入 CSV 导出（app 提供算法） */
  exportCsv?: (opts: {
    mappedPixelData: PerlerMappedPixel[][] | null;
    gridDimensions: { N: number; M: number } | null;
    selectedColorSystem: PerlerColorSystem;
  }) => void;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads focus-mode pre-download modal — pixel retro chrome. Pure
 * presentation; the app injects the CSV export algorithm (`exportCsv`) and
 * the proceed/close callbacks.
 */
export function FocusModePreDownloadModal({
  isOpen,
  onClose,
  onProceedWithoutDownload,
  mappedPixelData,
  gridDimensions,
  selectedColorSystem,
  exportCsv,
  t = defaultPerlerT,
}: PerlerFocusModePreDownloadModalProps) {
  if (!isOpen) return null;

  const handleDownloadAndProceed = () => {
    exportCsv?.({
      mappedPixelData,
      gridDimensions,
      selectedColorSystem,
    });

    // 稍等一下让下载开始，然后进入专心拼豆模式
    setTimeout(() => {
      onProceedWithoutDownload();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md overflow-hidden border-2 border-foreground/15 bg-background pxl-corner-md shadow-lg">
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b-2 border-foreground/10 pb-3">
            <h3 className="font-display text-lg uppercase tracking-wider">{t('fmTitle')}</h3>
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

          <div className="space-y-4">
            <div className="flex items-center gap-3 border-2 border-retro-gold/30 bg-retro-gold/10 pxl-corner-sm p-3">
              <svg className="size-5 shrink-0 text-retro-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-mono text-sm font-semibold uppercase tracking-wider text-retro-gold">{t('fmWarning')}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('fmWarningDesc')}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-sm text-foreground">{t('fmFeatures')}</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>{t('fmF1')}</li>
                <li>{t('fmF2')}</li>
                <li>{t('fmF3')}</li>
                <li>{t('fmF4')}</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t-2 border-foreground/10 pt-4">
            <button
              type="button"
              onClick={handleDownloadAndProceed}
              className="flex w-full items-center justify-center gap-2 border-2 border-retro-green bg-retro-green/20 px-4 py-2.5 font-mono text-sm font-semibold text-retro-green pxl-corner-sm transition-all hover:bg-retro-green/30"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t('fmDownloadAndEnter')}</span>
            </button>

            <button
              type="button"
              onClick={onProceedWithoutDownload}
              className="w-full border-2 border-foreground/20 bg-retro-surface/30 px-4 py-2.5 font-mono text-sm text-muted-foreground pxl-corner-sm transition-all hover:bg-retro-surface/50"
            >
              {t('fmEnterNoDownload')}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
