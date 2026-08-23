'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * default Empty block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function Empty(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('Empty' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
