'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel ToolButton block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolButton(props: any) {
  const Comp = resolveEditor('ToolButton' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
