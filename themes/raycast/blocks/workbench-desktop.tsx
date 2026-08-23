'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchDesktop block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchDesktop(props: any) {
  const Comp = resolveComponent('WorkbenchDesktop' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
