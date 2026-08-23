'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import type { ButtonProps, ButtonVariant } from "../../contracts/button"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-border bg-background shadow-xs hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-full px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Default (shadcn) button — the template implementation. Pixel-agnostic.
 * `tone`/`iconLeft`/`iconRight`/`fullWidth` are pixel-native and intentionally
 * dropped here so they never leak onto the DOM element.
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  tone: _tone,
  iconLeft: _iconLeft,
  iconRight: _iconRight,
  fullWidth: _fullWidth,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  // `md` is pixel-native (pxlkit Size); default maps it to its base h-9.
  const s = size === "md" ? "default" : size

  // asChild: Slot requires exactly one element child — no spinner wrapper.
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant: variant as ButtonVariant, size: s, className }))}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant: variant as ButtonVariant, size: s, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span
          data-testid="button-spinner"
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
