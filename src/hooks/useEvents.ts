'use client';

import { useEffect, useMemo, useState } from 'react';
import { EventRecord } from '@/types';
import { getEvents } from '@/lib/apiClient';

export type EventQueryParams = {
  limit?: number;
  severity?: string;
  search?: string;
};

export function useEvents(initialParams: EventQueryParams = {}, pollIntervalMs?: number) {
  const [params, setParams] = useState<EventQueryParams>(initialParams);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = (nextParams: EventQueryParams = params) => {
    setLoading(true);
    getEvents(nextParams)
      .then((records) => {
        setEvents(records);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(params);
    if (!pollIntervalMs) return;
    const id = setInterval(() => load(params), pollIntervalMs);
    return () => clearInterval(id);
  }, [pollIntervalMs]);

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesSeverity = params.severity ? event.severity === params.severity : true;
      const searchText = params.search?.toLowerCase().trim();
      const matchesSearch = searchText
        ? event.summary.toLowerCase().includes(searchText) || event.source.toLowerCase().includes(searchText)
        : true;
      return matchesSeverity && matchesSearch;
    });
  }, [events, params.severity, params.search]);

  const updateParams = (next: EventQueryParams) => {
    setParams(next);
    load(next);
  };

  return { events: filtered, isLoading, error, params, setParams: updateParams, refetch: () => load(params) };
}
