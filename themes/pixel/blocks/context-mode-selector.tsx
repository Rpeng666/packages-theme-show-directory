'use client';

import * as React from 'react';
import { resolveCleaner } from '@template/ui';

/**
 * pixel ContextModeSelector block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ContextModeSelector(props: any) {
  const Comp = resolveCleaner('ContextModeSelector' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
