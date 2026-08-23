'use client';

import React from 'react';

import {
  PixelFloat,
  PixelHeroSection,
  PixelTwoColumn,
  PixelStack,
} from '@pxlkit/ui-kit';
import { cn } from '../../../../lib/utils';
import type { PerlerT } from './i18n';
import { appDefaultPerlerT } from './app-landing-i18n';
import { PerlerStoreButtons } from './app-store-badges';
import { PerlerDeviceMockup } from './app-device-mockup';
import { PerlerFeatureTabs } from './app-feature-tabs';

/**
 * App download landing page (Pixilart-style) — self-contained section.
 *
 * The package owns ALL chrome/layout; the app only supplies copy (via `t`,
 * `ap*` keys, Chinese fallback here) + store links + the data arrays for the
 * alternating rows / feature tabs (with per-item media nodes). Mirror of the
 * community/gallery feed pattern, registered as `AppLanding` in the registry.
 *
 * 结构（从上到下）：
 * 1. Hero — 全幅像素风 CSS 背景（网格 + 扫描线 + 像素山 + 漂浮图标）+ 主标题/副标题 + 双下载徽章
 * 2. Device mock — 桌面显示器 + 重叠 iPhone 的组合 mock（纯 CSS 像素画屏）
 * 3. 左右交替区块 — 3 行 PixelTwoColumn（reverse 交替），文本/视觉各占一半
 * 4. Features — Tab 切换的特性页（PixelTabs）
 * 5. Final CTA — Get started + 双下载徽章
 */
export type PerlerAppTone =
  | 'green'
  | 'cyan'
  | 'gold'
  | 'red'
  | 'purple'
  | 'pink'
  | 'neutral';

/** 应用商店下载链接（app 通过 perler.json `links` 注入，缺省 `#`） */
export interface PerlerAppStoreLinks {
  googlePlay?: string;
  appStore?: string;
}

/** 左右交替区块的数据行（文案以 *Key 字段传入，由包内 t 解析） */
export interface PerlerAppLandingRow {
  eyebrowKey?: string;
  titleKey: string;
  descriptionKey: string;
  bulletsKey?: string[];
  /** 该行视觉：图标 / emoji / 任意节点 */
  media: React.ReactNode;
  tone?: PerlerAppTone;
}

/** Features tab 数据（label/title/desc/bullets 均为 t() 的 key） */
export interface PerlerAppLandingFeatureTab {
  /** 稳定 id，用作 PixelTabs value */
  id: string;
  labelKey: string;
  titleKey: string;
  descriptionKey: string;
  bulletsKey: string[];
  /** tab 芯片 + 特性页图标 */
  icon: React.ReactNode;
  /** 特性页右侧视觉（缺省用 PixelIconFrame 包裹 icon） */
  media?: React.ReactNode;
  tone?: PerlerAppTone;
}

export interface PerlerAppLandingProps {
  eyebrow?: string;
  headline: string;
  subline: string;
  storeLinks?: PerlerAppStoreLinks;
  rows?: PerlerAppLandingRow[];
  featureTabs?: PerlerAppLandingFeatureTab[];
  finalCtaTitle: string;
  finalCtaSubtitle?: string;
  t?: PerlerT;
  className?: string;
}

/** Hero 背景 — 纯 CSS 像素画风（网格 + 扫描线 + 底部像素山 + 漂浮图标），无图片资源 */
function AppHeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid-pattern" />
      {/* 底部像素山（硬停渐变阶梯） */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 opacity-70"
        style={{
          backgroundImage: [
            'linear-gradient(0deg, var(--retro-green) 0 16px, transparent 16px 32px)',
            'linear-gradient(0deg, var(--retro-cyan) 0 8px, transparent 8px 16px)',
          ].join(','),
          backgroundPosition: '0 0, 32px 0',
          backgroundSize: '64px 64px, 64px 64px',
        }}
      />
      {/* 漂浮像素小图标 */}
      <PixelFloat className="absolute left-[6%] top-[20%] hidden text-2xl sm:block">
        <span className="text-retro-pink">✨</span>
      </PixelFloat>
      <PixelFloat duration={2800} className="absolute right-[8%] top-[26%] hidden text-2xl sm:block">
        <span className="text-retro-gold">⭐</span>
      </PixelFloat>
      <PixelFloat duration={2000} className="absolute bottom-[30%] right-[20%] hidden text-2xl lg:block">
        <span className="text-retro-red">❤️</span>
      </PixelFloat>
    </div>
  );
}

/** Hero — 居中文本 + 双下载徽章，套在 CSS 背景层上 */
function AppHero({
  eyebrow,
  headline,
  subline,
  storeLinks,
  t,
}: {
  eyebrow?: string;
  headline: string;
  subline: string;
  storeLinks?: PerlerAppStoreLinks;
  t: PerlerT;
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      <AppHeroBackdrop />
      <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden="true" />
      <PixelHeroSection
        variant="centered"
        minHeight="lg"
        eyebrow={eyebrow}
        headline={headline}
        subline={subline}
        primaryCta={<PerlerStoreButtons links={storeLinks} t={t} />}
        tone="green"
      />
    </section>
  );
}

/** 左右交替区块 */
function AppSectionRows({
  rows,
  t,
}: {
  rows: PerlerAppLandingRow[];
  t: PerlerT;
}) {
  return (
    <>
      {rows.map((row, idx) => {
        const reverse = idx % 2 === 1;
        const left = (
          <PixelStack gap={3} align="start">
            {row.eyebrowKey && (
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-retro-green">
                {t(row.eyebrowKey)}
              </span>
            )}
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-retro-text sm:text-2xl">
              {t(row.titleKey)}
            </h3>
            <p className="max-w-prose font-mono text-sm leading-relaxed text-retro-muted">
              {t(row.descriptionKey)}
            </p>
            {row.bulletsKey?.length ? (
              <ul className="flex flex-col gap-1.5">
                {row.bulletsKey.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 font-mono text-sm text-retro-text"
                  >
                    <span className="mt-0.5 shrink-0 text-retro-green" aria-hidden="true">
                      ▸
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            ) : null}
          </PixelStack>
        );
        const right = (
          <div className="flex w-full items-center justify-center">{row.media}</div>
        );

        return (
          <section key={row.titleKey} className="border-t border-retro-border/20">
            <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
              <PixelTwoColumn
                ratio="50/50"
                gap={10}
                reverse={reverse}
                stackBelow="md"
                align="center"
                left={left}
                right={right}
              />
            </div>
          </section>
        );
      })}
    </>
  );
}

/** Final CTA — 标题 + 副标题 + 双下载徽章 */
function AppFinalCta({
  title,
  subtitle,
  storeLinks,
  t,
}: {
  title: string;
  subtitle?: string;
  storeLinks?: PerlerAppStoreLinks;
  t: PerlerT;
}) {
  return (
    <section className="border-t border-retro-border/20">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-retro-text sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-prose font-mono text-sm leading-relaxed text-retro-muted">
            {subtitle}
          </p>
        )}
        <div className="mt-8">
          <PerlerStoreButtons links={storeLinks} t={t} />
        </div>
      </div>
    </section>
  );
}

export function PerlerAppLanding({
  eyebrow,
  headline,
  subline,
  storeLinks,
  rows = [],
  featureTabs = [],
  finalCtaTitle,
  finalCtaSubtitle,
  t: tProp,
  className,
}: PerlerAppLandingProps) {
  const t = tProp ?? appDefaultPerlerT;

  return (
    <div className={cn('bg-background text-foreground', className)}>
      <AppHero
        eyebrow={eyebrow}
        headline={headline}
        subline={subline}
        storeLinks={storeLinks}
        t={t}
      />

      {/* Device mock — 桌面 + iPhone */}
      <section className="border-t border-retro-border/20">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <PerlerDeviceMockup />
        </div>
      </section>

      <AppSectionRows rows={rows} t={t} />

      {/* Features — Tab 切换 */}
      {featureTabs.length > 0 && (
        <section className="border-t border-retro-border/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
            <PerlerFeatureTabs tabs={featureTabs} t={t} ariaLabel={headline} />
          </div>
        </section>
      )}

      <AppFinalCta
        title={finalCtaTitle}
        subtitle={finalCtaSubtitle}
        storeLinks={storeLinks}
        t={t}
      />
    </div>
  );
}

export default PerlerAppLanding;
