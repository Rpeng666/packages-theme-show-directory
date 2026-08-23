'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Subscribe block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Subscribe(props: any) {
  const Comp = resolveSection('Subscribe' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
