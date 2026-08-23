'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbHudFrame block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbHudFrame(props: any) {
  const Comp = resolveSection('WbHudFrame' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
