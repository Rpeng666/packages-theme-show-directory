# pxlkit — local workspace port

A local workspace copy of [pxlkit](https://github.com/Joangeldelarosa/pxlkit) (pinned at the npm
versions it byte-matches), vendored from `vendor/pxlkit`. The goal of this package is to make
pxlkit's full component set available for **later reuse** — not just what `theme/pixel` uses
today.

## What's inside

| Package | Contents | License |
|---------|----------|---------|
| `@pxlkit/ui-kit` | 121 retro pixel React components (buttons, cards, forms, layout, overlays, data, tokens) | MIT |
| `@pxlkit/core` | Pixel icon rendering engine (`PxlKitIcon`, `AnimatedPxlKitIcon`, `ParallaxPxlKitIcon`), SVG/utils | MIT |
| `@pxlkit/gamification` | 51 pixel-art icons | source-available, attribution required |
| `@pxlkit/ui` | 41 icons | source-available, attribution required |
| `@pxlkit/social` | 22 icons | source-available, attribution required |
| `@pxlkit/weather` | 17 icons | source-available, attribution required |
| `@pxlkit/effects` | 12 icons | source-available, attribution required |
| `@pxlkit/feedback` | 13 icons | source-available, attribution required |
| `@pxlkit/parallax` | 10 icons | source-available, attribution required |

All packages ship **raw TS/TSX source** (no build step) — the same pattern as
`packages/external-link-cms`. Next transpiles them via `transpilePackages` in `next.config.mjs`.

## Setup (already done)

- `pnpm-workspace.yaml` includes `packages/pxlkit/*`.
- Root deps: `@pxlkit/{core,gamification,ui,ui-kit}` = `workspace:*`.
- `next.config.mjs` `transpilePackages` includes the four root-linked packages.

## Consuming

Components are interactive (they use React hooks), so import them from a **client component**:

```tsx
'use client';
import { PixelButton, PixelCard, PixelInput } from '@pxlkit/ui-kit';

<PixelButton tone="green">Go</PixelButton>
```

Icons are **data objects**, not JSX. Render them via `PxlKitIcon`:

```tsx
import { Trophy } from '@pxlkit/gamification';
import { PxlKitIcon } from '@pxlkit/core';

<PxlKitIcon icon={Trophy} size={48} />
```

## CSS — the two integration modes

`@pxlkit/ui-kit` exposes two stylesheet entries (Tailwind v4):

- **`@pxlkit/ui-kit/theme.css`** — the **composable** retro design system: `--retro-*`
  palette (light/dark), `@theme` mapping to `--color-retro-*` Tailwind namespaces
  (`bg-retro-bg`, `text-retro-primary`, `font-pixel`, `shadow-retro`), and the
  `.pxl-corner-*` / `.pxl-shadow*` / `.btn-retro` / `.pixel-border` utilities.
  **No `@import "tailwindcss"`** — import it *inside* an existing Tailwind graph.
- **`@pxlkit/ui-kit/styles.css`** — the standalone entry: `@import "tailwindcss"` +
  theme.css, for apps that don't have their own Tailwind entry.

`theme/pixel` imports `theme.css` (before `base.css`) so its ported components get the retro
classes while the app keeps a single Tailwind graph.

> The `--retro-*` palette can be overridden by redeclaring the variables after the import
> (see the header of `theme.css` for the full customization guide).

## Notes

- **`'use client'` is required** for components that use hooks (most do). A server-component
  import of `PixelTooltip` etc. throws the standard Next error.
- Icons render as `<img src="data:image/svg+xml…">` (16×16 crispEdges) so
  `image-rendering: pixelated` survives; there are no inline `<rect>`s to grep for.
- The vendor tree (`vendor/pxlkit`) is the read-only upstream reference. Keep icon-pack
  license/attribution notices when they ship.
