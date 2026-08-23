'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi MusicGeneratorStudio block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function MusicGeneratorStudio(props: any) {
  const Comp = resolveSection('MusicGeneratorStudio' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
