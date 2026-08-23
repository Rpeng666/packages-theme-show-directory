'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchSidebarNav block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchSidebarNav(props: any) {
  const Comp = resolveComponent('WorkbenchSidebarNav' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
