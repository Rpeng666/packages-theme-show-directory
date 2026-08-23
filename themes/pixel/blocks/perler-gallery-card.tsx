'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerGalleryCard block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerGalleryCard(props: any) {
  const Comp = resolvePerler('PerlerGalleryCard' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
