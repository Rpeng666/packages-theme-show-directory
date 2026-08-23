'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Logos block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Logos(props: any) {
  const Comp = resolveSection('Logos' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
