'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchKbd block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchKbd(props: any) {
  const Comp = resolveComponent('WorkbenchKbd' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
