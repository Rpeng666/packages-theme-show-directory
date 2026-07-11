'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export function CheckButton({ linkId, apiBase = '/api/external-links', labels }: CheckButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    reciprocalStatus: string;
    linkRel: string;
  } | null>(null);

  async function handleCheck() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${apiBase}/${linkId}/check`, { method: 'POST' });
      const data = await res.json();
      if (data.code === 0 && data.data) {
        setResult({
          reciprocalStatus: data.data.reciprocalStatus,
          linkRel: data.data.linkRel,
        });
        router.refresh();
      }
    } catch (e) {
      console.error('check failed:', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleCheck}
        disabled={loading}
        className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? (labels?.checking || 'Checking...') : (labels?.check || 'Check Reciprocal Link')}
      </button>
      {result && (
        <div className="text-sm text-muted-foreground">
          {labels?.status || 'Status'}: <span className="font-medium">{result.reciprocalStatus}</span>
          {' | '}
          {labels?.rel || 'Rel'}: <span className="font-medium">{result.linkRel}</span>
        </div>
      )}
    </div>
  );
}
