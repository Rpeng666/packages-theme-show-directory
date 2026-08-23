'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchIconPicker block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchIconPicker(props: any) {
  const Comp = resolveComponent('WorkbenchIconPicker' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
