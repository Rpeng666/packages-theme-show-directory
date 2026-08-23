'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi CardSurface block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CardSurface(props: any) {
  const Comp = resolveSection('CardSurface' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
