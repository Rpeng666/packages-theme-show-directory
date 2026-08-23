'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ExtractWorkbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ExtractWorkbench(props: any) {
  const Comp = resolveSection('ExtractWorkbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
