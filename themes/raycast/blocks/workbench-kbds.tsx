'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchKbds block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchKbds(props: any) {
  const Comp = resolveComponent('WorkbenchKbds' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
