'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel AdjustmentRow block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function AdjustmentRow(props: any) {
  const Comp = resolveEditor('AdjustmentRow' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
