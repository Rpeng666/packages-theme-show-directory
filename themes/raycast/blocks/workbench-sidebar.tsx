'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchSidebar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchSidebar(props: any) {
  const Comp = resolveComponent('WorkbenchSidebar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
