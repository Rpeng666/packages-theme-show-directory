'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerSelectionOverlay block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerSelectionOverlay(props: any) {
  const Comp = resolvePerler('PerlerSelectionOverlay' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
