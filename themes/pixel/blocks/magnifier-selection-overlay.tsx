'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel MagnifierSelectionOverlay block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function MagnifierSelectionOverlay(props: any) {
  const Comp = resolvePerler('MagnifierSelectionOverlay' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
