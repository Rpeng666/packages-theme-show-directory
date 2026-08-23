'use client';

import * as React from 'react';
import { resolveDither, useActiveTheme } from '@template/ui';

/**
 * pixel DitherSettingsPanel block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function DitherSettingsPanel(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveDither('DitherSettingsPanel' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
