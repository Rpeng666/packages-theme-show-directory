'use client';

import * as React from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

import type { ExternalLink } from '../types';

type Callbacks = {
  onUpdate?: (id: string, data: { placement?: string; status?: string }) => Promise<unknown>;
  onDelete?: (id: string) => Promise<unknown>;
  onEdit?: (id: string) => void;
  onCheck?: (id: string) => void;
};

type Labels = {
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

type Props = {
  data: ExternalLink[];
  labels?: Labels;
  callbacks?: Callbacks;
  basePath?: string;
};

const placementOptions = [
  { value: 'home', label: 'Home' },
  { value: 'partner', label: 'Partner' },
  { value: 'footer', label: 'Footer' },
  { value: 'all', label: 'All' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

function Badge({ value, variant }: { value: string; variant?: 'green' | 'red' | 'gray' | 'blue' }) {
  const colors: Record<string, string> = {
    green: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    gray: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors[variant || 'gray']}`}>
      {value}
    </span>
  );
}

function InlineSelect({
  value,
  options,
  disabled,
  onCommit,
}: {
  value: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  onCommit?: (v: string) => Promise<unknown>;
}) {
  const [current, setCurrent] = React.useState(value);
  const [loading, setLoading] = React.useState(false);

  if (!onCommit) {
    return <Badge value={value} variant="gray" />;
  }

  return (
    <select
      value={current}
      disabled={loading || disabled}
      onChange={async (e) => {
        const v = e.target.value;
        setCurrent(v);
        setLoading(true);
        try {
          await onCommit(v);
        } catch {
          setCurrent(value);
        } finally {
          setLoading(false);
        }
      }}
      className="h-7 rounded-md border border-zinc-200 bg-white px-2 text-xs dark:border-zinc-700 dark:bg-zinc-900"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function CopyableUrl({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false);
  const display = url.length > 40 ? url.slice(0, 37) + '...' : url;

  return (
    <div className="flex items-center gap-1.5">
      <span className="max-w-[220px] truncate text-xs text-blue-600 dark:text-blue-400" title={url}>
        {display}
      </span>
      <button
        onClick={() => {
          if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }
        }}
        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        title="Copy"
      >
        {copied ? '✓' : '⧉'}
      </button>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" title="Open">
        ↗
      </a>
    </div>
  );
}

function formatDate(d: Date | string | null) {
  if (!d) return '-';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function SortButton({ column, label }: { column: any; label: string }) {
  return (
    <button
      className="flex items-center gap-1 text-xs font-medium hover:text-zinc-900 dark:hover:text-zinc-100"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      <span className="opacity-40">⇅</span>
    </button>
  );
}

export function LinkDataTable({ data: initialData, labels, callbacks, basePath }: Props) {
  const l = labels || {};
  const c = l.columns || {};
  const cb = callbacks || {};

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialData);

  const columns: ColumnDef<ExternalLink>[] = React.useMemo(() => {
    const cols: ColumnDef<ExternalLink>[] = [
      {
        accessorKey: 'targetUrl',
        header: ({ column }) => <SortButton column={column} label={c.targetUrl || 'URL'} />,
        cell: ({ row }) => <CopyableUrl url={row.original.targetUrl} />,
      },
      {
        accessorKey: 'anchorText',
        header: ({ column }) => <SortButton column={column} label={c.anchorText || 'Anchor'} />,
        cell: ({ row }) => (
          <span className="max-w-[160px] truncate text-xs" title={row.original.anchorText || ''}>
            {row.original.anchorText || '-'}
          </span>
        ),
      },
      {
        accessorKey: 'placement',
        header: c.placement || 'Placement',
        cell: ({ row }) => (
          <InlineSelect
            value={row.original.placement}
            options={placementOptions}
            onCommit={cb.onUpdate ? async (v) => {
              await cb.onUpdate!(row.original.id, { placement: v });
              setRows((prev) => prev.map((r) => (r.id === row.original.id ? { ...r, placement: v as any } : r)));
            } : undefined}
          />
        ),
      },
      {
        accessorKey: 'status',
        header: c.status || 'Status',
        cell: ({ row }) => (
          <InlineSelect
            value={row.original.status}
            options={statusOptions}
            onCommit={cb.onUpdate ? async (v) => {
              await cb.onUpdate!(row.original.id, { status: v });
              setRows((prev) => prev.map((r) => (r.id === row.original.id ? { ...r, status: v as any } : r)));
            } : undefined}
          />
        ),
      },
      {
        accessorKey: 'reciprocalStatus',
        header: ({ column }) => <SortButton column={column} label={c.reciprocalStatus || 'Reciprocal'} />,
        cell: ({ row }) => {
          const v = row.original.reciprocalStatus;
          if (!v || v === 'unchecked') return <Badge value="unchecked" variant="gray" />;
          if (v === 'verified') return <Badge value="verified" variant="green" />;
          return <Badge value="broken" variant="red" />;
        },
      },
      {
        accessorKey: 'linkRel',
        header: c.linkRel || 'Rel',
        cell: ({ row }) => {
          const v = row.original.linkRel;
          if (!v || v === 'unknown') return <Badge value="unknown" variant="gray" />;
          if (v === 'dofollow') return <Badge value="dofollow" variant="green" />;
          return <Badge value="nofollow" variant="blue" />;
        },
      },
      {
        accessorKey: 'lastCheckedAt',
        header: ({ column }) => <SortButton column={column} label={c.lastChecked || 'Checked'} />,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-xs text-zinc-500">{formatDate(row.original.lastCheckedAt)}</span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortButton column={column} label={c.createdAt || 'Created'} />,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-xs text-zinc-500">{formatDate(row.original.createdAt)}</span>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {cb.onEdit ? (
              <button onClick={() => cb.onEdit!(row.original.id)} className="text-xs text-blue-600 hover:underline" title={l.edit || 'Edit'}>
                ✏
              </button>
            ) : basePath ? (
              <a href={`${basePath}/${row.original.id}/edit`} className="text-xs text-blue-600 hover:underline" title={l.edit || 'Edit'}>
                ✏
              </a>
            ) : null}
            {cb.onCheck ? (
              <button onClick={() => cb.onCheck!(row.original.id)} className="text-xs text-blue-600 hover:underline" title={l.check || 'Check'}>
                ✓
              </button>
            ) : basePath ? (
              <a href={`${basePath}/${row.original.id}/check`} className="text-xs text-blue-600 hover:underline" title={l.check || 'Check'}>
                ✓
              </a>
            ) : null}
            {cb.onDelete ? (
              <button
                onClick={async () => {
                  if (!confirm(l.deleteConfirm || 'Delete?')) return;
                  try {
                    await cb.onDelete!(row.original.id);
                    setRows((prev) => prev.filter((r) => r.id !== row.original.id));
                  } catch { /* ignore */ }
                }}
                className="text-xs text-red-600 hover:underline"
                title={l.delete || 'Delete'}
              >
                🗑
              </button>
            ) : basePath ? (
              <a href={`${basePath}/${row.original.id}/delete`} className="text-xs text-red-600 hover:underline" title={l.delete || 'Delete'}>
                🗑
              </a>
            ) : null}
          </div>
        ),
      },
    ];
    return cols;
  }, [c, cb, basePath, l]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative max-w-xs flex-1">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">🔍</span>
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={l.search || 'Search...'}
            className="h-8 w-full rounded-md border border-zinc-200 pl-7 pr-3 text-xs outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <span className="ml-auto text-xs text-zinc-400">
          {totalRows > 0 ? `${startRow}-${endRow} ${l.of || 'of'} ${totalRows}` : ''}
        </span>
      </div>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b bg-zinc-50 dark:bg-zinc-900">
                  {hg.headers.map((header) => (
                    <th key={header.id} className="px-2 py-2 text-left align-middle text-xs font-medium">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-2 py-1.5 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-20 text-center text-sm text-zinc-400">
                    {l.empty || 'No data.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">{l.rowsPerPage || 'Rows'}</span>
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-7 rounded-md border border-zinc-200 bg-white px-1 text-xs dark:border-zinc-700 dark:bg-zinc-900"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="rounded border px-2 py-0.5 text-xs disabled:opacity-30">«</button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="rounded border px-2 py-0.5 text-xs disabled:opacity-30">‹</button>
          <span className="px-2 text-xs text-zinc-400">
            {l.page || 'Page'} {pageIndex + 1} {l.of || 'of'} {table.getPageCount() || 1}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="rounded border px-2 py-0.5 text-xs disabled:opacity-30">›</button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="rounded border px-2 py-0.5 text-xs disabled:opacity-30">»</button>
        </div>
      </div>
    </div>
  );
}
