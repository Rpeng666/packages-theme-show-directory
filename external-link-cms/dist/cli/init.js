#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

var ROOT = process.cwd();
function detectAppDir() {
  if (existsSync(join(ROOT, "src/app"))) return "src/app";
  if (existsSync(join(ROOT, "app"))) return "app";
  console.error("Could not find app/ or src/app/ directory. Are you in a Next.js project root?");
  process.exit(1);
}
function writeIfAbsent(filePath, content, force = false) {
  if (!force && existsSync(filePath)) {
    console.log(`  SKIP (exists): ${filePath}`);
    return false;
  }
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content, "utf-8");
  console.log(`  CREATE: ${filePath}`);
  return true;
}
var ROUTE_WRAPPER = `import { createLinkHandlers } from 'fake-jarvis-external-link-cms';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

// TODO: import your db instance and schema table
import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { requireApiKey, EXTERNAL_LINKS_WRITE_SCOPE } from '@/shared/lib/apikey-auth';
import { enforceMinIntervalRateLimit } from '@/shared/lib/rate-limit';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});
const handlers = createLinkHandlers({
  model,
  service,
  auth: (req) => requireApiKey(req, EXTERNAL_LINKS_WRITE_SCOPE),
  rateLimit: enforceMinIntervalRateLimit,
});

export const POST = handlers.create;
export const GET = handlers.list;
`;
var ROUTE_WRAPPER_ID = `import { createLinkHandlers } from 'fake-jarvis-external-link-cms';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { requireApiKey, EXTERNAL_LINKS_WRITE_SCOPE } from '@/shared/lib/apikey-auth';
import { enforceMinIntervalRateLimit } from '@/shared/lib/rate-limit';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});
const handlers = createLinkHandlers({
  model,
  service,
  auth: (req) => requireApiKey(req, EXTERNAL_LINKS_WRITE_SCOPE),
  rateLimit: enforceMinIntervalRateLimit,
});

export const PUT = handlers.update;
export const DELETE = handlers.delete;
`;
var ROUTE_WRAPPER_CHECK = `import { createLinkHandlers } from 'fake-jarvis-external-link-cms';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { requireApiKey, EXTERNAL_LINKS_WRITE_SCOPE } from '@/shared/lib/apikey-auth';
import { enforceMinIntervalRateLimit } from '@/shared/lib/rate-limit';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});
const handlers = createLinkHandlers({
  model,
  service,
  auth: (req) => requireApiKey(req, EXTERNAL_LINKS_WRITE_SCOPE),
  rateLimit: enforceMinIntervalRateLimit,
});

export const POST = handlers.checkReciprocal;
`;
var ADMIN_LIST_PAGE = `import { LinkTablePage } from 'fake-jarvis-external-link-cms/admin';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});

export default async function Page() {
  return <LinkTablePage service={service} />;
}
`;
var ADMIN_ADD_PAGE = `import { LinkFormPage } from 'fake-jarvis-external-link-cms/admin';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});

export default async function Page() {
  return <LinkFormPage service={service} mode="create" />;
}
`;
var ADMIN_EDIT_PAGE = `import { LinkFormPage } from 'fake-jarvis-external-link-cms/admin';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LinkFormPage service={service} mode="edit" linkId={id} />;
}
`;
var ADMIN_CHECK_PAGE = `import { LinkCheckPage } from 'fake-jarvis-external-link-cms/admin';
import { createModel } from 'fake-jarvis-external-link-cms';
import { createService } from 'fake-jarvis-external-link-cms';

import { db } from '@/core/db';
import { externalLink } from '@/config/db/schema';
import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { revalidatePath } from 'next/cache';

const model = createModel(db, { externalLink });
const service = createService(model, {
  appUrl: envConfigs.app_url,
  locales,
  defaultLocale,
  revalidatePath,
});

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LinkCheckPage service={service} linkId={id} />;
}
`;
var SCHEMA_SNIPPET = `
// Add this to your schema file (e.g. src/config/db/schema.postgres.ts):
//
//   export { externalLink } from 'fake-jarvis-external-link-cms/schema/postgres';
//
// For MySQL:
//   export { externalLink } from 'fake-jarvis-external-link-cms/schema/mysql';
//
// For SQLite:
//   export { externalLink } from 'fake-jarvis-external-link-cms/schema/sqlite';
//
// Then run: npm run db:push
`;
var I18N_SNIPPET = `
// Add this to your locale message config:
//
//   // en/admin/external-links.json
//   export { default } from 'fake-jarvis-external-link-cms/i18n/en';
//
//   // zh/admin/external-links.json
//   export { default } from 'fake-jarvis-external-link-cms/i18n/zh';
//
// Or merge into existing messages:
//   import elcmsEn from 'fake-jarvis-external-link-cms/i18n/en';
//   // merge elcmsEn into your messages object
`;
function main() {
  const force = process.argv.includes("--force");
  const appDir = detectAppDir();
  console.log("\\n=== fake-jarvis-external-link-cms init ===\\n");
  console.log(`App directory: ${appDir}\\n`);
  console.log("Generating API route wrappers:");
  writeIfAbsent(join(ROOT, appDir, "api/external-links/route.ts"), ROUTE_WRAPPER, force);
  writeIfAbsent(join(ROOT, appDir, "api/external-links/[id]/route.ts"), ROUTE_WRAPPER_ID, force);
  writeIfAbsent(join(ROOT, appDir, "api/external-links/[id]/check/route.ts"), ROUTE_WRAPPER_CHECK, force);
  console.log("\\nGenerating admin page stubs:");
  writeIfAbsent(join(ROOT, appDir, "[locale]/(admin)/admin/external-links/page.tsx"), ADMIN_LIST_PAGE, force);
  writeIfAbsent(join(ROOT, appDir, "[locale]/(admin)/admin/external-links/add/page.tsx"), ADMIN_ADD_PAGE, force);
  writeIfAbsent(join(ROOT, appDir, "[locale]/(admin)/admin/external-links/[id]/edit/page.tsx"), ADMIN_EDIT_PAGE, force);
  writeIfAbsent(join(ROOT, appDir, "[locale]/(admin)/admin/external-links/[id]/check/page.tsx"), ADMIN_CHECK_PAGE, force);
  console.log("\\n=== Manual steps required ===\\n");
  console.log(SCHEMA_SNIPPET);
  console.log(I18N_SNIPPET);
  console.log("\\n=== Done! ===");
  console.log("Make sure to:");
  console.log("  1. Install peer dependencies if not already present");
  console.log("  2. Add the schema export to your schema file");
  console.log("  3. Merge i18n messages into your locale config");
  console.log("  4. Run npm run db:push to create the table");
  console.log("  5. Wire up the BadgeBar and LinkInjector components in your pages\\n");
}
main();
