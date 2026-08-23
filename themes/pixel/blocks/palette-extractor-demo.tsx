'use client';

import * as React from 'react';
import { resolveLightDemo, useActiveTheme } from '@template/ui';

/**
 * pixel PaletteExtractorDemo block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function PaletteExtractorDemo(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveLightDemo('PaletteExtractorDemo' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
