'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default DualCta block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DualCta(props: any) {
  const Comp = resolveComponent('DualCta' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
