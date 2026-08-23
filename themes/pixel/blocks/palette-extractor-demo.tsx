'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel PaletteExtractorDemo block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PaletteExtractorDemo(props: any) {
  const Comp = resolveLightDemo('PaletteExtractorDemo' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
