'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { resolveComponent } from '../../../../registry';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerToolBarProps {
  onColorSelect: () => void;
  onLocate: () => void;
  onPause: () => void;
  isPaused: boolean;
  elapsedTime: string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads toolbar — pixel retro chrome. Pure presentation; the app
 * injects the callbacks. Uses registered primitives + retro classes.
 */
export function ToolBar({
  onColorSelect,
  onLocate,
  onPause,
  isPaused,
  elapsedTime,
  t = defaultPerlerT,
}: PerlerToolBarProps) {
  const Stack = resolveComponent('Stack');
  const Cluster = resolveComponent('Cluster');
  const Button = resolveComponent('Button');

  return (
    <Stack
      direction="row"
      gap={1}
      justify="around"
      align="center"
      className="border-t-2 border-foreground/15 bg-retro-surface/40 px-4 py-2"
    >
      <Button
        type="button"
        variant="ghost"
        tone="neutral"
        size="sm"
        onClick={onColorSelect}
        className="flex flex-col items-center gap-1"
      >
        <svg className="size-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-widest">{t('fmColor')}</span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        tone="neutral"
        size="sm"
        onClick={onLocate}
        className="flex flex-col items-center gap-1"
      >
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-widest">{t('fmLocate')}</span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        tone={isPaused ? 'green' : 'red'}
        size="sm"
        onClick={onPause}
        className="flex flex-col items-center gap-1"
      >
        {isPaused ? (
          <svg className="size-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="size-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        <span className="font-mono text-[10px] tabular-nums">{elapsedTime}</span>
      </Button>
    </Stack>
  );
}
