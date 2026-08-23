'use client';

import { PixelContainer, PixelStack } from '@pxlkit/ui-kit';
import { Header } from './header';
import type { PageShellProps } from '../../contracts/pageshell';

/**
 * Pixel theme PageShell — page skeleton composed with pxlkit layout
 * primitives (PixelContainer/PixelStack). Header comes from @template/ui
 * (pxlkit chrome); footer is a slot rendered by the app.
 */
export function PageShell({
  header,
  footer,
  banner,
  children,
  className,
}: PageShellProps) {
  return (
    <PixelStack direction="col" className={className ?? 'min-h-screen'}>
      <Header {...header} />
      <PixelContainer as="main" className="flex-1">
        {banner}
        {children}
      </PixelContainer>
      {footer}
    </PixelStack>
  );
}
