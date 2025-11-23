'use client';

import { useEffect, useState } from 'react';
import { FinanceSnapshot } from '@/types';
import { getFinanceSnapshot } from '@/lib/apiClient';

export function useFinanceSnapshot() {
  const [data, setData] = useState<FinanceSnapshot | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getFinanceSnapshot()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
