'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * pixel HeroCleaner block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function HeroCleaner(props: any) {
  const Comp = resolveSection('HeroCleaner' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
