'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Navigation block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Navigation(props: any) {
  const Comp = resolveComponent('Navigation' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
