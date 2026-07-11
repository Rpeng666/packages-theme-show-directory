import type { ExternalLinkService } from '../service';
import { LinkDataTable } from './link-data-table';
import { RevalidateButton } from './revalidate-button';

type Callbacks = {
  onUpdate?: (id: string, data: { placement?: string; status?: string }) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
  onCheck?: (id: string) => void;
};

type Labels = {
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

type Props = {
  service: ExternalLinkService;
  labels?: Labels;
  callbacks?: Callbacks;
  basePath?: string;
  revalidatePath?: string;
};

export async function LinkTablePage({
  service,
  labels,
  callbacks,
  basePath = '/admin/external-links',
  revalidatePath = '/api/revalidate',
}: Props) {
  const links = await service.findAll();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{labels?.title || 'External Links'}</h1>
        <div className="flex gap-2">
          <RevalidateButton label={labels?.revalidate || 'Revalidate'} path={revalidatePath} />
          <a
            href={`${basePath}/add`}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {labels?.add || 'Add Link'}
          </a>
        </div>
      </div>

      <LinkDataTable
        data={links}
        labels={labels}
        callbacks={callbacks}
        basePath={basePath}
      />
    </div>
  );
}
