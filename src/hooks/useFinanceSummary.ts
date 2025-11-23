'use client';

import { useEffect, useState } from 'react';
import type { FinanceSummary } from '../types/finance';
import { fetchFinanceSummary } from '../services/financeService';

export function useFinanceSummary() {
  const [data, setData] = useState<FinanceSummary | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchFinanceSummary()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
