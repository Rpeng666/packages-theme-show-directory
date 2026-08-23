'use client';

import * as React from 'react';
import { resolveCleaner } from '@template/ui';

/**
 * pixel HighlightedText block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function HighlightedText(props: any) {
  const Comp = resolveCleaner('HighlightedText' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
