'use client';

import * as React from 'react';

import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerShareStats {
  width: number;
  height: number;
  colorCount: number;
  totalBeads: number;
}

export interface PerlerShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 图纸 PNG 快照（画布 toDataURL） */
  imageSrc: string | null;
  stats: PerlerShareStats | null;
  /** 色号系统名（如 'MARD'） */
  colorSystemLabel?: string;
  /** 分享文案生成（app 注入） */
  buildShareText?: (stats: PerlerShareStats) => string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads share modal — pixel retro chrome. Displays a PNG snapshot +
 * a shareable text summary the user can copy, and offers PNG download. Pure
 * presentation; image + stats + share-text builder are injected by the app.
 */
export function ShareModal({
  isOpen,
  onClose,
  imageSrc,
  stats,
  colorSystemLabel,
  buildShareText,
  t = defaultPerlerT,
}: PerlerShareModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const resolvedBuildShareText = buildShareText ?? ((stats: PerlerShareStats): string =>
    t('shBuildText', {
      width: stats.width,
      height: stats.height,
      system: colorSystemLabel ?? '',
      colorCount: stats.colorCount,
      totalBeads: stats.totalBeads,
    }));
  const shareText = stats ? resolvedBuildShareText(stats) : '';

  const handleCopy = async () => {
    if (!shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用时降级：选中文本由用户手动复制
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `PixelMaster-pattern-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md overflow-hidden border-2 border-foreground/15 bg-background pxl-corner-md shadow-lg">
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between border-b-2 border-foreground/10 pb-3">
            <h3 className="font-display text-lg uppercase tracking-wider">{t('shTitle')}</h3>
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

          {!imageSrc || !stats ? (
            <p className="py-10 text-center font-mono text-sm text-muted-foreground">
              {t('shNotReady')}
            </p>
          ) : (
            <div className="space-y-4">
              {/* 图纸预览 */}
              <div className="mx-auto w-full max-h-56 overflow-hidden border-2 border-foreground/20 bg-retro-bg p-2 pxl-corner-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt={t('shPreviewAlt')} className="h-auto w-full object-contain" />
              </div>

              {/* 统计信息 */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="border-2 border-foreground/15 bg-retro-surface/30 p-2 pxl-corner-sm">
                  <div className="font-mono text-lg font-bold text-retro-cyan">{stats.width}×{stats.height}</div>
                  <div className="text-xs text-muted-foreground">{t('shSize')}</div>
                </div>
                <div className="border-2 border-foreground/15 bg-retro-surface/30 p-2 pxl-corner-sm">
                  <div className="font-mono text-lg font-bold text-retro-pink">{stats.colorCount}</div>
                  <div className="text-xs text-muted-foreground">{t('shColorCount')}</div>
                </div>
                <div className="border-2 border-foreground/15 bg-retro-surface/30 p-2 pxl-corner-sm">
                  <div className="font-mono text-lg font-bold text-retro-gold">{stats.totalBeads}</div>
                  <div className="text-xs text-muted-foreground">{t('shBeadCount')}</div>
                </div>
                <div className="border-2 border-foreground/15 bg-retro-surface/30 p-2 pxl-corner-sm">
                  <div className="font-mono text-sm font-bold text-retro-green leading-[1.35rem]">{colorSystemLabel || '—'}</div>
                  <div className="text-xs text-muted-foreground">{t('shColorSystem')}</div>
                </div>
              </div>

              {/* 分享文案 */}
              <div className="border-2 border-foreground/15 bg-retro-surface/20 p-3 pxl-corner-sm">
                <textarea
                  readOnly
                  value={shareText}
                  rows={4}
                  className="w-full resize-none bg-transparent font-mono text-xs text-foreground outline-none"
                  onFocus={(e) => e.currentTarget.select()}
                />
              </div>

              {/* 操作 */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 border-2 border-retro-cyan bg-retro-cyan/15 px-4 py-2 font-mono text-sm uppercase tracking-wider text-retro-cyan transition-all hover:bg-retro-cyan/25 pxl-corner-sm"
                >
                  {copied ? t('shCopied') : t('shCopy')}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 border-2 border-retro-green bg-retro-green/15 px-4 py-2 font-mono text-sm uppercase tracking-wider text-retro-green transition-all hover:bg-retro-green/25 pxl-corner-sm"
                >
                  {t('shDownloadPng')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
