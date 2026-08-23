'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchActionMenu block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchActionMenu(props: any) {
  const Comp = resolveComponent('WorkbenchActionMenu' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
