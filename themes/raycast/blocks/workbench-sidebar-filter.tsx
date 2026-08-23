'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchSidebarFilter block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchSidebarFilter(props: any) {
  const Comp = resolveComponent('WorkbenchSidebarFilter' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
