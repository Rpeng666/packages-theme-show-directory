'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import {
  PixelCard,
  PixelSegmented,
  PixelSlider,
  PixelSwitch,
  PixelIconFrame,
} from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { defaultDitherT, type DitherT } from './dither-i18n';
import {
  DITHER_METHODS,
  DITHER_MODES,
  type DitherMethod,
  type DitherMode,
  type DitherOptions,
} from '../../../../contracts/dither/types';

export interface DitherSettingsPanelProps {
  /** Current dither options (controlled). */
  options: DitherOptions;
  /** Emit a partial update (merged into `options` by the parent). */
  onChange: (partial: Partial<DitherOptions>) => void;
  /** Disable interaction while an image is processing. */
  disabled?: boolean;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: DitherT;
  className?: string;
}

/**
 * Dither workbench settings — method / color mode / depth / strength / scan
 * direction. Pure presentation over pxlkit form primitives; the workbench
 * holds `options` state and passes partial updates down.
 */
export function DitherSettingsPanel({
  options,
  onChange,
  disabled = false,
  t = defaultDitherT,
  className,
}: DitherSettingsPanelProps) {
  const methodOptions = DITHER_METHODS.map((m) => ({
    value: m,
    label: t(`stMethod${m[0].toUpperCase()}${m.slice(1)}`),
  }));
  const modeOptions = DITHER_MODES.map((m) => ({
    value: m,
    label: t(`stMode${m[0].toUpperCase()}${m.slice(1)}`),
  }));

  return (
    <PixelCard className={cn('border-foreground/15', className)}>
      <div className="flex items-center gap-3 border-b-2 border-foreground/10 px-5 py-4">
        <PixelIconFrame size={48} tone="cyan" icon={<PixelIcon name="gear" size={20} />} />
        <div>
          <h2 className="font-display text-foreground text-sm font-normal uppercase tracking-wider">
            {t('stTitle')}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-4">
          <PixelSegmented
            label={t('stMethod')}
            value={options.method}
            options={methodOptions}
            onChange={(next) => onChange({ method: next as DitherMethod })}
            disabled={disabled}
            tone="cyan"
          />
          <PixelSegmented
            label={t('stMode')}
            value={options.mode}
            options={modeOptions}
            onChange={(next) => onChange({ mode: next as DitherMode })}
            disabled={disabled}
            tone="cyan"
          />
        </div>

        {options.mode === 'grayscale' && (
          <PixelSlider
            label={t('stGrayLevels')}
            min={2}
            max={16}
            step={1}
            value={options.grayLevels}
            onChange={(next: number) => onChange({ grayLevels: next })}
            disabled={disabled}
            tone="cyan"
            showMinMax
            showTooltip="drag"
          />
        )}

        {options.mode === 'rgb' && (
          <PixelSlider
            label={t('stRgbBits')}
            min={1}
            max={4}
            step={1}
            value={options.rgbBits}
            onChange={(next: number) => onChange({ rgbBits: next })}
            disabled={disabled}
            tone="cyan"
            showMinMax
            showTooltip="drag"
          />
        )}

        <PixelSlider
          label={t('stStrength')}
          min={0}
          max={100}
          step={1}
          value={options.strength}
          onChange={(next: number) => onChange({ strength: next })}
          disabled={disabled}
          tone="cyan"
          showMinMax
          showTooltip="always"
        />

        <PixelSwitch
          label={t('stSerpentine')}
          checked={options.serpentine}
          onChange={(next) => onChange({ serpentine: next })}
          disabled={disabled}
          tone="cyan"
        />
      </div>
    </PixelCard>
  );
}
