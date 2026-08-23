'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { resolveComponent } from '../../../../registry';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerFocusHeaderProps {
  /** 标题（默认取 t('fmFocusTitle')，如“专心拼豆”） */
  title?: string;
  onBack: () => void;
  onSettings: () => void;
  /** 当前颜色（点亮右侧豆子色点，可选） */
  currentColor?: string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
  className?: string;
}

/**
 * Perler-beads focus-mode header — pixel retro chrome. Immersive fullscreen
 * workbench top bar: pixel-dot accents, retro back / settings buttons, and a
 * display-face title. Pure presentation; copy + callbacks injected by the app.
 */
export function FocusHeader({
  title,
  onBack,
  onSettings,
  currentColor,
  t = defaultPerlerT,
  className,
}: PerlerFocusHeaderProps) {
  const Button = resolveComponent('Button');

  return (
    <header
      className={cn(
        'relative flex h-14 items-center justify-between overflow-hidden border-b-2 border-foreground/15 bg-retro-surface/40 px-3 sm:px-4',
        className
      )}
    >
      {/* 像素点阵装饰（左右两侧） */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 grid-cols-5 items-center gap-1 opacity-20 sm:grid">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="size-1 rounded-sm bg-foreground/40" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 grid-cols-5 items-center gap-1 opacity-20 sm:grid">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="size-1 rounded-sm bg-foreground/40" />
        ))}
      </div>

      {/* 返回 */}
      <Button
        type="button"
        variant="ghost"
        tone="neutral"
        size="sm"
        onClick={onBack}
        className="relative z-10 flex items-center gap-1 px-1 font-mono text-sm uppercase tracking-wider"
        aria-label={t('back')}
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">{t('back')}</span>
      </Button>

      {/* 标题 + 当前颜色豆子 */}
      <div className="relative z-10 flex items-center gap-2">
        <h1 className="font-display text-sm uppercase tracking-wider text-foreground sm:text-base">
          {title ?? t('fmFocusTitle')}
        </h1>
        {currentColor && (
          <span
            className="size-3 rounded-full border-2 border-foreground/30 shadow-sm"
            style={{ backgroundColor: currentColor }}
            aria-hidden
          />
        )}
      </div>

      {/* 设置 */}
      <Button
        type="button"
        variant="ghost"
        tone="neutral"
        size="sm"
        onClick={onSettings}
        className="relative z-10 px-1"
        aria-label={t('settings')}
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </Button>
    </header>
  );
}
