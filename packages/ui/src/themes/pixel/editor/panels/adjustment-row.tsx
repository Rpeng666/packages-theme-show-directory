'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelSlider, PixelIconButton } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';

export interface AdjustmentRowProps {
  /** Label shown above the slider. */
  label: string;
  /** Current value (the slider is controlled). */
  value: number;
  /** Emit the next value. */
  onChange: (next: number) => void;
  /** Reset back to the baseline (defaults to 0). */
  onReset?: () => void;
  min?: number;
  max?: number;
  step?: number;
  /** Show min/max numbers under the track. */
  showMinMax?: boolean;
  /** Show the numeric readout next to the label. */
  showValue?: boolean;
  disabled?: boolean;
  tone?: 'cyan' | 'green' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral';
  className?: string;
}

/**
 * AdjustmentRow — a labeled `PixelSlider` with a value readout and a reset
 * button. The workhorse of the Filters / Adjustments panels.
 */
export function AdjustmentRow({
  label,
  value,
  onChange,
  onReset,
  min = 0,
  max = 100,
  step = 1,
  showMinMax = false,
  showValue = true,
  disabled = false,
  tone = 'cyan',
  className,
}: AdjustmentRowProps) {
  return (
    <div className={cn('space-y-1.5', disabled && 'opacity-50', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-foreground">{label}</span>
        <div className="flex items-center gap-1.5">
          {showValue ? (
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              {value > 0 ? `+${value}` : value}
            </span>
          ) : null}
          {onReset ? (
            <PixelIconButton
              label="reset"
              size="sm"
              tone="neutral"
              icon={<PixelIcon name="redo" size={10} />}
              onClick={onReset}
              disabled={disabled || value === 0}
            />
          ) : null}
        </div>
      </div>
      <PixelSlider
        label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
        tone={tone}
        showMinMax={showMinMax}
        showTooltip="never"
      />
    </div>
  );
}
