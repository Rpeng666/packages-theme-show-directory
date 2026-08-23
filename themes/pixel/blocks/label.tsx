'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Label block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Label(props: any) {
  const Comp = resolveComponent('Label' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
