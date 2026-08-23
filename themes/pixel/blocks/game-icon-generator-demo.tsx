'use client';

import * as React from 'react';
import { resolveLightDemo, useActiveTheme } from '@template/ui';

/**
 * pixel GameIconGeneratorDemo block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function GameIconGeneratorDemo(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveLightDemo('GameIconGeneratorDemo' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
