'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default ChatWorkbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ChatWorkbench(props: any) {
  const Comp = resolveSection('ChatWorkbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
