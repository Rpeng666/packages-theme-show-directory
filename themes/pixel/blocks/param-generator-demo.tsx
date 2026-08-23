'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel ParamGeneratorDemo block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ParamGeneratorDemo(props: any) {
  const Comp = resolveLightDemo('ParamGeneratorDemo' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
