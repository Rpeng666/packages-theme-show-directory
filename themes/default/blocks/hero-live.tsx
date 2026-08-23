'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default HeroLive block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function HeroLive(props: any) {
  const Comp = resolveSection('HeroLive' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
