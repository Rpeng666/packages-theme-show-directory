'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * raycast WorkbenchActions block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function WorkbenchActions(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('WorkbenchActions' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
