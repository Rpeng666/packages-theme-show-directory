'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerGalleryFeed block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerGalleryFeed(props: any) {
  const Comp = resolvePerler('PerlerGalleryFeed' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
