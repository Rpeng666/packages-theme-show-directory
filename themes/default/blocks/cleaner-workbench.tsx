'use client';

import * as React from 'react';
import { resolveCleaner, useActiveTheme } from '@template/ui';

/**
 * default CleanerWorkbench block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function CleanerWorkbench(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveCleaner('CleanerWorkbench' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
