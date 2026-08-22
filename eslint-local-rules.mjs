/**
 * Local ESLint rules for this repo — wired into eslint.config.mjs as the
 * `local` plugin.
 *
 * Why a custom rule instead of another no-restricted-imports pattern:
 * `@/themes/style` (the active-theme CSS entry, aliased in next.config.mjs)
 * is a legitimate `@/themes` import, and ESLint 9's no-restricted-imports
 * has no pattern negation — so the "everything under @/themes except the
 * CSS entry" rule can't be expressed as a pattern list.
 */

import ts from 'typescript';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const THEME_ALIAS = '@/themes';

/**
 * Contract source lookup for `section-in-props`.
 *
 * The registry section contracts live in packages/ui/src/contracts/sections.
 * `section-in-props` needs to know whether a block's XProps declares a
 * REQUIRED `section` field; contracts are found by interface name (not
 * filename) so a section key can't drift from its file (e.g.
 * FeaturesListProps lives in features-media.ts, not features-list.ts).
 */
const CONTRACTS_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  'ui/src/contracts/sections',
);

/** propsName -> { present, optional } for its `section` member; null = not found. */
const sectionFieldCache = new Map();
let contractFiles = null;

function getSectionFieldInfo(propsName) {
  if (sectionFieldCache.has(propsName)) return sectionFieldCache.get(propsName);
  let info = null;
  try {
    if (contractFiles === null) {
      contractFiles = readdirSync(CONTRACTS_DIR).filter((f) => f.endsWith('.ts'));
    }
    for (const file of contractFiles) {
      const source = readFileSync(join(CONTRACTS_DIR, file), 'utf8');
      const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      let found = false;
      for (const stmt of sf.statements) {
        if (!ts.isInterfaceDeclaration(stmt) || !stmt.name || stmt.name.text !== propsName) continue;
        let present = false;
        let optional = false;
        for (const member of stmt.members) {
          if (
            ts.isPropertySignature(member) &&
            member.name &&
            ts.isIdentifier(member.name) &&
            member.name.text === 'section'
          ) {
            present = true;
            optional = !!member.questionToken;
            break;
          }
        }
        info = { present, optional };
        found = true;
        break;
      }
      if (found) break;
    }
  } catch {
    info = null; // contracts dir unreadable — skip the check rather than false-positive
  }
  sectionFieldCache.set(propsName, info);
  return info;
}

/**
 * no-direct-theme-import
 *
 * App-layer files must never import a concrete theme implementation
 * (src/themes/<theme>/...) directly. Theme blocks are reached by forwarding
 * through the theme layer: `const Footer = await getThemeBlock('footer')` —
 * which loads the ACTIVE theme's block and falls back to the default theme —
 * and the theme block then resolves the component via resolveComponent.
 * A direct `import ... from '@/themes/<theme>/...'` bypasses active-theme
 * selection, the default fallback, and couples the app file to one theme.
 *
 * Exempted: `@/themes/style` (aliased to the active theme's
 * style/index.css) and any path containing `/style/` (theme CSS) — CSS is
 * not a component and carries no theme-coupling.
 *
 * getThemeBlock's own dynamic `import(\`@/themes/${theme}/blocks/...\`)` in
 * src/core/theme is NOT flagged: it uses a template-literal specifier, and
 * this rule only inspects string-literal specifiers.
 */
export const rules = {
  'no-direct-theme-import': {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Forbid importing concrete theme blocks directly; forward through the theme layer (getThemeBlock) instead.',
      },
      messages: {
        directThemeImport:
          "Do not import a concrete theme block directly. Forward through the theme layer first — `const Footer = await getThemeBlock('footer')` — the theme block then resolves the component via resolveComponent.",
      },
      schema: [],
    },
    create(context) {
      function checkImport(node) {
        const src = node.source;
        if (!src || src.type !== 'Literal' || typeof src.value !== 'string') {
          return; // template-literal / non-literal specifiers (e.g. getThemeBlock) are not static theme imports
        }
        const value = src.value;
        if (value === THEME_ALIAS || value.startsWith(`${THEME_ALIAS}/`)) {
          // Exempt the active-theme CSS entry + any theme CSS path.
          if (value === `${THEME_ALIAS}/style` || value.includes('/style/')) {
            return;
          }
          context.report({
            node: src,
            messageId: 'directThemeImport',
          });
        }
      }

      return {
        ImportDeclaration: checkImport,
        ExportNamedDeclaration(node) {
          if (node.source) checkImport(node);
        },
        ExportAllDeclaration(node) {
          if (node.source) checkImport(node);
        },
        ImportExpression(node) {
          if (node.source && node.source.type === 'Literal' && typeof node.source.value === 'string') {
            checkImport(node);
          }
        },
      };
    },
  },
  /**
   * block-forwarder-props
   *
   * Theme block forwarders (src/themes/<theme>/blocks/*) must be typed with
   * the registered section's contract — never hand-rolled:
   *
   *  - For every `resolveSection('X')` in the file, `XProps` must be imported
   *    from `@template/ui` (`import type { XProps } from '@template/ui';`).
   *    Every registry section key has a matching contract (Logos → LogosProps,
   *    Pricing → PricingProps, ...), so the norm is unambiguous.
   *
   *  - `XProps` must also be USED as the block component's props type
   *    annotation — `function X({ section, ... }: XProps)`. A hand-rolled
   *    inline type (`{ section: Section; className?: string }`), a separate
   *    local type, or `any` all fail the check. This is what keeps the block's
   *    contract identical to the packaged section's.
   *
   * Scoped to src/themes/.../blocks in eslint.config.mjs. Shared feature
   * adapters (src/shared/features/*) legitimately use
   * `ComponentProps<typeof ResolveXSection>` instead and are out of scope.
   */
  'block-forwarder-props': {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Theme block forwarders must import the registered section Props contract and type their `section` param with it (never `any`).',
      },
      messages: {
        missingPropsImport:
          "resolveSection('{{key}}') requires the matching contract type — add `import type { {{props}} } from '@template/ui';` (every registry section key has one).",
        notTypedWithProps:
          "The block component for resolveSection('{{key}}') must be typed with `{{props}}` from '@template/ui' — `function {{component}}({ section, ... }: {{props}})`. Do not hand-roll an inline or separate props type.",
      },
      schema: [],
    },
    create(context) {
      /** Identifiers named `*Props` imported from @template/ui (value or type). */
      const importedPropsTypes = new Set();
      /** Identifiers used as a function parameter's type annotation (e.g. `: LogosProps`). */
      const usedParamTypes = new Set();
      /** { key, node } for each string-literal resolveSection('X') call. */
      const sectionCalls = [];

      function isUiSource(source) {
        return source === '@template/ui' || source === '@template/ui' + '/';
      }

      function collectUiSpecifiers(specifiers) {
        for (const spec of specifiers) {
          if (spec.type === 'ImportSpecifier' && spec.imported) {
            const name = spec.imported.type === 'Identifier' ? spec.imported.name : spec.imported.value;
            if (/Props$/.test(name)) importedPropsTypes.add(name);
          }
        }
      }

      /** Record any `XProps` identifiers used as a param type annotation. */
      function collectParamTypes(params) {
        for (const param of params) {
          const ta = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
          if (
            ta &&
            ta.type === 'TSTypeReference' &&
            ta.typeName &&
            ta.typeName.type === 'Identifier' &&
            /Props$/.test(ta.typeName.name)
          ) {
            usedParamTypes.add(ta.typeName.name);
          }
        }
      }

      return {
        ImportDeclaration(node) {
          if (isUiSource(node.source.value)) collectUiSpecifiers(node.specifiers);
        },
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'resolveSection' &&
            node.arguments[0] &&
            node.arguments[0].type === 'Literal' &&
            typeof node.arguments[0].value === 'string'
          ) {
            sectionCalls.push({ key: node.arguments[0].value, node: node.arguments[0] });
          }
        },
        FunctionDeclaration(node) {
          collectParamTypes(node.params);
        },
        VariableDeclarator(node) {
          if (
            node.init &&
            (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression')
          ) {
            collectParamTypes(node.init.params);
          }
        },
        'Program:exit'() {
          for (const { key, node } of sectionCalls) {
            const props = `${key}Props`;
            if (!importedPropsTypes.has(props)) {
              context.report({ node, messageId: 'missingPropsImport', data: { key, props } });
            } else if (!usedParamTypes.has(props)) {
              context.report({
                node,
                messageId: 'notTypedWithProps',
                data: { key, props, component: key },
              });
            }
          }
        },
      };
    },
  },
  /**
   * section-in-props
   *
   * Config-driven blocks must declare a REQUIRED `section` on their contract.
   *
   * A theme block is config-driven when it destructures `section` from its
   * XProps (it renders from the landing section's config). The registry
   * renderer always passes `section` to every block, so a config-driven
   * block's contract (packages/ui/src/contracts/sections, resolved by
   * interface name via getSectionFieldInfo) must accept it — and per codebase
   * convention REQUIRED (`section: Type`), never optional (`section?: Type`).
   * HeroLive is the canonical case: it maps section config (eyebrow/title/
   * presets) into flat render props, so HeroLiveProps must carry a required
   * section.
   *
   * Scoped to src/themes/<theme>/blocks in eslint.config.mjs, same as
   * block-forwarder-props.
   */
  'section-in-props': {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Config-driven theme blocks (they destructure `section`) must have a REQUIRED `section` field on their XProps contract.',
      },
      messages: {
        missingSection:
          "resolveSection('{{key}}') is config-driven — its block reads `section` — so the contract `{{props}}` must declare a `section` field (add `section: <SectionType>` to {{props}}).",
        optionalSection:
          "resolveSection('{{key}}') is config-driven — its block reads `section` — so `{{props}}` must declare `section` as REQUIRED (`section: <SectionType>`), not optional (`section?: T`).",
      },
      schema: [],
    },
    create(context) {
      /** { key, node } per string-literal resolveSection('X') call. */
      const sectionCalls = [];
      /** XProps names used as a block param type that destructures `section` (config-driven). */
      const configDrivenProps = new Set();

      function collectParams(params) {
        for (const param of params) {
          const ta = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
          if (
            !ta ||
            ta.type !== 'TSTypeReference' ||
            !ta.typeName ||
            ta.typeName.type !== 'Identifier' ||
            !/Props$/.test(ta.typeName.name)
          ) {
            continue;
          }
          if (
            param.type === 'ObjectPattern' &&
            param.properties.some(
              (p) =>
                (p.type === 'Property' || p.type === 'ObjectProperty') &&
                !p.computed &&
                p.key &&
                p.key.type === 'Identifier' &&
                p.key.name === 'section',
            )
          ) {
            configDrivenProps.add(ta.typeName.name);
          }
        }
      }

      return {
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'resolveSection' &&
            node.arguments[0] &&
            node.arguments[0].type === 'Literal' &&
            typeof node.arguments[0].value === 'string'
          ) {
            sectionCalls.push({ key: node.arguments[0].value, node: node.arguments[0] });
          }
        },
        FunctionDeclaration(node) {
          collectParams(node.params);
        },
        VariableDeclarator(node) {
          if (
            node.init &&
            (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression')
          ) {
            collectParams(node.init.params);
          }
        },
        'Program:exit'() {
          for (const { key, node } of sectionCalls) {
            const props = `${key}Props`;
            if (!configDrivenProps.has(props)) continue;
            const info = getSectionFieldInfo(props);
            if (info === null) continue; // contract not found — don't false-positive
            if (!info.present) {
              context.report({ node, messageId: 'missingSection', data: { key, props } });
            } else if (info.optional) {
              context.report({ node, messageId: 'optionalSection', data: { key, props } });
            }
          }
        },
      };
    },
  },
  /**
   * section-shell
   *
   * Config-driven section components must render through SectionShell: every
   * JSX return must be rooted in <SectionShell> — the shared section scaffold
   * (sections/shell.tsx) that keeps vertical rhythm / container width /
   * background vocabulary consistent across the theme's sections.
   *
   * "Config-driven" is resolved from the props CONTRACT, not from what the
   * component destructures: a landing section's contract declares a `section`
   * member (HeroLiveProps carries `section` even though the packaged component
   * only destructures the flattened copy props the block injects). Tool
   * sections (workbenches, studios, page-header, dashboards) take business
   * data — their contracts declare no `section` member — so they are exempt
   * without an exception list.
   *
   * A section that returns JSX through any other root — a <div>, a Fragment
   * (<>...</>) or a custom wrapper — skips the scaffold. HeroLive is the
   * canonical violation: it renders <SectionShell> inside a fragment with a
   * <style> sibling, so the DOM root is the fragment, not the scaffold's
   * <section>.
   *
   * SectionShell also requires its `id` prop (the scaffold's <section id=...>
   * is the section's DOM anchor — anchor navigation and scroll-margin hang off
   * it). A config-driven section's <SectionShell> must therefore carry an
   * explicit `id` attribute (conventionally `id={section.id}`).
   *
   * Scoped to packages/ui/src/themes/semi/sections in eslint.config.mjs
   * (SectionShell only exists in the semi theme today).
   */
  'section-shell': {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Config-driven section components must render <SectionShell> as the root of every JSX return, and pass it the section id.',
      },
      messages: {
        notSectionShell:
          "Config-driven section `{{name}}` must root its JSX in <SectionShell> — the shared section scaffold that keeps section vertical rhythm / container width / background consistent. This return is rooted in {{root}} (line {{line}}); wrapping <SectionShell> in a fragment or another element skips the scaffold. Make <SectionShell> the outermost element of every JSX return.",
        missingId:
          "Config-driven section `{{name}}` must pass `id` to <SectionShell> (line {{line}}) — the scaffold's <section id=...> is the section's DOM anchor (anchor navigation, scroll-margin). Pass `id={section.id}` from the section config.",
      },
      schema: [],
    },
    create(context) {
      /** True when the component is config-driven: its props type is a *Props
       *  contract that declares a REQUIRED-or-optional `section` member. */
      function isConfigDrivenParams(params) {
        for (const param of params) {
          const ta = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
          if (!ta) continue;
          const names = [];
          if (ta.type === 'TSTypeReference' && ta.typeName && ta.typeName.type === 'Identifier') {
            names.push(ta.typeName.name);
          } else if (ta.type === 'TSIntersectionType') {
            // `LogosProps & { ImageComponent?: any }` — the contract ref is a member.
            for (const member of ta.types) {
              if (
                member.type === 'TSTypeReference' &&
                member.typeName &&
                member.typeName.type === 'Identifier'
              ) {
                names.push(member.typeName.name);
              }
            }
          }
          for (const n of names) {
            const info = getSectionFieldInfo(n);
            if (info !== null && info.present) return true;
          }
        }
        return false;
      }

      function isSectionShellJsx(node) {
        return (
          node.type === 'JSXElement' &&
          node.openingElement &&
          node.openingElement.name &&
          node.openingElement.name.type === 'JSXIdentifier' &&
          node.openingElement.name.name === 'SectionShell'
        );
      }

      function jsxRootLabel(node) {
        if (node.type === 'JSXFragment') return '<Fragment>';
        const n = node.openingElement && node.openingElement.name;
        if (!n) return node.type;
        if (n.type === 'JSXIdentifier') return `<${n.name}>`;
        if (n.type === 'JSXMemberExpression') return `<${n.object.name}.${n.property.name}>`;
        if (n.type === 'JSXNamespacedName') return `<${n.namespace.name}:${n.name.name}>`;
        return node.type;
      }

      /** ReturnStatements inside `root`, not descending into nested functions
       *  (map callbacks, helper components — their returns belong to them). */
      function collectReturns(root) {
        const out = [];
        (function walk(node) {
          if (!node || typeof node.type !== 'string') return;
          if (
            node !== root &&
            (node.type === 'FunctionDeclaration' ||
              node.type === 'FunctionExpression' ||
              node.type === 'ArrowFunctionExpression')
          ) {
            return;
          }
          if (node.type === 'ReturnStatement') {
            out.push(node);
            return;
          }
          for (const key of Object.keys(node)) {
            if (key === 'parent') continue;
            const child = node[key];
            if (Array.isArray(child)) {
              for (const c of child) {
                if (c && typeof c.type === 'string') walk(c);
              }
            } else if (child && typeof child.type === 'string') {
              walk(child);
            }
          }
        })(root);
        return out;
      }

      function checkComponent(name, fnNode) {
        if (!isConfigDrivenParams(fnNode.params || [])) return;
        for (const ret of collectReturns(fnNode.body)) {
          const arg = ret.argument;
          if (!arg) continue; // `return;`
          if (arg.type !== 'JSXElement' && arg.type !== 'JSXFragment') continue; // null / variable / call — can't verify statically
          if (!isSectionShellJsx(arg)) {
            context.report({
              node: arg,
              messageId: 'notSectionShell',
              data: {
                name,
                root: jsxRootLabel(arg),
                line: String(arg.loc.start.line),
              },
            });
            continue;
          }
          // Root IS SectionShell — it must still carry the section's DOM-anchor id.
          const attrs = arg.openingElement.attributes || [];
          const hasId = attrs.some(
            (a) =>
              a.type === 'JSXAttribute' &&
              a.name &&
              a.name.type === 'JSXIdentifier' &&
              a.name.name === 'id',
          );
          if (!hasId) {
            context.report({
              node: arg,
              messageId: 'missingId',
              data: { name, line: String(arg.loc.start.line) },
            });
          }
        }
      }

      return {
        ExportNamedDeclaration(node) {
          const d = node.declaration;
          if (!d) return;
          if (d.type === 'FunctionDeclaration') {
            checkComponent(d.id && d.id.name, d);
          } else if (d.type === 'VariableDeclaration') {
            for (const decl of d.declarations) {
              const init = decl.init;
              if (
                init &&
                (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')
              ) {
                checkComponent(decl.id && decl.id.name, init);
              }
            }
          }
        },
        ExportDefaultDeclaration(node) {
          const d = node.declaration;
          if (d.type === 'FunctionDeclaration') checkComponent(d.id && d.id.name, d);
        },
      };
    },
  },
};

export default { rules };
