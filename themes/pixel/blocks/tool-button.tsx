'use client';

import * as React from 'react';
import { resolveEditor, useActiveTheme } from '@template/ui';

/**
 * pixel ToolButton block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function ToolButton(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveEditor('ToolButton' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
