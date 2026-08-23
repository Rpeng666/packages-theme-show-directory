'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbExportModal block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbExportModal(props: any) {
  const Comp = resolveSection('WbExportModal' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
