'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Stats block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Stats(props: any) {
  const Comp = resolveSection('Stats' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
