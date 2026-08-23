'use client';

import * as React from 'react';
import { resolvePerler, useActiveTheme } from '@template/ui';

/**
 * pixel ColorPalette block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function ColorPalette(props: any) {
  const theme = useActiveTheme();
  const Comp = resolvePerler('ColorPalette' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
