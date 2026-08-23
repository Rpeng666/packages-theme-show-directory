'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * pixel Blog block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Blog(props: any) {
  const Comp = resolveSection('Blog' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
