'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel HintBanner block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function HintBanner(props: any) {
  const Comp = resolveComponent('HintBanner' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
