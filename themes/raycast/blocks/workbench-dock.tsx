'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchDock block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchDock(props: any) {
  const Comp = resolveComponent('WorkbenchDock' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
