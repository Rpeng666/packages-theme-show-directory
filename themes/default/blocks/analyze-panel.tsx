'use client';

import * as React from 'react';
import { resolveCleaner } from '@template/ui';

/**
 * default AnalyzePanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function AnalyzePanel(props: any) {
  const Comp = resolveCleaner('AnalyzePanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
