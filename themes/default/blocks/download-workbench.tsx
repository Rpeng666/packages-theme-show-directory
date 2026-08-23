'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default DownloadWorkbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DownloadWorkbench(props: any) {
  const Comp = resolveSection('DownloadWorkbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
