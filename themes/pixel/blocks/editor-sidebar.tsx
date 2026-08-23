'use client';

import * as React from 'react';
import { resolveEditor, useActiveTheme } from '@template/ui';

/**
 * pixel EditorSidebar block — forwarder. Resolves the registered
 * implementation through the registry for the ACTIVE theme (from context) and
 * forwards props. No hand-rolled markup.
 */
export function EditorSidebar(props: any) {
  const theme = useActiveTheme();
  const Comp = resolveEditor('EditorSidebar' as never, theme as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
