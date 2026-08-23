'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchShortcutRow block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchShortcutRow(props: any) {
  const Comp = resolveComponent('WorkbenchShortcutRow' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
