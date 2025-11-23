'use client';

import { useEffect, useState } from 'react';
import type { EventRecord } from '../types/events';
import { fetchEvents, type EventQueryParams } from '../services/eventsService';

export function useEvents(initialParams: EventQueryParams = {}, pollIntervalMs?: number) {
  const [params, setParams] = useState<EventQueryParams>(initialParams);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = (nextParams: EventQueryParams = params) => {
    setLoading(true);
    fetchEvents(nextParams)
      .then((records) => {
        setEvents(records);
        setError(null);
      })
      .catch((err) => {
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
  }, [pollIntervalMs, params]);

  const updateParams = (next: EventQueryParams) => {
    setParams(next);
    load(next);
  };

  return { events, isLoading, error, params, setParams: updateParams, refetch: () => load(params) };
}
