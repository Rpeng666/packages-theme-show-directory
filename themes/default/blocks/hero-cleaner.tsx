'use client';

import { resolveSection } from '@template/ui';
import type { HeroCleanerProps } from '@template/ui';

/** Default hero-cleaner block — forwarder to the registered HeroCleaner section. */
export function HeroCleaner(props: HeroCleanerProps) {
  const Comp = resolveSection('HeroCleaner');
  return <Comp {...props} />;
}