import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'schema/postgres': 'src/schema/postgres.ts',
    'schema/mysql': 'src/schema/mysql.ts',
    'schema/sqlite': 'src/schema/sqlite.ts',
    'i18n/en': 'src/i18n/en.ts',
    'i18n/zh': 'src/i18n/zh.ts',
    'cli/init': 'src/cli/init.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    'next/cache',
    'next/navigation',
    'next-intl',
    'drizzle-orm',
    'drizzle-orm/pg-core',
    'drizzle-orm/mysql-core',
    'drizzle-orm/sqlite-core',
    'zod',
    'uuid',
    '@radix-ui/*',
  ],
});
