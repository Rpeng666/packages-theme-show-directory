'use client'

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

/**
 * Raycast workbench toast — radix toast primitives with ray.so styling.
 *
 * De-duplicates the 4 identical per-page Toast copies (snippets / quicklinks /
 * prompts / presets). CSS lives in `toast.module.css` (self-contained).
 * Consumed as a thin re-export by the app's `@/components/toast` forwarders.
 */
export const WorkbenchToast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentProps<typeof ToastPrimitive.Root>
>(({ children, ...props }, forwardedRef) => {
  return (
    <ToastPrimitive.Root {...props} className={styles.root} ref={forwardedRef}>
      {children}
    </ToastPrimitive.Root>
  )
})
WorkbenchToast.displayName = 'WorkbenchToast'

export const WorkbenchToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentProps<typeof ToastPrimitive.Viewport>
>((props, forwardedRef) => {
  return <ToastPrimitive.Viewport {...props} className={styles.viewport} ref={forwardedRef} />
})
WorkbenchToastViewport.displayName = 'WorkbenchToastViewport'

export const WorkbenchToastProvider = ToastPrimitive.Provider

export const WorkbenchToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentProps<typeof ToastPrimitive.Title>
>((props, forwardedRef) => {
  return <ToastPrimitive.Title {...props} className={styles.title} ref={forwardedRef} />
})
WorkbenchToastTitle.displayName = 'WorkbenchToastTitle'

import styles from './toast.module.css'
