'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchThemeControls block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchThemeControls(props: any) {
  const Comp = resolveComponent('WorkbenchThemeControls' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
