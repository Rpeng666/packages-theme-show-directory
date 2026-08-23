'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default ChatHistory block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ChatHistory(props: any) {
  const Comp = resolveSection('ChatHistory' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
