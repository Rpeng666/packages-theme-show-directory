'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ToolsGrid block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolsGrid(props: any) {
  const Comp = resolveSection('ToolsGrid' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
