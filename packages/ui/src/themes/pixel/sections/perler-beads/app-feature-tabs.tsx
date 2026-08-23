'use client';

import React from 'react';

import {
  PixelTabs,
  PixelTwoColumn,
  PixelStack,
  PixelIconFrame,
} from '@pxlkit/ui-kit';
import { cn } from '../../../../lib/utils';
import type { PerlerT } from './i18n';
import { appDefaultPerlerT } from './app-landing-i18n';
import type {
  PerlerAppLandingFeatureTab,
  PerlerAppTone,
} from './app-landing';

/**
 * Features section — Tab-switched feature pages.
 *
 * Maps the app-supplied `featureTabs` data array onto the pxlkit PixelTabs
 * sugar API (items[]): a row of category chips on top; clicking swaps the
 * visible panel (PixelTwoColumn: title/description/bullets left, media right).
 * PixelTabs owns the tab state + roving-tabindex keyboard nav / ARIA roles.
 */
export function PerlerFeatureTabs({
  tabs,
  t: tProp,
  ariaLabel,
  className,
}: {
  tabs: PerlerAppLandingFeatureTab[];
  t?: PerlerT;
  ariaLabel: string;
  className?: string;
}) {
  const t = tProp ?? appDefaultPerlerT;

  const items = tabs.map((tab) => ({
    id: tab.id,
    label: t(tab.labelKey),
    icon: tab.icon ?? undefined,
    content: (
      <FeaturePanel tab={tab} t={t} />
    ),
  }));

  return (
    <div className={cn('w-full', className)}>
      <PixelTabs
        items={items}
        defaultValue={tabs[0]?.id}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

/** 单个特性页面板 — 左：图标 + 标题 + 描述 + 要点；右：media 视觉 */
function FeaturePanel({
  tab,
  t,
}: {
  tab: PerlerAppLandingFeatureTab;
  t: PerlerT;
}) {
  const media = tab.media ?? (
    <PixelIconFrame
      size={80}
      tone={tab.tone}
      icon={tab.icon}
      shape="rounded"
    />
  );

  const left = (
    <PixelStack gap={3} align="start">
      <div className="flex items-center gap-3">
        <PixelIconFrame size={48} tone={tab.tone} icon={tab.icon} />
        <h3 className="font-display text-lg font-bold uppercase tracking-wider text-retro-text sm:text-xl">
          {t(tab.titleKey)}
        </h3>
      </div>
      <p className="max-w-prose font-mono text-sm leading-relaxed text-retro-muted">
        {t(tab.descriptionKey)}
      </p>
      <ul className="flex flex-col gap-1.5">
        {tab.bulletsKey.map((key) => (
          <li
            key={key}
            className="flex items-start gap-2 font-mono text-sm text-retro-text"
          >
            <span
              className={cn('mt-0.5 shrink-0', toneText[tab.tone ?? 'green'])}
              aria-hidden="true"
            >
              ▸
            </span>
            {t(key)}
          </li>
        ))}
      </ul>
    </PixelStack>
  );

  return (
    <div className="border-2 border-retro-border/40 bg-retro-card/30 p-4 sm:p-6">
      <PixelTwoColumn
        ratio="50/50"
        gap={8}
        stackBelow="md"
        align="center"
        left={left}
        right={<div className="flex w-full justify-center">{media}</div>}
      />
    </div>
  );
}

const toneText: Record<PerlerAppTone, string> = {
  green: 'text-retro-green',
  cyan: 'text-retro-cyan',
  gold: 'text-retro-gold',
  red: 'text-retro-red',
  purple: 'text-retro-purple',
  pink: 'text-retro-pink',
  neutral: 'text-retro-text',
};
