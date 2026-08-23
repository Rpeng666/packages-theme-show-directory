'use client';

import { resolveSection } from '@template/ui';
import type { HeroProps } from '@template/ui';

/**
 * Default hero block — forwarder. The visual hero lives in packages/ui
 * (registered Hero section); this block resolves it through the registry and
 * injects the section data. Link/Image fall back to native <a>/<img>.
 */
export function Hero({ section, className }: HeroProps) {
  const HeroComp = resolveSection('Hero');
  return <HeroComp section={section} className={className} />;
}