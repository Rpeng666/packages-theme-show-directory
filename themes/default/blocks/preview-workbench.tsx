'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default PreviewWorkbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PreviewWorkbench(props: any) {
  const Comp = resolveSection('PreviewWorkbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
