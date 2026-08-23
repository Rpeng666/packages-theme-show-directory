'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchKeyboardShortcutsDialog block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchKeyboardShortcutsDialog(props: any) {
  const Comp = resolveComponent('WorkbenchKeyboardShortcutsDialog' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
