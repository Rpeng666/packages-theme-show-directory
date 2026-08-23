'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchFloatingActionBar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchFloatingActionBar(props: any) {
  const Comp = resolveComponent('WorkbenchFloatingActionBar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
