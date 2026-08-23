'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ToolHero block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToolHero(props: any) {
  const Comp = resolveSection('ToolHero' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
