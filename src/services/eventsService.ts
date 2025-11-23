import { apiGet } from '../lib/apiClient';
import type { EventRecord } from '../types/events';

export interface EventQueryParams {
  limit?: number;
  type?: string;
  source?: string;
}

export async function fetchEvents(params: EventQueryParams = {}): Promise<EventRecord[]> {
  const search = new URLSearchParams();
  if (params.limit !== undefined) search.set('limit', String(params.limit));
  if (params.type) search.set('type', params.type);
  if (params.source) search.set('source', params.source);

  const qs = search.toString();
  const path = qs ? `/internal/events?${qs}` : '/internal/events';
  return apiGet<EventRecord[]>(path);
}
