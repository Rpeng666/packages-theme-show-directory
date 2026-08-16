'use client';

import * as React from 'react';

import { PixelButton, PixelCard } from '@pxlkit/ui-kit';
import type { PerlerT } from './i18n';
import { communityDefaultPerlerT } from './community-i18n';

/**
 * Perler community card — community gallery 图纸卡片（带查看/编辑/分享）。
 *
 * 由 community 页重构前的卡片原样移植：pxlkit PixelCard 容器 + 居中缩略图 +
 * 底部三枚彩色操作按钮（◉ 查看 / ✎ 编辑 / ⇪ 分享）+ 标题 / 作者 / 描述 /
 * 尺寸统计。每个操作可独立注入，缺省不渲染对应按钮。
 *
 * 缩略图由 app 的 `renderMedia` 提供（canvas 像素图），包内只负责 chrome 与
 * 交互。文案通过 `t`（app 注入 useTranslations('perler')）解析，缺省中文
 * （communityDefaultPerlerT），与其它 perler 展示组件约定一致。
 */
export interface PerlerCommunityCardProps {
  title: string;
  author: string;
  description?: string;
  /** 网格统计行（如 `10×10  5色  120豆`）；缺省隐藏 */
  renderStats?: React.ReactNode;
  /** 顶部媒体插槽 — canvas 缩略图 / 图片 */
  media?: React.ReactNode;
  /** 喜欢状态（受控）；缺省隐藏 ♥ 计数 */
  liked?: boolean;
  /** 喜欢总数（受控） */
  likes?: number;
  /** 缩略图右上角 ♥ 喜欢切换 */
  onLike?: () => void;
  /** ◉ 查看 → 打开原图/图纸对比弹窗 */
  onView?: () => void;
  /** ✎ 编辑 → 在工作台打开 */
  onEdit?: () => void;
  /** ⇪ 分享 → 打开分享弹窗 */
  onShare?: () => void;
  /** 翻译函数（app 注入 useTranslations('perler'）；缺省中文） */
  t?: PerlerT;
  className?: string;
}

export function PerlerCommunityCard({
  title,
  author,
  description,
  renderStats,
  media,
  liked = false,
  likes = 0,
  onLike,
  onView,
  onEdit,
  onShare,
  t: tProp,
  className,
}: PerlerCommunityCardProps) {
  const t = tProp ?? communityDefaultPerlerT;

  return (
    <PixelCard
      tone="cyan"
      padding="sm"
      className={className}
      media={
        media != null ? (
          <div className="bg-retro-surface/40 p-3">
            <div className="relative mx-auto max-w-[200px]">
              {media}
              {onLike && (
                <button
                  type="button"
                  aria-pressed={liked}
                  aria-label={`${liked ? '♥' : '♡'} ${title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike();
                  }}
                  className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full border border-foreground/20 bg-background text-base leading-none shadow-sm transition-colors hover:border-retro-pink hover:text-retro-pink"
                >
                  {liked ? '♥' : '♡'}
                </button>
              )}
            </div>
          </div>
        ) : undefined
      }
      footer={
        <div className="grid grid-cols-3 gap-1.5">
          {onView && (
            <PixelButton variant="soft" tone="cyan" size="sm" fullWidth onClick={onView}>
              ◉ {t('cmView')}
            </PixelButton>
          )}
          {onEdit && (
            <PixelButton variant="soft" tone="green" size="sm" fullWidth onClick={onEdit}>
              ✎ {t('cmEditOnIt')}
            </PixelButton>
          )}
          {onShare && (
            <PixelButton variant="soft" tone="gold" size="sm" fullWidth onClick={onShare}>
              ⇪ {t('cmShare')}
            </PixelButton>
          )}
        </div>
      }
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-mono text-sm font-bold text-foreground">{title}</h3>
          {likes > 0 && (
            <span className="shrink-0 font-mono text-xs text-retro-pink">
              ♥ {likes}
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {t('cmBy')} {author}
        </p>
        {description && (
          <p className="mt-1.5 line-clamp-2 font-mono text-[11px] leading-relaxed text-muted-foreground/80">
            {description}
          </p>
        )}
        {renderStats && (
          <div className="mt-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {renderStats}
          </div>
        )}
      </div>
    </PixelCard>
  );
}

export default PerlerCommunityCard;
