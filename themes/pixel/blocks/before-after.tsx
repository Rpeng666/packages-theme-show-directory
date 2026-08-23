'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel BeforeAfter block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function BeforeAfter(props: any) {
  const Comp = resolveLightDemo('BeforeAfter' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
