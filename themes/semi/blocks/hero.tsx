'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Hero block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Hero(props: any) {
  const Comp = resolveSection('Hero' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
