'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel BackgroundGeneratorDemo block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function BackgroundGeneratorDemo(props: any) {
  const Comp = resolveLightDemo('BackgroundGeneratorDemo' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
