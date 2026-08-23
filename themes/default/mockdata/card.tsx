import type { Section } from "@template/ui";
import * as React from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@template/ui";

export const props = {
    className: "w-full max-w-md",
    children: (
      <>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
          <CardDescription>
            A card composed from its sub-components (Header · Title · Action · Content · Footer).
          </CardDescription>
          <CardAction>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              New
            </span>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-9">
            Body content slot — rendered by CardContent with the active theme&apos;s card styles.
          </p>
        </CardContent>
        <CardFooter>
          <span className="text-xs text-gray-11">Card footer · 2 actions below</span>
          <span className="ml-auto flex gap-2">
            <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              Primary
            </span>
            <span className="rounded-md border border-border px-3 py-1.5 text-xs font-medium">
              Secondary
            </span>
          </span>
        </CardFooter>
      </>
    ),
  };
