'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchFooter block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchFooter(props: any) {
  const Comp = resolveComponent('WorkbenchFooter' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
