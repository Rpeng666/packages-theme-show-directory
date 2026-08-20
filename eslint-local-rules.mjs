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

const THEME_ALIAS = '@/themes';

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
   * Theme block forwarders (src/themes/<theme>/blocks/*) must be typed with the
   * registered section's contract, never hand-rolled `any`:
   *
   *  - For every `resolveSection('X')` in the file, `XProps` must be imported
   *    from `@template/ui` (`import type { XProps } from '@template/ui';`).
   *    Every registry section key has a matching contract (Logos → LogosProps,
   *    Pricing → PricingProps, ...), so the norm is unambiguous.
   *
   *  - A block component that destructures `section` must not type it (or the
   *    whole props param) as `any`/`unknown`. Use the section's `XProps`
   *    contract when it carries the `section` field (LogosProps, PricingProps,
   *    ...), or the landing `Section` type when the contract is flattened and
   *    the block maps `section.*` into the props itself (HeroLiveProps).
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
        anySection:
          "Block component props must not type `section` as `any`/`unknown`. Use the section contract `{{props}}` (when it carries `section`) or type `section` as the landing `Section` type and map its fields into the section's props.",
      },
      schema: [],
    },
    create(context) {
      /** Identifiers named `*Props` imported from @template/ui (value or type). */
      const importedPropsTypes = new Set();
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

      /** Find the `section` param inside a destructured object param, if typed any/unknown. */
      function findAnySectionParam(params) {
        for (const param of params) {
          if (param.type !== 'ObjectPattern') continue;
          const hasSection = param.properties.some(
            (p) => p.type === 'Property' && !p.computed && p.key.type === 'Identifier' && p.key.name === 'section',
          );
          if (!hasSection) continue;
          const ta = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
          if (!ta) continue;
          // Whole-param `: any` / `: unknown`.
          if (ta.type === 'TSAnyKeyword' || ta.type === 'TSUnknownKeyword') return param;
          // Inline `{ section: any; ... }` literal — report the `section` member's type.
          if (ta.type === 'TSTypeLiteral') {
            for (const member of ta.members) {
              if (
                member.type === 'TSPropertySignature' &&
                member.key.type === 'Identifier' &&
                member.key.name === 'section' &&
                member.typeAnnotation &&
                member.typeAnnotation.typeAnnotation &&
                (member.typeAnnotation.typeAnnotation.type === 'TSAnyKeyword' ||
                  member.typeAnnotation.typeAnnotation.type === 'TSUnknownKeyword')
              ) {
                return member;
              }
            }
          }
        }
        return null;
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
          const hit = findAnySectionParam(node.params);
          if (hit) {
            context.report({
              node: hit,
              messageId: 'anySection',
              data: { props: node.id && node.id.name ? `${node.id.name}Props` : '' },
            });
          }
        },
        VariableDeclarator(node) {
          if (
            node.init &&
            (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression')
          ) {
            const hit = findAnySectionParam(node.init.params);
            if (hit) {
              context.report({
                node: hit,
                messageId: 'anySection',
                data: { props: node.id && node.id.type === 'Identifier' ? `${node.id.name}Props` : '' },
              });
            }
          }
        },
        'Program:exit'() {
          for (const { key, node } of sectionCalls) {
            const props = `${key}Props`;
            if (!importedPropsTypes.has(props)) {
              context.report({ node, messageId: 'missingPropsImport', data: { key, props } });
            }
          }
        },
      };
    },
  },
};

export default { rules };
