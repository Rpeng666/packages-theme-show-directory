'use client';

import * as React from 'react';
import { resolveCleaner, useActiveTheme } from '@template/ui';

/**
 * default CleanerOutput block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function CleanerOutput(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveCleaner('CleanerOutput' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
