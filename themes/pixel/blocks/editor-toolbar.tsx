'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel EditorToolbar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function EditorToolbar(props: any) {
  const Comp = resolveEditor('EditorToolbar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
