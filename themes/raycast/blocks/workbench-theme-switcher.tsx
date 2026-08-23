'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchThemeSwitcher block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchThemeSwitcher(props: any) {
  const Comp = resolveComponent('WorkbenchThemeSwitcher' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
