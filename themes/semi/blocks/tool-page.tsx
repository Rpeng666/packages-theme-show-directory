'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi ToolPage block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolPage(props: any) {
  const Comp = resolveComponent('ToolPage' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
