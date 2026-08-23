'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel FocusModePreDownloadModal block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FocusModePreDownloadModal(props: any) {
  const Comp = resolvePerler('FocusModePreDownloadModal' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
