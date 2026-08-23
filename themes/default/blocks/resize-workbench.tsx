'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default ResizeWorkbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ResizeWorkbench(props: any) {
  const Comp = resolveSection('ResizeWorkbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
