'use client';

import * as React from "react";

import { cn } from "../../lib/utils";
import type { InputProps } from "../../contracts/input";

const sizeClass: Record<string, string> = {
  sm: "h-8",
  md: "h-9",
  lg: "h-11",
};

/**
 * Default (shadcn) input — bare input + optional field-shell assembly.
 * label/hint/error are assembled here (pxlkit has FieldShell built in);
 * prefix/suffix render as absolute-positioned slots.
 */
function Input({
  className,
  label,
  hint,
  error,
  size = "md",
  prefix,
  suffix,
  icon,
  type,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const msgId = error || hint ? `${inputId}-msg` : undefined;
  const hasPrefix = prefix != null || icon != null;
  const hasSuffix = suffix != null;

  return (
    <div className="w-full space-y-1.5">
      {label != null && (
        <label
          htmlFor={inputId}
          className="text-sm leading-none font-medium select-none"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {(prefix || icon) && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            {prefix || icon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={msgId}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            sizeClass[size],
            hasPrefix && "pl-10",
            hasSuffix && "pr-10",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error && "border-destructive",
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {error != null ? (
        <p id={msgId} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint != null ? (
        <p id={msgId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export { Input };
