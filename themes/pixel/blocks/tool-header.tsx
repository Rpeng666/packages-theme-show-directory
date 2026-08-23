'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel ToolHeader block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolHeader(props: any) {
  const Comp = resolveComponent('ToolHeader' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
