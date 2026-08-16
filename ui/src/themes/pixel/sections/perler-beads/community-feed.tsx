'use client';

import React, { useMemo, useState } from 'react';

import { PixelCard } from '@pxlkit/ui-kit';
import { cn } from '../../../../lib/utils';
import type { PerlerT } from './i18n';
import { communityDefaultPerlerT } from './community-i18n';
import { PerlerCommunityCard } from './community-card';

/**
 * Community layout — 分类入口 + 编辑精选 + 信息流（Dribbble / Behance 式）。
 *
 * Self-contained three-section layout. The package owns ALL chrome and layout;
 * the app only supplies data (patterns + topic/category options), per-pattern
 * thumbnail renderers (`renderMedia`), and action callbacks
 * (`onOpen`/`onEdit`/`onShare`). Like state + the localStorage key live here.
 *
 * 视觉统一：全页卡片均用 pxlkit PixelCard 那套框（Topics 方块、Staff Picks
 * 大卡片、All Patterns 信息流卡片全部是 PixelCard 派生），不引入自建边框。
 *
 * 结构（从上到下）：
 * 1. 紧凑顶栏 — 像素 logo 块 + 页面标题 + 分类 chips（横向可滚动）
 * 2. Explore Topics — 一行 PixelCard 小方块（每个 = 图标/色块 + 分类名 + 数量），点击筛选
 * 3. Explore Staff Picks — 3 张 PerlerCommunityCard 大卡片（查看/编辑/分享 + 统计）
 * 4. All Patterns 信息流 — 同款 PerlerCommunityCard 瀑布流，渐进加载
 *
 * 文案通过 `t`（app 注入 useTranslations('perler')）解析，缺省中文
 * （communityDefaultPerlerT）。
 */

/** 社区图纸分类（顶栏 chips / 下方信息流筛选用） */
export type PerlerCommunityCategory = 'all' | 'popular' | 'simple' | 'big' | 'new';

/** 社区图纸主题（Explore Topics 方块用） */
export type PerlerCommunityTopic =
  | 'fruit'
  | 'animals'
  | 'ocean'
  | 'pixel-art'
  | 'party';

/** 社区图纸条目数据（app 注入） */
export interface PerlerCommunityItem {
  id: string;
  title: string;
  author: string;
  description?: string;
  likes: number;
  category: Exclude<PerlerCommunityCategory, 'all'>;
  topic: PerlerCommunityTopic;
}

/** Explore Topics 小方块配置 */
export interface PerlerCommunityTopicTile {
  key: PerlerCommunityTopic;
  label: string;
  /** 色块（每个方块视觉锚点） */
  swatch?: string;
  /** 方块内的像素图标（如 "🍎" / "🐸"） */
  icon?: string;
}

export interface PerlerCommunityFeedProps {
  /** 全部图纸数据 */
  items: PerlerCommunityItem[];
  /** 顶栏分类筛选选项 */
  categories: Array<{ key: PerlerCommunityCategory; label: string }>;
  /** Explore Topics 方块列表 */
  topicTiles: PerlerCommunityTopicTile[];
  /** 顶栏标题（app 传入 t('cmTitle')） */
  title: string;
  /** 每张卡片的缩略图（canvas 像素图 / 图片 / 任意节点）；布局上会放入
   *  固定宽（列宽 / 卡片宽）、高随内容变化的媒体容器，渲染高度应随父宽自适应 */
  renderMedia: (item: PerlerCommunityItem) => React.ReactNode;
  /** 卡片主体统计行（尺寸/色数/豆量；Staff Picks + 信息流卡片 body 用） */
  renderStats?: (item: PerlerCommunityItem) => React.ReactNode;
  /** 点击卡片 ◉ 查看 → 打开原图/图纸对比弹窗 */
  onOpen?: (item: PerlerCommunityItem) => void;
  /** 卡片 ✎ 编辑 → 在工作台打开 */
  onEdit?: (item: PerlerCommunityItem) => void;
  /** 卡片 ⇪ 分享 → 打开分享弹窗 */
  onShare?: (item: PerlerCommunityItem) => void;
  /** 每页渐进加载的条数（“查看更多”步进） */
  pageSize?: number;
  /** localStorage 喜欢状态键（app 可自定义） */
  storageKey?: string;
  /** 翻译函数（app 注入 useTranslations('perler'）；缺省中文） */
  t?: PerlerT;
  className?: string;
}

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_STORAGE_KEY = 'gallaryLikes';

/** 紧凑顶栏 — logo 块 + 标题（左）+ 分类 chips（右，横向滚动） */
function CommunityTopBar({
  title,
  categories,
  active,
  onSelect,
}: {
  title: string;
  categories: Array<{ key: PerlerCommunityCategory; label: string }>;
  active: PerlerCommunityCategory;
  onSelect: (key: PerlerCommunityCategory) => void;
}) {
  return (
    <header className="sticky top-0 z-30 -mx-3 border-b border-foreground/10 bg-background/85 px-3 backdrop-blur-sm sm:-mx-4 sm:px-4">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3">
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
        {/* 分类 chips — 横向可滚动 */}
        <div
          className="ml-auto flex shrink-0 items-center gap-1.5 overflow-x-auto"
          role="tablist"
        >
          {categories.map((cat) => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(cat.key)}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors',
                  isActive
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-foreground/15 bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

/** 区块标题 — 像素色块 + 标题（左对齐），用于 Explore Topics / Staff Picks */
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="grid size-4 shrink-0 grid-cols-2 gap-[1px] rounded-[2px] border border-foreground/25 p-[1px]"
        aria-hidden
      >
        <span className="bg-retro-red" />
        <span className="bg-retro-cyan" />
        <span className="bg-retro-green" />
        <span className="bg-retro-gold" />
      </span>
      <h2 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
        {title}
      </h2>
    </div>
  );
}

/** Explore Topics — 一行 PixelCard 小方块（每个 = 色块/图标 + 标签 + 数量），点击筛选 */
function TopicTiles({
  tiles,
  counts,
  active,
  onSelect,
}: {
  tiles: PerlerCommunityTopicTile[];
  counts: Record<string, number>;
  active: PerlerCommunityTopic | 'all';
  onSelect: (key: PerlerCommunityTopic | 'all') => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
      {tiles.map((tile) => {
        const isActive = active === tile.key;
        return (
          <PixelCard
            key={tile.key}
            interactive
            tone={isActive ? 'cyan' : undefined}
            padding="md"
            onClick={() => onSelect(isActive ? 'all' : tile.key)}
            className="h-full"
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span
                className={cn(
                  'grid size-8 place-items-center rounded-md border',
                  tile.swatch
                    ? 'border-black/10'
                    : 'border-foreground/15 bg-background'
                )}
                style={tile.swatch ? { backgroundColor: tile.swatch } : undefined}
                aria-hidden
              >
                {tile.icon ?? null}
              </span>
              <span className="font-mono text-xs font-bold text-foreground">
                {tile.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {counts[tile.key] ?? 0}
              </span>
            </div>
          </PixelCard>
        );
      })}
    </div>
  );
}

/** 统一卡片 — Staff Picks 大卡片 + All Patterns 信息流卡片共用 PerlerCommunityCard */
function CommunityCard({
  item,
  liked,
  onLike,
  onOpen,
  onEdit,
  onShare,
  renderMedia,
  renderStats,
  t,
}: {
  item: PerlerCommunityItem;
  liked: boolean;
  onLike: () => void;
  onOpen?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  renderMedia: (item: PerlerCommunityItem) => React.ReactNode;
  renderStats?: (item: PerlerCommunityItem) => React.ReactNode;
  t: PerlerT;
}) {
  return (
    <PerlerCommunityCard
      title={item.title}
      author={item.author}
      description={item.description}
      renderStats={renderStats ? renderStats(item) : undefined}
      media={renderMedia(item)}
      liked={liked}
      likes={item.likes}
      onLike={onLike}
      onView={onOpen}
      onEdit={onEdit}
      onShare={onShare}
      t={t}
    />
  );
}

export function PerlerCommunityFeed({
  items,
  categories,
  topicTiles,
  title,
  renderMedia,
  renderStats,
  onOpen,
  onEdit,
  onShare,
  pageSize = DEFAULT_PAGE_SIZE,
  storageKey = DEFAULT_STORAGE_KEY,
  t: tProp,
  className,
}: PerlerCommunityFeedProps) {
  const t = tProp ?? communityDefaultPerlerT;
  const [activeCategory, setActiveCategory] = useState<PerlerCommunityCategory>('all');
  const [activeTopic, setActiveTopic] = useState<PerlerCommunityTopic | 'all'>('all');
  const [visible, setVisible] = useState(pageSize);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // 读回 localStorage 的喜欢状态（仅客户端）
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setLikedIds(JSON.parse(raw) as string[]);
    } catch {
      /* 忽略损坏数据 */
    }
  }, [storageKey]);

  const isLiked = (id: string) => likedIds.includes(id);

  const toggleLike = (item: PerlerCommunityItem) => {
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

  // Explore Topics 方块：每个主题的图纸数量
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      counts[item.topic] = (counts[item.topic] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  // 分类 + 主题双层筛选
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        (activeCategory === 'all' || item.category === activeCategory) &&
        (activeTopic === 'all' || item.topic === activeTopic)
    );
  }, [items, activeCategory, activeTopic]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visible),
    [filteredItems, visible]
  );

  // Staff Picks：按 likes 降序取前 3
  const staffPicks = useMemo(
    () => [...items].sort((a, b) => b.likes - a.likes).slice(0, 3),
    [items]
  );

  const hasMore = visibleItems.length < filteredItems.length;

  return (
    <div className={cn('py-3', className)}>
      {/* 紧凑顶栏 — 标题 + 分类 chips */}
      <CommunityTopBar
        title={title}
        categories={categories}
        active={activeCategory}
        onSelect={(key) => {
          setActiveCategory(key);
          setVisible(pageSize);
        }}
      />

      {/* Explore Topics — 一行 PixelCard 小方块 */}
      <section className="mt-6">
        <SectionHeading title={t('cmExploreTopics')} />
        <div className="mt-3">
          <TopicTiles
            tiles={topicTiles}
            counts={topicCounts}
            active={activeTopic}
            onSelect={(key) => {
              setActiveTopic(key);
              setVisible(pageSize);
            }}
          />
        </div>
      </section>

      {/* Explore Staff Picks — 3 张 PerlerCommunityCard 大卡片 */}
      <section className="mt-8">
        <SectionHeading title={t('cmExploreStaffPicks')} />
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staffPicks.map((item) => (
            <CommunityCard
              key={item.id}
              item={item}
              liked={isLiked(item.id)}
              onLike={() => toggleLike(item)}
              onOpen={onOpen ? () => onOpen(item) : undefined}
              onEdit={onEdit ? () => onEdit(item) : undefined}
              onShare={onShare ? () => onShare(item) : undefined}
              renderMedia={renderMedia}
              renderStats={renderStats}
              t={t}
            />
          ))}
        </div>
      </section>

      {/* All Patterns — 同款 PerlerCommunityCard 瀑布流 + 渐进加载 */}
      <section className="mt-8">
        <SectionHeading title={t('cmAllPatterns')} />
        <div className="mt-3 columns-1 gap-4 sm:columns-2 lg:columns-3 2xl:columns-4">
          {visibleItems.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <CommunityCard
                item={item}
                liked={isLiked(item.id)}
                onLike={() => toggleLike(item)}
                onOpen={onOpen ? () => onOpen(item) : undefined}
                onEdit={onEdit ? () => onEdit(item) : undefined}
                onShare={onShare ? () => onShare(item) : undefined}
                renderMedia={renderMedia}
                renderStats={renderStats}
                t={t}
              />
            </div>
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
      </section>
    </div>
  );
}

export default PerlerCommunityFeed;
