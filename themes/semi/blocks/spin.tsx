'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Spin block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Spin(props: any) {
  const Comp = resolveComponent('Spin' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
