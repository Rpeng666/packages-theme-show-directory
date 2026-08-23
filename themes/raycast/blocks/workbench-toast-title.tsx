'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchToastTitle block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchToastTitle(props: any) {
  const Comp = resolveComponent('WorkbenchToastTitle' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
