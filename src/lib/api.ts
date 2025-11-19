import { config } from './config';

type FetchTarget = 'core' | 'agents';

type ApiClientOptions = {
  target: FetchTarget;
  path: string;
  init?: RequestInit;
};

const baseMap: Record<FetchTarget, string> = {
  core: config.coreApiUrl,
  agents: config.agentsApiUrl
};

/**
 * Centralized fetch helper for backend calls.
 * TODO: add authentication headers or cookies once auth is available.
 */
export async function apiClient<T>({ target, path, init }: ApiClientOptions): Promise<T> {
  const baseUrl = baseMap[target];

  if (!baseUrl) {
    throw new Error(`${target} API URL is not configured`);
  }

  const url = new URL(path, baseUrl);
  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`${target} API responded with ${response.status}`);
  }

  return response.json() as Promise<T>;
}
