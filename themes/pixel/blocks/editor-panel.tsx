'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel EditorPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function EditorPanel(props: any) {
  const Comp = resolveEditor('EditorPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
