'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Grid block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Grid(props: any) {
  const Comp = resolveComponent('Grid' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
