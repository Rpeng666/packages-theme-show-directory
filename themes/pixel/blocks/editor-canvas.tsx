'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel EditorCanvas block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function EditorCanvas(props: any) {
  const Comp = resolveEditor('EditorCanvas' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
