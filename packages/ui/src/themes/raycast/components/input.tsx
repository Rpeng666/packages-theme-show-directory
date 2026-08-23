'use client'

import * as React from 'react'
import { cn } from '../../../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * WorkbenchInput — ray.so 风格输入框（复刻 app @/components/input）。
 * label 包裹 input + 可选 InputSlot（左侧/右侧图标槽位）。
 */
const inputVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal transition-colors duration-100 overflow-hidden
  focus-visible:outline-none focus-visible:ring-1
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        classic:
          'bg-gray-2 text-gray-a12 border border-gray-a4 hover:border-gray-a6 focus-within:border-gray-a6 ring-transparent',
        soft: 'bg-gray-a3 text-gray-a12 border border-gray-a3 hover:border-gray-a5 focus-within:border-gray-a5 ring-transparent',
      },
      size: {
        medium: 'h-[30px] rounded-md px-2 text-sm gap-2',
        large: 'h-9 px-3 py-2 gap-3',
      },
    },
    defaultVariants: {
      variant: 'classic',
      size: 'medium',
    },
  },
)

export interface WorkbenchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

export const WorkbenchInput = React.forwardRef<HTMLInputElement, WorkbenchInputProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <label className={cn(inputVariants({ variant, size, className }))}>
        <input ref={ref} className="outline-none w-full bg-transparent text-inherit" {...props} />
        {children}
      </label>
    )
  },
)
WorkbenchInput.displayName = 'WorkbenchInput'

export interface WorkbenchInputSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right'
}

export const WorkbenchInputSlot = React.forwardRef<HTMLDivElement, WorkbenchInputSlotProps>(
  ({ className, side = 'right', ...props }, ref) => {
    return (
      <div
        className={cn(
          'shrink-0 text-gray-a10',
          side === 'right' && '-order-none',
          side === 'left' && '-order-1',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
WorkbenchInputSlot.displayName = 'WorkbenchInputSlot'

export { inputVariants }
