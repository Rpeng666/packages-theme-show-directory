'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Cluster block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Cluster(props: any) {
  const Comp = resolveComponent('Cluster' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
