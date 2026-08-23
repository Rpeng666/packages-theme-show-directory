'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel GameIconGeneratorDemo block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function GameIconGeneratorDemo(props: any) {
  const Comp = resolveLightDemo('GameIconGeneratorDemo' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
