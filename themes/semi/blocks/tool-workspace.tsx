'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ToolWorkspace block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolWorkspace(props: any) {
  const Comp = resolveSection('ToolWorkspace' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
