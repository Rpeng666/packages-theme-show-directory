'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbStatusBar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbStatusBar(props: any) {
  const Comp = resolveSection('WbStatusBar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
