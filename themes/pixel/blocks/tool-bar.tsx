'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ToolBar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolBar(props: any) {
  const Comp = resolvePerler('ToolBar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
