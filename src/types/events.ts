export interface EventRecord {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  summary?: string;
  payload?: unknown;
}
