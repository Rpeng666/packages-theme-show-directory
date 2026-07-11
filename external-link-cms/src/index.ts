// Types
export {
  EXTERNAL_LINK_PLACEMENTS,
  EXTERNAL_LINK_STATUSES,
  RECIPROCAL_STATUSES,
  LINK_REL_TYPES,
  type ExternalLink,
  type NewExternalLink,
  type UpdateExternalLink,
  type ExternalLinkPlacement,
  type ExternalLinkStatus,
  type ReciprocalStatus,
  type LinkRel,
  type ServiceConfig,
  type AuthResult,
  type AuthFn,
  type RateLimitFn,
} from './types';

// Utils
export { parseBadgeHtml } from './badge-html';
export { getUuid } from './utils';

// Model & Service
export { createModel, type ExternalLinkModel, type ModelTable } from './model';
export { createService, type ExternalLinkService } from './service';

// API handlers
export { createLinkHandlers, type HandlerConfig } from './api/handlers';

// Components
export { default as BadgeBar } from './components/badge-bar';
export { LinkInjector } from './components/link-injector';
export { CheckButton } from './components/check-button';

// Admin
export {
  LinkTablePage,
  LinkDataTable,
  LinkFormPage,
  LinkCheckPage,
  RevalidateButton,
} from './admin';
