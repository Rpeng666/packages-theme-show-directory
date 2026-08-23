'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default ToolSettings block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolSettings(props: any) {
  const Comp = resolveComponent('ToolSettings' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
