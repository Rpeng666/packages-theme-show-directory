'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import type { PerlerT } from './i18n';

/**
 * Perler gallery card — pixel-retro feed card for the community gallery.
 *
 * A self-contained presentational card: renders the pattern title / author /
 * dimensions, a leading color key (the palette letters used in the pattern),
 * an interactive ♥ like button, and a small "grid" glyph footer. The pixel
 * thumbnail itself is canvas-drawn by the app (it needs the pattern grid
 * data); this component only owns the card chrome around it.
 *
 * Interactive parts (liked / onOpen / onLike) are optional so the card also
 * works as a static item; copy is resolved through the injected `t`
 * (app-side useTranslations('perler')), defaulting to Chinese.
 */
export interface PerlerGalleryCardProps {
  /** Unique id (like-state + React key). */
  id: string;
  title: string;
  author: string;
  /** Grid dimensions, e.g. "10×10". */
  size: string;
  /** Color count badge, e.g. "5". */
  colorCount: string;
  /** Bead count, e.g. "120". */
  beadCount: string;
  /** Leading palette colors (hex) rendered as small pixel swatches. */
  colors: string[];
  /** Like state (controlled). */
  liked?: boolean;
  /** Total like count shown in the footer. */
  likes?: number;
  /** Top media slot — the canvas thumbnail. */
  media?: React.ReactNode;
  /** Rendered when liked (overrides the default ♥). */
  likedMark?: React.ReactNode;
  /** Fired on like toggle. */
  onLike?: () => void;
  /** Fired when clicking the card body (e.g. view details). */
  onOpen?: () => void;
  /** Fired when clicking the edit footer action. */
  onEdit?: () => void;
  /** Translation fn — app injects useTranslations('perler'); default zh. */
  t?: PerlerT;
  className?: string;
}

export function PerlerGalleryCard({
  id,
  title,
  author,
  size,
  colorCount,
  beadCount,
  colors,
  liked = false,
  likes = 0,
  media,
  likedMark,
  onLike,
  onOpen,
  onEdit,
  t,
  className,
}: PerlerGalleryCardProps) {
  const likeLabel = liked ? '♥' : '♡';

  return (
    <article
      className={cn(
        'group flex h-full break-inside-avoid flex-col overflow-hidden border-2 border-foreground/15 bg-card pxl-corner-sm shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
        onOpen && 'cursor-pointer',
        className
      )}
    >
      {/* 缩略图 — app 注入的 canvas 像素图 */}
      {media != null && (
        <div className="relative">
          {media}
          {/* 色键 — 左上角像素色块 */}
          {colors.length > 0 && (
            <div
              className="absolute top-2 left-2 flex flex-col gap-0.5 border-2 border-foreground/20 bg-background/80 p-1 pxl-corner-xs"
              aria-hidden
            >
              {colors.map((hex) => (
                <span
                  key={hex}
                  className="block size-3 border border-black/20"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          )}
          {/* 喜欢角标 — 右上角（受控） */}
          <button
            type="button"
            aria-pressed={liked}
            aria-label={`${likeLabel} ${title}`}
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
            className={cn(
              'absolute top-2 right-2 flex size-8 items-center justify-center border-2 pxl-corner-sm text-base leading-none transition-all',
              liked
                ? 'border-retro-pink bg-retro-pink text-white shadow-sm'
                : 'border-foreground/20 bg-background/80 text-foreground/70 hover:border-retro-pink hover:text-retro-pink'
            )}
          >
            {liked ? (likedMark ?? '♥') : '♡'}
          </button>
        </div>
      )}

      {/* 卡片主体 — 点击查看详情 */}
      <div
        className={cn('flex flex-1 flex-col gap-1.5 p-3', onOpen && 'cursor-pointer')}
        onClick={onOpen}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-sm font-bold text-foreground">{title}</h3>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {t?.('cmBy') ?? '作者'} {author}
        </p>
        <div className="mt-1 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
          <span>{size}</span>
          <span>{colorCount} {t?.('cmColors') ?? '色'}</span>
          <span>{beadCount} {t?.('cmBeads') ?? '豆'}</span>
        </div>
      </div>

      {/* 底部操作 — 编辑 / 喜欢数 */}
      <div className="flex items-center justify-between gap-2 border-t border-foreground/10 px-3 py-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-retro-cyan transition-colors hover:text-retro-green"
        >
          <span aria-hidden>✎</span>
          {t?.('cmEditOnIt') ?? '编辑'}
        </button>
        <span
          className={cn(
            'flex items-center gap-1 font-mono text-[11px] transition-colors',
            liked ? 'text-retro-pink' : 'text-muted-foreground/70'
          )}
        >
          {liked ? '♥' : '♡'} {likes}
        </span>
      </div>
    </article>
  );
}

export default PerlerGalleryCard;
