import * as react_jsx_runtime from 'react/jsx-runtime';

declare const EXTERNAL_LINK_PLACEMENTS: readonly ["home", "partner", "footer", "all"];
type ExternalLinkPlacement = (typeof EXTERNAL_LINK_PLACEMENTS)[number];
declare const EXTERNAL_LINK_STATUSES: readonly ["active", "paused"];
type ExternalLinkStatus = (typeof EXTERNAL_LINK_STATUSES)[number];
declare const RECIPROCAL_STATUSES: readonly ["unchecked", "verified", "broken"];
type ReciprocalStatus = (typeof RECIPROCAL_STATUSES)[number];
declare const LINK_REL_TYPES: readonly ["dofollow", "nofollow", "unknown"];
type LinkRel = (typeof LINK_REL_TYPES)[number];
type ExternalLink = {
    id: string;
    placement: ExternalLinkPlacement;
    targetUrl: string;
    anchorText: string | null;
    status: ExternalLinkStatus;
    badgeUrl: string | null;
    badgeAlt: string | null;
    badgeWidth: number | null;
    badgeHeight: number | null;
    badgeHtml: string | null;
    reciprocalUrl: string | null;
    reciprocalStatus: string | null;
    linkRel: string | null;
    lastCheckedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};
type NewExternalLink = {
    id: string;
    placement: ExternalLinkPlacement;
    targetUrl: string;
    anchorText?: string | null;
    status?: ExternalLinkStatus;
    badgeUrl?: string | null;
    badgeAlt?: string | null;
    badgeWidth?: number | null;
    badgeHeight?: number | null;
    badgeHtml?: string | null;
    reciprocalUrl?: string | null;
    reciprocalStatus?: string | null;
    linkRel?: string | null;
    lastCheckedAt?: Date | null;
};
type UpdateExternalLink = Partial<Omit<NewExternalLink, 'id' | 'createdAt'>>;
type ServiceConfig = {
    appUrl: string;
    locales: string[];
    defaultLocale: string;
    revalidatePath: (path: string, type?: 'page' | 'layout') => void;
};
type AuthResult = {
    ok: true;
    user?: any;
} | {
    ok: false;
    status: number;
    message: string;
};
type AuthFn = (request: Request, requiredScope?: string) => Promise<AuthResult>;
type RateLimitFn = (request: Request, opts?: {
    intervalMs?: number;
    keyPrefix?: string;
}) => Response | null;

declare function parseBadgeHtml(html: string): {
    targetUrl?: string;
    badgeUrl?: string;
    badgeAlt?: string;
    badgeWidth?: number;
    badgeHeight?: number;
    anchorText?: string;
};

declare function getUuid(): string;

interface ModelTable {
    externalLink: any;
}
declare function createModel(db: any, table: ModelTable): {
    findAll: () => Promise<ExternalLink[]>;
    findById: (id: string) => Promise<ExternalLink | null>;
    findByPlacement: (placement: ExternalLinkPlacement) => Promise<ExternalLink[]>;
    findBadgesByPlacement: (placement: ExternalLinkPlacement) => Promise<ExternalLink[]>;
    create: (data: {
        placement: ExternalLinkPlacement;
        targetUrl: string;
        anchorText?: string;
        status?: ExternalLinkStatus;
        badgeUrl?: string;
        badgeAlt?: string;
        badgeWidth?: number;
        badgeHeight?: number;
        badgeHtml?: string;
        reciprocalUrl?: string;
    }) => Promise<ExternalLink>;
    update: (id: string, data: UpdateExternalLink) => Promise<ExternalLink | null>;
    delete: (id: string) => Promise<void>;
    updateReciprocalStatus: (id: string, data: {
        reciprocalStatus: string;
        linkRel: string;
        lastCheckedAt: Date;
    }) => Promise<ExternalLink | null>;
};
type ExternalLinkModel = ReturnType<typeof createModel>;

type ExternalLinkService = {
    create: (data: {
        placement: ExternalLinkPlacement;
        targetUrl: string;
        anchorText?: string;
        status?: ExternalLinkStatus;
        badgeUrl?: string;
        badgeAlt?: string;
        badgeWidth?: number;
        badgeHeight?: number;
        badgeHtml?: string;
        reciprocalUrl?: string;
    }) => Promise<ExternalLink>;
    update: (id: string, data: any) => Promise<ExternalLink | null>;
    remove: (id: string) => Promise<void>;
    findAll: () => Promise<ExternalLink[]>;
    findByPlacement: (placement: ExternalLinkPlacement) => Promise<ExternalLink[]>;
    findById: (id: string) => Promise<ExternalLink | null>;
    findBadgesByPlacement: (placement: ExternalLinkPlacement) => Promise<ExternalLink[]>;
    checkReciprocal: (link: ExternalLink) => Promise<{
        status: ReciprocalStatus;
        rel: LinkRel;
    }>;
    parseBadgeHtml: typeof parseBadgeHtml;
};
declare function createService(model: ExternalLinkModel, config: ServiceConfig): ExternalLinkService;

interface HandlerConfig {
    model: {
        findById: (id: string) => Promise<any>;
    };
    service: ExternalLinkService;
    auth?: AuthFn;
    rateLimit?: RateLimitFn;
}
declare function createLinkHandlers(config: HandlerConfig): {
    create: (request: Request) => Promise<Response>;
    list: (request: Request) => Promise<Response>;
    update: (request: Request, { params }: {
        params: Promise<{
            id: string;
        }>;
    }) => Promise<Response>;
    delete: (request: Request, { params }: {
        params: Promise<{
            id: string;
        }>;
    }) => Promise<Response>;
    checkReciprocal: (request: Request, { params }: {
        params: Promise<{
            id: string;
        }>;
    }) => Promise<Response>;
};

type BadgeBarProps = {
    placement: ExternalLinkPlacement;
    variant?: 'marquee' | 'inline';
    service?: ExternalLinkService;
    fetcher?: () => Promise<ExternalLink[]>;
    links?: ExternalLink[];
};
declare function BadgeBar({ placement, variant, service, fetcher, links: providedLinks, }: BadgeBarProps): Promise<react_jsx_runtime.JSX.Element | null>;

type LinkInjectorProps = {
    placement: ExternalLinkPlacement;
    service?: ExternalLinkService;
    fetcher?: () => Promise<ExternalLink[]>;
    links?: ExternalLink[];
};
declare function LinkInjector({ placement, service, fetcher, links: providedLinks, }: LinkInjectorProps): Promise<react_jsx_runtime.JSX.Element | null>;

type CheckButtonProps = {
    linkId: string;
    apiBase?: string;
    labels?: {
        check?: string;
        checking?: string;
        status?: string;
        rel?: string;
    };
};
declare function CheckButton({ linkId, apiBase, labels }: CheckButtonProps): react_jsx_runtime.JSX.Element;

type Callbacks$1 = {
    onUpdate?: (id: string, data: {
        placement?: string;
        status?: string;
    }) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    onEdit?: (id: string) => void;
    onCheck?: (id: string) => void;
};
type Labels$3 = {
    title?: string;
    empty?: string;
    add?: string;
    edit?: string;
    check?: string;
    delete?: string;
    revalidate?: string;
    search?: string;
    rowsPerPage?: string;
    page?: string;
    of?: string;
    deleteConfirm?: string;
    columns?: {
        targetUrl?: string;
        anchorText?: string;
        placement?: string;
        status?: string;
        reciprocalStatus?: string;
        linkRel?: string;
        lastChecked?: string;
        createdAt?: string;
    };
};
type Props$4 = {
    service: ExternalLinkService;
    labels?: Labels$3;
    callbacks?: Callbacks$1;
    basePath?: string;
    revalidatePath?: string;
};
declare function LinkTablePage({ service, labels, callbacks, basePath, revalidatePath, }: Props$4): Promise<react_jsx_runtime.JSX.Element>;

type Callbacks = {
    onUpdate?: (id: string, data: {
        placement?: string;
        status?: string;
    }) => Promise<unknown>;
    onDelete?: (id: string) => Promise<unknown>;
    onEdit?: (id: string) => void;
    onCheck?: (id: string) => void;
};
type Labels$2 = {
    search?: string;
    empty?: string;
    rowsPerPage?: string;
    page?: string;
    of?: string;
    edit?: string;
    check?: string;
    delete?: string;
    deleteConfirm?: string;
    updated?: string;
    updateFailed?: string;
    deleted?: string;
    deleteFailed?: string;
    columns?: {
        targetUrl?: string;
        anchorText?: string;
        placement?: string;
        status?: string;
        reciprocalStatus?: string;
        linkRel?: string;
        lastChecked?: string;
        createdAt?: string;
    };
};
type Props$3 = {
    data: ExternalLink[];
    labels?: Labels$2;
    callbacks?: Callbacks;
    basePath?: string;
};
declare function LinkDataTable({ data: initialData, labels, callbacks, basePath }: Props$3): react_jsx_runtime.JSX.Element;

type Labels$1 = {
    title?: string;
    submit?: string;
    fields?: {
        badgeHtml?: string;
        badgeHtmlTip?: string;
        targetUrl?: string;
        targetUrlTip?: string;
        anchorText?: string;
        anchorTextTip?: string;
        placement?: string;
        placementTip?: string;
        status?: string;
        reciprocalUrl?: string;
        reciprocalUrlTip?: string;
    };
    options?: {
        home?: string;
        partner?: string;
        all?: string;
        footer?: string;
        active?: string;
        paused?: string;
    };
};
type Props$2 = {
    service: ExternalLinkService;
    mode: 'create' | 'edit';
    linkId?: string;
    labels?: Labels$1;
    basePath?: string;
    redirectPath?: string;
};
declare function LinkFormPage({ service, mode, linkId, labels, basePath, redirectPath, }: Props$2): Promise<react_jsx_runtime.JSX.Element>;

type Labels = {
    title?: string;
    fields?: {
        targetUrl?: string;
        reciprocalUrl?: string;
        reciprocalStatus?: string;
        linkRel?: string;
        lastChecked?: string;
    };
    checkButton?: {
        check?: string;
        checking?: string;
        status?: string;
        rel?: string;
    };
};
type Props$1 = {
    service: ExternalLinkService;
    linkId: string;
    labels?: Labels;
    apiBase?: string;
};
declare function LinkCheckPage({ service, linkId, labels, apiBase, }: Props$1): Promise<react_jsx_runtime.JSX.Element>;

type Props = {
    label?: string;
    path?: string;
};
declare function RevalidateButton({ label, path }: Props): react_jsx_runtime.JSX.Element;

export { type AuthFn, type AuthResult, BadgeBar, CheckButton, EXTERNAL_LINK_PLACEMENTS, EXTERNAL_LINK_STATUSES, type ExternalLink, type ExternalLinkModel, type ExternalLinkPlacement, type ExternalLinkService, type ExternalLinkStatus, type HandlerConfig, LINK_REL_TYPES, LinkCheckPage, LinkDataTable, LinkFormPage, LinkInjector, type LinkRel, LinkTablePage, type ModelTable, type NewExternalLink, RECIPROCAL_STATUSES, type RateLimitFn, type ReciprocalStatus, RevalidateButton, type ServiceConfig, type UpdateExternalLink, createLinkHandlers, createModel, createService, getUuid, parseBadgeHtml };
