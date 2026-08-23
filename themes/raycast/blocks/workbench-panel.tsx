'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchPanel(props: any) {
  const Comp = resolveComponent('WorkbenchPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
