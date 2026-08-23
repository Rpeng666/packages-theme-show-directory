'use client';

import * as React from 'react';
import { resolveComponent, useActiveTheme } from '@template/ui';

/**
 * pixel UploadZone block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function UploadZone(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveComponent('UploadZone' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
