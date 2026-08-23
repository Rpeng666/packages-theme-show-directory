'use client';

import * as React from 'react';
import { resolvePerler, useActiveTheme } from '@template/ui';

/**
 * pixel MagnifierSelectionOverlay block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function MagnifierSelectionOverlay(props: any) {
  const theme = useActiveTheme();
  const Comp = resolvePerler('MagnifierSelectionOverlay' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
