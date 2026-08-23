'use client';

import * as React from "react";

import { cn } from "../../lib/utils";
import type { TextareaProps } from "../../contracts/textarea";

/**
 * Default (shadcn) textarea — bare textarea + optional field-shell assembly.
 * autosize is not supported by the default theme (ignored); pass rows/minRows.
 */
function Textarea({
  className,
  label,
  hint,
  error,
  autosize: _autosize,
  tone: _tone,
  id,
  ...props
}: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const msgId = error || hint ? `${textareaId}-msg` : undefined;

  return (
    <div className="w-full space-y-1.5">
      {label != null && (
        <label
          htmlFor={textareaId}
          className="text-sm leading-none font-medium select-none"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={!!error}
        aria-describedby={msgId}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-destructive",
          className
        )}
        {...props}
      />
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

export { Textarea };
