'use client';

import { resolveSection } from '@template/ui';
import type { SubscribeProps } from '@template/ui';

/**
 * Default subscribe block — forwarder to the registered Subscribe section.
 * The registry implementation renders the form UI; no toast bridge is
 * required here (toast is optional).
 */
export function Subscribe(props: SubscribeProps) {
  const Comp = resolveSection('Subscribe');
  return <Comp {...props} />;
}