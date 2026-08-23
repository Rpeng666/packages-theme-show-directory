'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Skeleton block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Skeleton(props: any) {
  const Comp = resolveComponent('Skeleton' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
