'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchThemeCard block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchThemeCard(props: any) {
  const Comp = resolveComponent('WorkbenchThemeCard' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
