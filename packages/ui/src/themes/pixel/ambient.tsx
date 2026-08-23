'use client'

import * as React from 'react'
import { PxlKitSurfaceProvider } from '@pxlkit/ui-kit'

/**
 * Pixel theme's ambient provider — wraps the app in PxlKitSurfaceProvider so
 * every pxlkit component (and every registry-resolved pixel primitive) shares
 * the same `surface="pixel"` context. Injected once at the root by the
 * registry; pixel blocks no longer wrap themselves.
 */
export function PixelAmbientProvider({ children }: { children: React.ReactNode }) {
  return <PxlKitSurfaceProvider surface="pixel">{children}</PxlKitSurfaceProvider>
}
