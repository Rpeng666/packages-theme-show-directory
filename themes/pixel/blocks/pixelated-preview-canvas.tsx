'use client';

import * as React from 'react';
import { resolvePerler, useActiveTheme } from '@template/ui';

/**
 * pixel PixelatedPreviewCanvas block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function PixelatedPreviewCanvas(props: any) {
  const theme = useActiveTheme();
  const Comp = resolvePerler('PixelatedPreviewCanvas' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
