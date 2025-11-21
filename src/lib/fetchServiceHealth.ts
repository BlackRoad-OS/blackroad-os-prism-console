export type ServiceHealthResult = {
  id: string;
  ok: boolean;
  status: 'up' | 'down';
  rawStatusCode?: number;
  lastCheckedAt: string;
  errorMessage?: string;
  payload?: unknown;
};

async function readPayload(response: Response) {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      return { parseError: error instanceof Error ? error.message : 'Unable to parse JSON' };
    }
  }

  try {
    return await response.text();
  } catch (error) {
    return { parseError: error instanceof Error ? error.message : 'Unable to read response body' };
  }
}

export async function fetchServiceHealth(
  healthUrl: string,
  id: string,
  timeoutMs = 4000
): Promise<ServiceHealthResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(healthUrl, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal
    });
    const payload = await readPayload(response);
    const ok = response.ok;

    return {
      id,
      ok,
      status: ok ? 'up' : 'down',
      rawStatusCode: response.status,
      lastCheckedAt: new Date().toISOString(),
      payload,
      errorMessage: ok ? undefined : `HTTP ${response.status}`
    } satisfies ServiceHealthResult;
  } catch (error) {
    return {
      id,
      ok: false,
      status: 'down',
      lastCheckedAt: new Date().toISOString(),
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    } satisfies ServiceHealthResult;
  } finally {
    clearTimeout(timeout);
  }
}
