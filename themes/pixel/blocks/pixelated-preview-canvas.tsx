'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PixelatedPreviewCanvas block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PixelatedPreviewCanvas(props: any) {
  const Comp = resolvePerler('PixelatedPreviewCanvas' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
