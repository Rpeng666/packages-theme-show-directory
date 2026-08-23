'use client';

import { PixelTooltip } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../components/pixel-icon';

/**
 * Pixel theme toggler — pxlkit chrome (Sun/Moon pixel icons, retro hover,
 * PixelTooltip) over a controlled theme state. The app provides
 * `isDark`/`onToggle` (e.g. from next-themes); the package renders only the
 * pixel visual + click handling. This keeps the package free of any
 * theme-provider dependency.
 */
export function PixelThemeToggler({
  isDark,
  onToggle,
  className,
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <PixelTooltip
      content={isDark ? 'Switch to light' : 'Switch to dark'}
      position="bottom"
    >
      <button
        onClick={onToggle}
        className={`group relative rounded p-2 text-retro-muted transition-colors hover:text-retro-gold hover:bg-retro-surface/40 ${className ?? ''}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <PixelIcon name={isDark ? 'sun' : 'moon'} size={16} appearance="palette" />
      </button>
    </PixelTooltip>
  );
}
