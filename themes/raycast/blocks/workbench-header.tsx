'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchHeader block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchHeader(props: any) {
  const Comp = resolveComponent('WorkbenchHeader' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
