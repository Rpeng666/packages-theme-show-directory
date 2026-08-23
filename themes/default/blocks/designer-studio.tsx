'use client';

import * as React from 'react';
import { resolveSection, useActiveTheme } from '@template/ui';

/**
 * default DesignerStudio block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function DesignerStudio(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveSection('DesignerStudio' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
