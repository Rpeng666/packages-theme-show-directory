'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * default Dropdown block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function Dropdown(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('Dropdown' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
