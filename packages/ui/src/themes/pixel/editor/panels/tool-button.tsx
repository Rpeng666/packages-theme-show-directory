'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelIconButton, PixelTooltip } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';

export interface ToolButtonProps {
  /** Icon name (pixel-icon registry kebab name). */
  icon: string;
  /** Accessible label + tooltip text. */
  label: string;
  /** Active (toggled-on) state. */
  active?: boolean;
  /** Disabled. */
  disabled?: boolean;
  onClick?: () => void;
  /** Visual tone when active. */
  tone?: 'cyan' | 'green' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral';
  className?: string;
}

/**
 * ToolButton — an icon button with tooltip, for editor quick actions (top
 * toolbar center zone) and sidebar rail items. Active state gets a highlighted
 * tone ring + fill.
 */
export function ToolButton({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
  tone = 'cyan',
  className,
}: ToolButtonProps) {
  return (
    <PixelTooltip content={label} position="bottom" trigger="hover" delay={150}>
      <PixelIconButton
        label={label}
        size="md"
        tone={active ? tone : 'neutral'}
        icon={<PixelIcon name={icon} size={16} />}
        onClick={onClick}
        disabled={disabled}
        className={cn(active && 'border-current/40 bg-current/10', className)}
      />
    </PixelTooltip>
  );
}
