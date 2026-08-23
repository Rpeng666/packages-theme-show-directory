'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbAiTitleGenerator block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbAiTitleGenerator(props: any) {
  const Comp = resolveSection('WbAiTitleGenerator' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
