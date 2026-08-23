'use client';

import * as React from 'react';
import { resolveSection, useActiveTheme } from '@template/ui';

/**
 * semi ContentHeader block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function ContentHeader(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveSection('ContentHeader' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
