'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerFloatingToolbarProps {
  isManualColoringMode: boolean;
  isPaletteOpen: boolean;
  onTogglePalette: () => void;
  onExitManualMode: () => void;
  onToggleMagnifier: () => void;
  isMagnifierActive: boolean;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads floating toolbar — pixel retro chrome. Pure presentation; the
 * app injects all callbacks.
 */
export function FloatingToolbar({
  isManualColoringMode,
  isPaletteOpen,
  onTogglePalette,
  onExitManualMode,
  onToggleMagnifier,
  isMagnifierActive,
  t = defaultPerlerT,
}: PerlerFloatingToolbarProps) {
  if (!isManualColoringMode) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <button
        type="button"
        onClick={onTogglePalette}
        className={cn(
          'flex size-12 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200',
          isPaletteOpen
            ? 'border-retro-cyan/60 bg-retro-cyan/20 text-retro-cyan'
            : 'border-foreground/20 bg-retro-surface/40 text-muted-foreground hover:border-retro-cyan/50 hover:text-retro-cyan'
        )}
        title={isPaletteOpen ? t('cpClosePalette') : t('cpOpenPalette')}
      >
        <svg className="size-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onToggleMagnifier}
        className={cn(
          'flex size-12 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200',
          isMagnifierActive
            ? 'border-retro-green/60 bg-retro-green/20 text-retro-green'
            : 'border-foreground/20 bg-retro-surface/40 text-muted-foreground hover:border-retro-green/50 hover:text-retro-green'
        )}
        title={isMagnifierActive ? t('fmCloseMagnify') : t('fmOpenMagnify')}
      >
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onExitManualMode}
        className="flex size-12 items-center justify-center rounded-full border-2 border-retro-red/60 bg-retro-red/20 text-retro-red shadow-lg transition-all duration-200 hover:bg-retro-red/30"
        title={t('fmExitManual')}
      >
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
