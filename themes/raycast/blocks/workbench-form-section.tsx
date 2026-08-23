'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchFormSection block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchFormSection(props: any) {
  const Comp = resolveComponent('WorkbenchFormSection' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
