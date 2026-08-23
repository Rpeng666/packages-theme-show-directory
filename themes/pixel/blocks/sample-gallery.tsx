'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel SampleGallery block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SampleGallery(props: any) {
  const Comp = resolvePerler('SampleGallery' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
