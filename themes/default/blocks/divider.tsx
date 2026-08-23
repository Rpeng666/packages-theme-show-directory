'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * default Divider block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function Divider(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('Divider' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
