'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * semi SmartIcon block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function SmartIcon(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('SmartIcon' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
