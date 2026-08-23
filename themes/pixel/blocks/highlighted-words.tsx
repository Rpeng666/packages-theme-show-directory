'use client';

import * as React from 'react';
import { resolveCleaner } from '@template/ui';

/**
 * pixel HighlightedWords block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function HighlightedWords(props: any) {
  const Comp = resolveCleaner('HighlightedWords' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
