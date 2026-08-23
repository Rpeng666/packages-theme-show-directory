'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel EditorShell block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function EditorShell(props: any) {
  const Comp = resolveEditor('EditorShell' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
