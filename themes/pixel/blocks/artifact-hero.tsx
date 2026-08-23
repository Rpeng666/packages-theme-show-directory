'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel ArtifactHero block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ArtifactHero(props: any) {
  const Comp = resolveLightDemo('ArtifactHero' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
