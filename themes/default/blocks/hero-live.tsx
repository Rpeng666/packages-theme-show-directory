'use client';

import { resolveSection } from '@template/ui';
import type { HeroLiveProps } from '@template/ui';

/** Default hero-live block — forwarder to the registered HeroLive section. */
export function HeroLive(props: HeroLiveProps) {
  const Comp = resolveSection('HeroLive');
  return <Comp {...props} />;
}