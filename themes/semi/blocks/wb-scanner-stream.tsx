'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbScannerStream block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbScannerStream(props: any) {
  const Comp = resolveSection('WbScannerStream' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
