'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ImageGeneratorStudio block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ImageGeneratorStudio(props: any) {
  const Comp = resolveSection('ImageGeneratorStudio' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
