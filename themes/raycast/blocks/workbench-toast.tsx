'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchToast block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchToast(props: any) {
  const Comp = resolveComponent('WorkbenchToast' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
