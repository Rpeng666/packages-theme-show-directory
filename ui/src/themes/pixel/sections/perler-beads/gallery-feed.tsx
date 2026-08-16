'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { cn } from '../../../../lib/utils';
import type { PerlerT } from './i18n';
import { galleryDefaultPerlerT } from './gallery-i18n';

/**
 * Community gallery feed — 拼豆图纸信息流瀑布（Pinterest / 小红书式）。
 *
 * Self-contained feed: sticky top bar (title + topic chips) + CSS multi-column
 * masonry. The package owns ALL chrome and layout — the app only supplies data
 * (patterns + topics), a per-pattern thumbnail renderer (`renderMedia`), and
 * action callbacks (`onLike`/`onOpen`/`onEdit`/`onShare`). Like state and the
 * localStorage key are managed here.
 *
 * 布局：
 * - 顶部 48px 吸附条：左侧像素 logo 块 + 页面标题，右侧主题筛选 chips
 *   （横向可滚动、选中反转色）。首屏几乎全被信息流占据。
 * - 信息流占满父级宽度（由页面 main 决定，如 w-[90vw]），CSS 多列瀑布流
 *   （columns-2 md:columns-3 lg:columns-4 2xl:columns-5），卡片高度随
 *   缩略图纵横比错落。
 * - 卡片由 app 的 `renderMedia` 提供缩略图（canvas 像素图 / 图片），package
 *   负责包裹圆角缩略图容器、悬停渐变信息浮层、右上角 ♥、图下标题/作者/喜欢数。
 *
 * 文案通过 `t`（app 注入 useTranslations('perler')）解析，缺省中文
 * （galleryDefaultPerlerT），与其它 perler 展示组件约定一致。
 */

/** 社区图纸分类（主题筛选 chips 用） */
export type PerlerGalleryTopic =
  | 'fruit'
  | 'animals'
  | 'ocean'
  | 'pixel-art'
  | 'party';

/** 社区图纸条目数据（app 注入；尺寸/豆量等由 renderMedia 自行从 grid 计算展示） */
export interface PerlerGalleryItem {
  id: string;
  title: string;
  author: string;
  likes: number;
  topic: PerlerGalleryTopic;
}

export interface PerlerGalleryFeedProps {
  /** 信息流条目数据（接入后端后由 app 提供） */
  items: PerlerGalleryItem[];
  /** 主题筛选选项（key 需与 item.topic 对应） */
  topics: Array<{ key: PerlerGalleryTopic | 'all'; label: string }>;
  /** 顶部标题（app 传入 t('cmTitle')） */
  title: string;
  /** 探索主题 aria 标签（app 传入 t('cmExploreTopics')） */
  exploreLabel?: string;
  /**
   * 每张卡片的缩略图（canvas 像素图 / 图片 / 任意节点）。
   * 布局上它会被放入固定宽（列宽）、高随内容变化的媒体容器，因此渲染高
   * 度应按父宽度自适应（如 canvas style width:100% height:auto）。
   */
  renderMedia: (item: PerlerGalleryItem) => React.ReactNode;
  /**
   * 卡片缩略图悬停浮层里的次要信息行（如 `10×10 · 120 豆`）。
   * 缺省隐藏该行；app 可用 stats 组合展示。
   */
  renderMeta?: (item: PerlerGalleryItem) => React.ReactNode;
  /** 缩略图点击 → 查看详情（如打开原图对比弹窗） */
  onOpen?: (item: PerlerGalleryItem) => void;
  /** 缩略图悬停浮层“编辑”点击 → 在工作台打开 */
  onEdit?: (item: PerlerGalleryItem) => void;
  /** 缩略图右上角 ♥ 喜欢切换 */
  onLike?: (item: PerlerGalleryItem) => void;
  /** 卡片标题右侧分享动作（如弹分享弹窗）；缺省不渲染 */
  onShare?: (item: PerlerGalleryItem) => void;
  /** 每页渐进加载的条数（“查看更多”步进） */
  pageSize?: number;
  /** localStorage 喜欢状态键（app 可自定义；改键会丢旧状态） */
  storageKey?: string;
  /** 翻译函数（app 注入 useTranslations('perler'）；缺省中文） */
  t?: PerlerT;
  className?: string;
}

const DEFAULT_PAGE_SIZE = 6;
const DEFAULT_STORAGE_KEY = 'gallaryLikes';

/** 顶部吸附条 — logo 块 + 标题（左）+ 主题筛选 chips（右，横向滚动） */
function FeedTopBar({
  title,
  topics,
  active,
  onSelect,
  exploreLabel,
}: {
  title: string;
  topics: Array<{ key: PerlerGalleryTopic | 'all'; label: string }>;
  active: PerlerGalleryTopic | 'all';
  onSelect: (key: PerlerGalleryTopic | 'all') => void;
  exploreLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-30 -mx-3 border-b border-foreground/10 bg-background/85 px-3 backdrop-blur-sm sm:-mx-4 sm:px-4">
      <div className="mx-auto flex h-12 max-w-[1720px] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {/* 像素 logo 块 */}
          <div
            className="grid size-5 shrink-0 grid-cols-2 gap-[2px] rounded-[3px] border border-foreground/25 bg-card p-[2px]"
            aria-hidden
          >
            <span className="bg-retro-red" />
            <span className="bg-retro-gold" />
            <span className="bg-retro-green" />
            <span className="bg-retro-cyan" />
          </div>
          <h1 className="truncate font-display text-sm font-bold uppercase tracking-wider">
            {title}
          </h1>
        </div>
        {/* 主题筛选 chips — 横向可滚动 */}
        <div
          className="ml-auto flex shrink-0 items-center gap-1.5 overflow-x-auto"
          role="tablist"
          aria-label={exploreLabel}
        >
          {topics.map((topic) => {
            const isActive = active === topic.key;
            return (
              <button
                key={topic.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(topic.key)}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors',
                  isActive
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-foreground/15 bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                )}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

/** 信息流单格 — 宽度固定（列宽），高度随缩略图纵横比错落 */
function FeedCard({
  item,
  liked,
  onLike,
  onOpen,
  onEdit,
  onShare,
  renderMedia,
  renderMeta,
  t,
}: {
  item: PerlerGalleryItem;
  liked: boolean;
  onLike: () => void;
  onOpen?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  renderMedia: (item: PerlerGalleryItem) => React.ReactNode;
  renderMeta?: (item: PerlerGalleryItem) => React.ReactNode;
  t: PerlerT;
}) {
  return (
    <article className="mb-3 break-inside-avoid">
      {/* 缩略图 — 点击查看对比 */}
      <div
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-lg border border-foreground/10 bg-retro-surface/40',
          !onOpen && 'cursor-default'
        )}
        onClick={onOpen}
      >
        {renderMedia(item)}
        {/* 悬停渐变 — 尺寸 / 豆量 / 编辑 */}
        {renderMeta && (
          <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between bg-gradient-to-t from-black/70 via-black/35 to-transparent px-2.5 py-1.5 group-hover:flex">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">
              {renderMeta(item)}
            </span>
            {onEdit && (
              <span className="flex items-center gap-0.5 font-mono text-[10px] uppercase tracking-wider text-retro-gold">
                <span aria-hidden>✎</span>
                {t('cmEditOnIt')}
              </span>
            )}
          </div>
        )}
        {/* 喜欢 — 右上角 */}
        <button
          type="button"
          aria-pressed={liked}
          aria-label={`${liked ? '♥' : '♡'} ${item.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className={cn(
            'absolute top-2 right-2 flex size-7 items-center justify-center rounded-full border text-xs leading-none backdrop-blur transition-all',
            liked
              ? 'border-transparent bg-retro-pink text-white'
              : 'border-foreground/15 bg-background/85 text-foreground/70 hover:border-retro-pink hover:text-retro-pink'
          )}
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>

      {/* 标题 + 作者 / 喜欢数 */}
      <div className="mt-1.5 px-0.5">
        <h3 className="truncate font-mono text-[13px] font-bold text-foreground">
          {item.title}
        </h3>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate font-mono text-[11px] text-muted-foreground">
            {item.author}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <span
              className={cn(
                'flex items-center gap-1 font-mono text-[11px]',
                liked ? 'text-retro-pink' : 'text-muted-foreground/70'
              )}
            >
              {liked ? '♥' : '♡'} {item.likes}
            </span>
            {onShare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
                className="font-mono text-[11px] text-retro-cyan transition-colors hover:text-retro-green"
              >
                {t('cmShare')}
              </button>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

export function PerlerGalleryFeed({
  items,
  topics,
  title,
  exploreLabel,
  renderMedia,
  renderMeta,
  onOpen,
  onEdit,
  onLike,
  onShare,
  pageSize = DEFAULT_PAGE_SIZE,
  storageKey = DEFAULT_STORAGE_KEY,
  t: tProp,
  className,
}: PerlerGalleryFeedProps) {
  const t = tProp ?? galleryDefaultPerlerT;
  const [activeTopic, setActiveTopic] = useState<PerlerGalleryTopic | 'all'>('all');
  const [visible, setVisible] = useState(pageSize);
  // 喜欢 — localStorage 记忆（storageKey: string[]）
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // 读回 localStorage 的喜欢状态（仅客户端）
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setLikedIds(JSON.parse(raw) as string[]);
    } catch {
      /* 忽略损坏数据 */
    }
  }, [storageKey]);

  const isLiked = (id: string) => likedIds.includes(id);

  const toggleLike = (item: PerlerGalleryItem) => {
    setLikedIds((prev) => {
      const next = prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* 隐私模式下忽略写入失败 */
      }
      return next;
    });
  };

  const filteredItems = useMemo(
    () =>
      activeTopic === 'all'
        ? items
        : items.filter((p) => p.topic === activeTopic),
    [items, activeTopic]
  );

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visible),
    [filteredItems, visible]
  );

  const hasMore = visibleItems.length < filteredItems.length;

  return (
    <div className={cn('py-3', className)}>
      {/* 顶部吸附条 — 标题 + 主题筛选（紧凑，首屏留给信息流） */}
      <FeedTopBar
        title={title}
        topics={topics}
        active={activeTopic}
        exploreLabel={exploreLabel}
        onSelect={(key) => {
          setActiveTopic(key);
          setVisible(pageSize);
        }}
      />

      {/* 瀑布流 — CSS 多列（Pinterest / 小红书式），占满父级宽度，卡片 mb-3 */}
      <div className="mt-4 columns-2 gap-3 md:columns-3 lg:columns-4 2xl:columns-5">
        {visibleItems.map((item) => (
          <FeedCard
            key={item.id}
            item={item}
            liked={isLiked(item.id)}
            onLike={() => toggleLike(item)}
            onOpen={onOpen ? () => onOpen(item) : undefined}
            onEdit={onEdit ? () => onEdit(item) : undefined}
            onShare={onShare ? () => onShare(item) : undefined}
            renderMedia={renderMedia}
            renderMeta={renderMeta}
            t={t}
          />
        ))}
      </div>

      {/* 查看更多 / 到底了 */}
      <div className="mt-6 flex justify-center">
        {hasMore ? (
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="rounded-full border border-foreground/20 bg-card px-6 py-2 font-display text-[11px] uppercase tracking-wider text-foreground transition-all hover:border-foreground/50"
          >
            {t('cmShowMore')}
          </button>
        ) : (
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            — {t('cmShowLess')} —
          </span>
        )}
      </div>
    </div>
  );
}

export default PerlerGalleryFeed;
