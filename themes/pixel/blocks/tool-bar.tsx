'use client';

import * as React from 'react';
import { resolvePerler, useActiveTheme } from '@template/ui';

/**
 * pixel ToolBar block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function ToolBar(props: any) {
  const theme = useActiveTheme();
  const Comp = resolvePerler('ToolBar' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
