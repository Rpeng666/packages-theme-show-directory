'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Progress block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Progress(props: any) {
  const Comp = resolveComponent('Progress' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
