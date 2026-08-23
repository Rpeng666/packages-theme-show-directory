'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * semi Cluster block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function Cluster(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('Cluster' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
