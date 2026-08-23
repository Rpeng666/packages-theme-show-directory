'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchPromptCard block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchPromptCard(props: any) {
  const Comp = resolveComponent('WorkbenchPromptCard' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
