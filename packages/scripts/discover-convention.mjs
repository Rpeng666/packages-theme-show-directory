#!/usr/bin/env node
/**
 * Convention discovery (codegen) — scans the theme folders and generates a
 * static registry file, so the "filesystem is the registry" convention works
 * without hand-written manifests and without relying on bundler-specific
 * dynamic-import features (Turbopack/Next 16 support neither template-string
 * client imports nor import.meta.glob).
 *
 * Convention layout (everything lives under packages/ui/src):
 *
 *   themes/<theme>/components/<Name>.tsx      primitives (file or dir/index)
 *   themes/<theme>/sections/<Name>.tsx        landing blocks
 *   themes/<theme>/pages/<Name>.tsx           page shells
 *   themes/<theme>/sections/{perler-beads,cleaner,dither,blog}/*.tsx
 *   themes/<theme>/editor|light-tool-demo/*.tsx
 *   themes/<theme>/ambient.tsx
 *
 * Every PascalCase named export of a scanned file becomes a registry entry
 * (so aggregate files register all their components); the default export is
 * indexed under the file name. Run on every dev/build (predev/prebuild).
 *
 * Generated: packages/ui/src/convention.generated.ts
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("../ui/src", import.meta.url));
const OUT = join(SRC, "convention.generated.ts");

const THEMES = ["default", "pixel", "semi", "raycast"];

/** category → relative dir under themes/<theme>/ */
const CATEGORIES = {
  components: "components",
  sections: "sections",
  pages: "pages",
  "sections/perler-beads": "sections/perler-beads",
  "sections/cleaner": "sections/cleaner",
  "sections/dither": "sections/dither",
  "sections/blog": "sections/blog",
  editor: "editor",
  "light-tool-demo": "light-tool-demo",
};

/** files that are never components (barrels / helpers / styles / i18n) */
const SKIP_NAME = /(^|\/)(index|helpers|types|styles|lib|dither-i18n)(\.|$)/;
const SKIP_EXT = /\.(d\.ts|css|json)$/;
const SKIP_I18N = /\.i18n\./;

/** Extract named exports from TS/TSX source via regex (project style). */
function parseExports(source) {
  const names = new Set();
  const re = [
    /export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g,
    /export\s+const\s+([A-Za-z_$][\w$]*)/g,
    /export\s+class\s+([A-Za-z_$][\w$]*)/g,
    /export\s*\{([^}]*)\}\s*from\s*['"][^'"]+['"]/g,
    /export\s*\{([^}]*)\}/g,
  ];
  let m;
  for (const r of re) {
    while ((m = r.exec(source))) {
      const body = m[1] ?? "";
      if (!body.includes(",") && !body.includes("{")) {
        if (body.trim()) names.add(body.trim());
      } else if (body.includes(",")) {
        // export { A, B as C } [from '...']
        for (const part of body.split(",")) {
          const nm = part.trim().split(/\s+as\s+/).pop().trim();
          if (nm) names.add(nm);
        }
      }
    }
  }
  return [...names];
}

function pascalCase(str) {
  return str
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function listFiles(dir, topLevelOnly = false) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!topLevelOnly) out.push(...listFiles(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function collect() {
  // theme → category → key → { relImport, exportName }
  const index = {};
  const ambient = {};
  let id = 0;

  for (const theme of THEMES) {
    for (const [category, dirName] of Object.entries(CATEGORIES)) {
      const dir = join(SRC, "themes", theme, dirName);
      for (const file of listFiles(dir)) {
        const rel = relative(SRC, file).replace(/\\/g, "/");
        const base = rel.split("/").pop();
        if (SKIP_NAME.test(rel) || SKIP_EXT.test(base) || SKIP_I18N.test(base)) continue;
        if (!/\.(tsx|ts)$/.test(base)) continue;
        const source = readFileSync(file, "utf8");
        const exports = parseExports(source);
        const components = exports.filter((n) => /^[A-Z]/.test(n));
        if (components.length === 0) {
          // maybe a default-export file
          if (/export\s+default/.test(source)) {
            const key = pascalCase(base.replace(/\.(tsx|ts)$/, ""));
            if (/^[A-Z]/.test(key)) components.push(`default:${key}`);
          }
        }
        if (components.length === 0) continue;
        (index[theme] ??= {});
        (index[theme][category] ??= {});
        for (const comp of components) {
          const [mode, key] = comp.startsWith("default:") ? ["default", comp.slice(8)] : ["named", comp];
          index[theme][category][key] = { rel: `./${rel.replace(/\.(tsx|ts)$/, "")}`, mode, id: id++ };
        }
      }
    }
    // Theme root top-level .tsx files are `components` for themes that keep
    // primitives flat at the root (default does; semi uses components/).
    const themeRoot = join(SRC, "themes", theme);
    for (const file of listFiles(themeRoot, true)) {
      const base = file.split("/").pop();
      if (!base.endsWith(".tsx") || SKIP_NAME.test(base) || SKIP_EXT.test(base) || SKIP_I18N.test(base)) continue;
      if (base === "ambient.tsx" || base === "index.tsx") continue;
      const rel = relative(SRC, file).replace(/\\/g, "/");
      const source = readFileSync(file, "utf8");
      const components = parseExports(source).filter((n) => /^[A-Z]/.test(n));
      if (components.length === 0) continue;
      (index[theme] ??= {});
      (index[theme].components ??= {});
      for (const comp of components) {
        index[theme].components[comp] = { rel: `./${rel.replace(/\.(tsx|ts)$/, "")}`, mode: "named", id: id++ };
      }
    }
    // ambient provider
    const amb = join(SRC, "themes", theme, "ambient.tsx");
    if (existsSync(amb)) {
      ambient[theme] = { rel: `./themes/${theme}/ambient`, id: id++ };
    }
  }
  return { index, ambient };
}

function generate({ index, ambient }) {
  const lines = [];
  lines.push(`// AUTO-GENERATED by scripts/discover-convention.mjs — do not edit by hand.`);
  lines.push(`// The filesystem is the registry: add a block file and re-run (predev/prebuild).`);
  lines.push(``);
  lines.push(`/* eslint-disable */`);
  lines.push(`import type { ComponentType } from "react";`);
  lines.push(``);

  const imports = [];

  for (const [theme, categories] of Object.entries(index)) {
    for (const [category, entries] of Object.entries(categories)) {
      for (const [key, e] of Object.entries(entries)) {
        imports.push(`import * as __m${e.id} from "${e.rel}";`);
      }
    }
  }
  for (const [theme, e] of Object.entries(ambient)) {
    imports.push(`import * as __a${e.id} from "${e.rel}";`);
  }

  lines.push(...imports);
  lines.push(``);
  lines.push(`/** theme → category → key → component (collected from the filesystem). */`);
  lines.push(`export const conventionIndex: Record<string, any> = {`);
  for (const [theme, categories] of Object.entries(index)) {
    lines.push(`  "${theme}": {`);
    for (const [category, entries] of Object.entries(categories)) {
      lines.push(`    "${category}": {`);
      for (const [key, e] of Object.entries(entries)) {
        const member = e.mode === "default" ? `"default"` : `"${key}"`;
        lines.push(`      "${key}": __m${e.id}[${member}],`);
      }
      lines.push(`    },`);
    }
    lines.push(`  },`);
  }
  lines.push(`};`);
  lines.push(``);
  lines.push(`/** theme → ambient provider (themes/<theme>/ambient.tsx). */`);
  lines.push(`export const conventionAmbient: Record<string, ComponentType<any>> = {`);
  for (const [theme, e] of Object.entries(ambient)) {
    lines.push(`  "${theme}": (__a${e.id} as any).PixelAmbientProvider ?? (__a${e.id} as any).AmbientProvider ?? (__a${e.id} as any).default,`);
  }
  lines.push(`};`);

  return lines.join("\n") + "\n";
}

const { index, ambient } = collect();
const out = generate({ index, ambient });
writeFileSync(OUT, out, "utf8");

// stats
let files = 0;
let keys = 0;
for (const [, categories] of Object.entries(index)) {
  for (const [, entries] of Object.entries(categories)) {
    files += Object.keys(entries).length;
    keys += Object.keys(entries).length;
  }
}
console.log(`[convention] generated ${OUT}`);
console.log(`[convention] ${THEMES.length} themes · ${keys} entries · ${Object.keys(ambient).length} ambient`);
