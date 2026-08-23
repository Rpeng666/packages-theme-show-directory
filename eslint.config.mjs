import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import localRules from "./packages/eslint-local-rules.mjs";

const localPlugin = { local: { rules: localRules.rules } };

export default defineConfig([
  {
    extends: [...nextCoreWebVitals],
  },
  // ---------------------------------------------------------------------------
  // Local rules (packages/eslint-local-rules.mjs) — subtree conventions from
  // template-saas-packages, wired as the `local` plugin.
  //
  // Scope notes (from the rule docs in packages/eslint-local-rules.mjs):
  //   - no-direct-theme-import: app-layer files must never import a concrete
  //     theme block directly (forward through getThemeBlock instead).
  //   - block-forwarder-props / section-in-props: scoped to theme block
  //     forwarders. The template repo keeps them at src/themes/<theme>/blocks;
  //     this repo has no such dir yet, so the scope stays empty (no-op) until
  //     the convention lands here.
  //   - section-shell: scoped to packages/ui/src/themes/semi/sections (the
  //     only theme that ships SectionShell today).
  // ---------------------------------------------------------------------------
  {
    name: "local/rules",
    plugins: localPlugin,
  },
  {
    name: "local/raycast-app",
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "utils/**/*.{ts,tsx}"],
    rules: {
      "local/no-direct-theme-import": "error",
    },
  },
  {
    name: "local/semi-sections",
    files: ["packages/ui/src/themes/semi/sections/**/*.{ts,tsx}"],
    rules: {
      "local/section-shell": "error",
      "local/block-forwarder-props": "error",
      "local/section-in-props": "error",
    },
  },
  {
    name: "local/raycast-sections",
    files: ["packages/ui/src/themes/raycast/**/*.{ts,tsx}"],
    rules: {
      "local/section-shell": "error",
      "local/block-forwarder-props": "error",
      "local/section-in-props": "error",
    },
  },
]);
