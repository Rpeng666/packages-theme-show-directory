'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchPage block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchPage(props: any) {
  const Comp = resolveComponent('WorkbenchPage' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
