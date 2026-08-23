'use client';

import * as React from 'react';
import { resolvePerler, useActiveTheme } from '@template/ui';

/**
 * pixel PerlerGalleryCard block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function PerlerGalleryCard(props: any) {
  const theme = useActiveTheme();
  const Comp = resolvePerler('PerlerGalleryCard' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
