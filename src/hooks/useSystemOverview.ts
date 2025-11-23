'use client';

import { useEffect, useState } from 'react';
import { SystemOverview } from '@/types';
import { getSystemOverview } from '@/lib/apiClient';

export function useSystemOverview() {
  const [data, setData] = useState<SystemOverview | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getSystemOverview()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err);
        }
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
