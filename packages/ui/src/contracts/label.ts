import type * as React from 'react'

/**
 * Label contract — a form field label. Both themes render a native <label>.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}
