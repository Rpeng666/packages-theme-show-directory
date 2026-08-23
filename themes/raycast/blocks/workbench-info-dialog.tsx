'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchInfoDialog block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchInfoDialog(props: any) {
  const Comp = resolveComponent('WorkbenchInfoDialog' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
